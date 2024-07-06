import json
import asyncio
from dataclasses import asdict
from datetime import datetime

from fastapi import APIRouter
from homewizard_energy import HomeWizardEnergy, ExternalDevice
from pydantic import parse_obj_as
from starlette.websockets import WebSocket

from energy_dashboard.database.database_handler import db_handler
from energy_dashboard.models.smart_meter import SmartMeter

router = APIRouter(prefix="/ws")


@router.websocket("/meter")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    # TODO: Should be configurable through the frontend for now only support one smart meter
    SMART_METER_ID = 1

    smart_meter = None

    try:
        smart_meter_dict = dict(db_handler.get_smart_meter_by_id(SMART_METER_ID)[0])

        # Use parse_obj_as to convert list of dictionaries to list of SmartMeter instances
        smart_meter = parse_obj_as(SmartMeter, smart_meter_dict)
    except Exception as e:
        await websocket.send_text(f"No valid ip {smart_meter} with error {e}")
        return

    if not smart_meter:
        await websocket.send_text(f"No valid ip {smart_meter}")

        return

    async with HomeWizardEnergy(host=smart_meter.ip_address) as api:
        while True:
            data = await api.data()  # Get measurements, like power or water usage
            external_modules = data.external_devices
            db_handler.insert_energy_reading(
                data.meter_model,
                SMART_METER_ID,
                datetime.now(),
                data.active_power_w,
                "w",
                False
            )
            if external_modules:
                for key, modules in external_modules.items():
                    if modules.meter_type.value == ExternalDevice.DeviceType.GAS_METER.value:
                        db_handler.insert_gas_reading(
                            modules.meter_type.name,
                            SMART_METER_ID,
                            modules.timestamp,
                            modules.value,
                            modules.unit,
                        )

            data_dict = asdict(data)

            # All custom data should be prefixed with edx
            data_dict["edx_gas_live"] = db_handler.get_gas_readings_today()[1]
            data_dict["edx_energy_live"] = db_handler.get_energy_readings_today()[1]

            formatted_message = json.dumps(data_dict, indent=4, sort_keys=True, default=str)
            await websocket.send_text(formatted_message)
            await asyncio.sleep(5)
