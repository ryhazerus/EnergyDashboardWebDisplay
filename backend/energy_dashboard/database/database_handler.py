import sqlite3
from contextlib import contextmanager
from typing import List, Tuple

__all__ = ["db_handler"]


class DatabaseHandler:
    def __init__(self, db_name: str):
        # TODO: Should probably be using SQLAlchemy but... oh wel... poc life...
        # TODO: Should make cursor a class obj? Not sure of performance issues.. its local
        # TODO: Should add session filter for setting meter id
        # TODO: This is a lot of todos.... lol
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
                        ip_address TEXT,
                        api_version TEXT DEFAULT 'v1',
                        api_token TEXT
                    )
                """
            )
            # Migration: add columns for existing databases that predate v2 support
            cursor.execute("PRAGMA table_info(smart_meters)")
            columns = {row[1] for row in cursor.fetchall()}
            if "api_version" not in columns:
                cursor.execute("ALTER TABLE smart_meters ADD COLUMN api_version TEXT DEFAULT 'v1'")
            if "api_token" not in columns:
                cursor.execute("ALTER TABLE smart_meters ADD COLUMN api_token TEXT")
            cursor.execute(
                """
                    CREATE TABLE IF NOT EXISTS user_preferences (
                        id INTEGER PRIMARY KEY,
                        user_gas_price REAL
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

    def insert_smart_meter(self, meter_type: str, meter_name: str, timestamp: str, ip_address: str, api_version: str = "v1", api_token: str | None = None):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO smart_meters (meter_type, meter_name, timestamp, ip_address, api_version, api_token)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                (meter_type, meter_name, timestamp, ip_address, api_version, api_token),
            )

    def insert_user_preferences(self, price: str):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO user_preferences (user_gas_price)
                VALUES (?)
                """,
                (price,),
            )

    def get_user_preferences(self):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT user_gas_price FROM user_preferences;
                """,
            )

            row = cursor.fetchone()
            return row if row else (0.0,)

    def insert_gas_reading(
            self,
            meter_type: str,
            smart_meter_id: int,
            timestamp: str,
            value: float,
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
            value: float,
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
            value: float,
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
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM smart_meters LIMIT 1")
            return cursor.fetchall()

    def get_smart_meter_by_id(self, meter_id: int) -> List[Tuple]:
        with self.connect() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM smart_meters WHERE id = ? LIMIT 1", (meter_id,))
            return cursor.fetchall()

    def get_gas_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM gas_readings")
            return cursor.fetchall()

    def get_gas_readings_today(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
              SELECT 
                  date(timestamp) AS date,
                  MAX(value) - MIN(value) AS daily_usage
              FROM 
                  gas_readings
              WHERE
                  date(timestamp) = date('now', 'localtime', 'start of day')
              GROUP BY 
                  date
               """
            )
            row = cursor.fetchone()
            return row if row else ("No data", 0.1)

    def get_energy_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM energy_readings")
            return cursor.fetchall()

    def get_energy_readings_today(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
              SELECT
                  date(timestamp) AS date,
                  MAX(value) - MIN(value) AS daily_usage
              FROM
                  energy_readings
              WHERE
                  date(timestamp) = date('now', 'localtime', 'start of day')
                   AND is_import = 1
              GROUP BY
                  date
               """
            )
            row = cursor.fetchone()
            return row if row else ("No data", 0.1)

    def get_energy_export_readings_today(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
              SELECT
                  date(timestamp) AS date,
                  MAX(value) - MIN(value) AS daily_usage
              FROM
                  energy_readings
              WHERE
                  date(timestamp) = date('now', 'localtime', 'start of day')
                AND is_import = 0
              GROUP BY
                  date
               """
            )
            row = cursor.fetchone()
            return row if row else ("No data", 0.1)

    def get_water_readings(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM water_readings")
            return cursor.fetchall()

    def get_water_readings_today(self) -> List[Tuple]:
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
              SELECT 
                  date(timestamp) AS date,
                  MAX(value) - MIN(value) AS daily_usage
              FROM 
                  water_readings
              WHERE
                  date(timestamp) = date('now', 'localtime', 'start of day')
              GROUP BY 
                  date
               """
            )
            row = cursor.fetchone()
            return row if row else ("No data", 0.0)


db_handler = DatabaseHandler("smart_meters.db")
db_handler.create_tables()
