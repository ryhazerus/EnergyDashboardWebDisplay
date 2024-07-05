import json
import time
from dataclasses import asdict

from fastapi import APIRouter
from homewizard_energy import HomeWizardEnergy, ExternalDevice
from starlette.websockets import WebSocket

from database.gas_db_handler import GasMeterDatabaseHandler

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


async def handler(websocket, ip_address: str):
    db_handler = GasMeterDatabaseHandler()

    async with HomeWizardEnergy(host=ip_address) as api:
        while True:
            data = await api.data()  # Get measurements, like power or water usage

            external_modules = data.external_devices

            if external_modules:
                for key, modules in external_modules.items():
                    if modules.meter_type.value == ExternalDevice.DeviceType.GAS_METER.value:
                        db_handler.insert_reading(modules.unique_id, modules.meter_type.name, modules.timestamp,
                                                  modules.value, modules.unit)

            data_dict = asdict(data)
            data_dict['gas_today'] = db_handler.get_todays_usage()[1]

            await websocket.send(json.dumps(data_dict, indent=4, sort_keys=True, default=str))
            time.sleep(5)
