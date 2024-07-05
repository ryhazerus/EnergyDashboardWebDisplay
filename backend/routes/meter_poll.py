import json
import asyncio
from dataclasses import asdict

from fastapi import APIRouter
from homewizard_energy import HomeWizardEnergy, ExternalDevice
from starlette.websockets import WebSocket

from database.gas_db_handler import GasMeterDatabaseHandler

router = APIRouter(
    prefix="/ws"
)


@router.websocket("/poll")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    db_handler = GasMeterDatabaseHandler()

    # TODO: This should be retrieved from the database
    ip_address = "192.168.2.95"
    async with HomeWizardEnergy(host=ip_address) as api:
        while True:
            data = await api.data()  # Get measurements, like power or water usage
            external_modules = data.external_devices

            if external_modules:
                for key, modules in external_modules.items():
                    if modules.meter_type.value == ExternalDevice.DeviceType.GAS_METER.value:
                        await db_handler.insert_reading(modules.unique_id, modules.meter_type.name, modules.timestamp,
                                                  modules.value, modules.unit)

            data_dict = asdict(data)
            gas_today = await db_handler.get_todays_usage()
            data_dict['gas_today'] = gas_today[1]

            await websocket.send(json.dumps(data_dict, indent=4, sort_keys=True, default=str))
            await asyncio.sleep(5)
