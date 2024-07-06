import sqlite3
from contextlib import contextmanager
from typing import List, Tuple

__all__ = ["db_handler"]


class DatabaseHandler:
    def __init__(self, db_name: str):
        self.db_name = db_name

    @contextmanager
    def connect(self):
        connection = sqlite3.connect(self.db_name)
        try:
            yield connection
        finally:
            connection.commit()
            connection.close()

    def create_tables(self):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS smart_meters (
                    id INTEGER PRIMARY KEY,
                    meter_type TEXT,
                    meter_name TEXT,
                    timestamp TEXT,
                    ip_address TEXT
                )
            """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS gas_readings (
                    id INTEGER PRIMARY KEY,
                    meter_type TEXT,
                    smart_meter_id INTEGER,
                    timestamp TEXT,
                    value TEXT,
                    unit TEXT,
                    FOREIGN KEY (smart_meter_id) REFERENCES smart_meters(id)
                )
            """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS energy_readings (
                    id INTEGER PRIMARY KEY,
                    meter_type TEXT,
                    smart_meter_id INTEGER,
                    timestamp TEXT,
                    value TEXT,
                    unit TEXT,
                    is_import BOOLEAN,
                    FOREIGN KEY (smart_meter_id) REFERENCES smart_meters(id)
                )
            """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS water_readings (
                    id INTEGER PRIMARY KEY,
                    meter_type TEXT,
                    smart_meter_id INTEGER,
                    timestamp TEXT,
                    value TEXT,
                    unit TEXT,
                    FOREIGN KEY (smart_meter_id) REFERENCES smart_meters(id)
                )
            """
            )

    def insert_smart_meter(
        self, meter_type: str, meter_name: str, timestamp: str, ip_address: str
    ):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO smart_meters (meter_type, meter_name, timestamp, ip_address)
                VALUES (?, ?, ?, ?)
            """,
                (meter_type, meter_name, timestamp, ip_address),
            )

    def insert_gas_reading(
        self,
        meter_type: str,
        smart_meter_id: int,
        timestamp: str,
        value: str,
        unit: str,
    ):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO gas_readings (meter_type, smart_meter_id, timestamp, value, unit)
                VALUES (?, ?, ?, ?, ?)
            """,
                (meter_type, smart_meter_id, timestamp, value, unit),
            )

    def insert_energy_reading(
        self,
        meter_type: str,
        smart_meter_id: int,
        timestamp: str,
        value: str,
        unit: str,
        is_import: bool,
    ):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO energy_readings (meter_type, smart_meter_id, timestamp, value, unit, is_import)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                (meter_type, smart_meter_id, timestamp, value, unit, is_import),
            )

    def insert_water_reading(
        self,
        meter_type: str,
        smart_meter_id: int,
        timestamp: str,
        value: str,
        unit: str,
    ):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO water_readings (meter_type, smart_meter_id, timestamp, value, unit)
                VALUES (?, ?, ?, ?, ?)
            """,
                (meter_type, smart_meter_id, timestamp, value, unit),
            )

    def get_smart_meters(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM smart_meters")
            return cursor.fetchall()

    def get_gas_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM gas_readings")
            return cursor.fetchall()

    def get_energy_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM energy_readings")
            return cursor.fetchall()

    def get_water_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM water_readings")
            return cursor.fetchall()


db_handler = DatabaseHandler("smart_meters.db")
db_handler.create_tables()
