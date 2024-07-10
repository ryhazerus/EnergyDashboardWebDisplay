from datetime import datetime

from homewizard_energy import Data

from energy_dashboard.common.constants import SMART_METER_ID


class MeterParser:
    def __init__(self, database: "DatabaseHandler"):
        self.__db = database

    def parse_external_modules(self, data: Data) -> None:
        self.__parse_export_energy(data)
        self.__parse_import_energy(data)

    def __parse_export_energy(self, data_model: Data):
        self.__db.insert_energy_reading(data_model.meter_model, SMART_METER_ID, datetime.now(), data_model.total_energy_export_kwh, "kWh", True)

    def __parse_import_energy(self, data_model: Data):
        self.__db.insert_energy_reading(data_model.meter_model, SMART_METER_ID, datetime.now(), data_model.active_power_w, "w", False)
