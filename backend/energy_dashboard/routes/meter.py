import json
import asyncio
from dataclasses import asdict

from fastapi import APIRouter
from homewizard_energy import HomeWizardEnergy
from pydantic import parse_obj_as
from starlette.websockets import WebSocket

from energy_dashboard.database.database_handler import db_handler
from energy_dashboard.models.custom_dataset import EnergyDisplayX
from energy_dashboard.models.smart_meter import SmartMeter
from energy_dashboard.parser.external_module_parser import SMART_METER_ID, ExternalModuleParser
from energy_dashboard.parser.meter_parser import MeterParser

router = APIRouter(prefix="/ws")


async def __get_meter(websocket: WebSocket) -> SmartMeter | None:
    smart_meter = None
    try:
        smart_meter_dict = dict(db_handler.get_smart_meter_by_id(SMART_METER_ID)[0])
        smart_meter = parse_obj_as(SmartMeter, smart_meter_dict)
    except Exception as e:
        await websocket.send_text(f"No valid ip {smart_meter} with error {e}")

    if not smart_meter:
        await websocket.send_text(f"No valid ip {smart_meter}")

    return smart_meter


@router.websocket("/meter")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    smart_meter = await __get_meter(websocket)
    if not smart_meter:
        await websocket.send_text("Could not retrieve meter from database")
        return

    model = EnergyDisplayX()
    async with HomeWizardEnergy(host=smart_meter.ip_address) as api:
        while True:
            model.data_p1_meter = await api.data()  # Get measurements, like power or water usage

            # Parse base meter values
            meter_parser = MeterParser(db_handler)
            meter_parser.parse_external_modules(model.data_p1_meter)

            # Parse external meter values
            external_parser = ExternalModuleParser(db_handler)
            external_modules = model.data_p1_meter.external_devices
            if model.data_p1_meter.external_devices:
                external_parser.parse_external_modules(external_modules)

            # All custom data should be prefixed with edx
            model.edx_gas_live = db_handler.get_gas_readings_today()[1]
            model.edx_energy_live = db_handler.get_energy_readings_today()[1]
            model.edx_water_live = db_handler.get_water_readings_today()[1]
            model.edx_energy_export_live = db_handler.get_energy_export_readings_today()[1]
            model.edx_gas_costs = db_handler.get_user_preferences()[0]

            formatted_message = json.dumps(asdict(model), indent=4, sort_keys=True, default=str)
            await websocket.send_text(formatted_message)
            await asyncio.sleep(5)
