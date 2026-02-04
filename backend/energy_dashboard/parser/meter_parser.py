from datetime import datetime

from homewizard_energy.models import Measurement

from energy_dashboard.common.constants import SMART_METER_ID


class MeterParser:
    def __init__(self, database: "DatabaseHandler"):
        self.__db = database

    def parse_external_modules(self, data: Measurement) -> None:
        self.__parse_export_energy(data)
        self.__parse_import_energy(data)

    def __parse_export_energy(self, data_model: Measurement):
        self.__db.insert_energy_reading(data_model.meter_model, SMART_METER_ID, datetime.now(), data_model.energy_export_kwh, "kWh", False)

    def __parse_import_energy(self, data_model: Measurement):
        self.__db.insert_energy_reading(data_model.meter_model, SMART_METER_ID, datetime.now(), data_model.energy_import_kwh, "kWh", True)
