import sqlite3
from typing import List, Tuple


class GasMeterDatabaseHandler:
    def __init__(self, db_name: str = 'energy_meter.db'):
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self._create_table()

    def _create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS gas_meter_readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            unique_id TEXT NOT NULL,
            type TEXT NOT NULL,
            timestamp INTEGER NOT NULL,
            value REAL NOT NULL,
            unit TEXT NOT NULL
        );
        ''')
        self.conn.commit()

    def insert_reading(self, unique_id: str, type: str, timestamp: int, value: float, unit: str):
        self.cursor.execute('''
        INSERT INTO gas_meter_readings (unique_id, type, timestamp, value, unit)
        VALUES (?, ?, ?, ?, ?)
        ''', (unique_id, type, timestamp, value, unit))
        self.conn.commit()

    def get_todays_usage(self) -> Tuple[str, float]:
        self.cursor.execute('''
        SELECT 
            date(timestamp) AS date,
            MAX(value) - MIN(value) AS daily_usage
        FROM 
            gas_meter_readings
        WHERE
            date(timestamp) = date('now', 'localtime', 'start of day')
        GROUP BY 
            date
         ''')
        row = self.cursor.fetchone()
        return row if row else ("No data", 0.1)

    def close(self):
        self.conn.close()
