import sqlite3
from typing import List, Tuple


class UserConfigDatabaseHandler:
    def __init__(self, db_name: str = 'energy_meter.db'):
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self._create_table()

    def _create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS meter_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            unique_id TEXT NOT NULL,
            ip_address TEXT NOT NULL,
        );
        ''')
        self.conn.commit()

    def insert_config(self, unique_id: str, ip_address: str):
        self.cursor.execute('''
        INSERT INTO meter_config (unique_id, ip_address)
        VALUES (?, ?, ?, ?, ?)
        ''', (unique_id, ip_address))
        self.conn.commit()

    def get_config(self) -> Tuple[str, float]:
        self.cursor.execute('''
        SELECT 
            *
        FROM 
            meter_config;
         ''')
        row = self.cursor.fetchone()
        return row if row else ("No data", 0.1)

    def close(self):
        self.conn.close()
