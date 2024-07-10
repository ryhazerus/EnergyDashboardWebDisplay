from homewizard_energy import ExternalDevice
from typing import Dict

from energy_dashboard.common.constants import SMART_METER_ID


class ExternalModuleParser:
    def __init__(self, database: "DatabaseHandler"):
        self.__db = database

    def parse_external_modules(self, external_modules: Dict[str, ExternalDevice]) -> None:
        module: ExternalDevice
        for key, module in external_modules.items():
            match module.meter_type:
                case ExternalDevice.DeviceType.WATER_METER:
                    self.__parse_water_meter(module)
                    return
                case ExternalDevice.DeviceType.GAS_METER:
                    self.__parse_gas_meter(module)
                    return
                case _:
                    return

    def __parse_water_meter(self, module: ExternalDevice) -> None:
        self.__db.insert_water_reading(module.meter_type.name, SMART_METER_ID, module.timestamp, module.value, module.unit)

    def __parse_gas_meter(self, module: ExternalDevice) -> None:
        self.__db.insert_gas_reading(
            module.meter_type.name,
            SMART_METER_ID,
            module.timestamp,
            module.value,
            module.unit,
        )
