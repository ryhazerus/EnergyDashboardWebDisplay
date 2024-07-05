interface SmartMeter {
    active_power_w: double
    gas_today: double
    total_energy_import_kwh: double
}

interface Configuration {
    is_valid: bool
}


interface MeterConnection {
    meter_brand: string
    meter_ip_address: string,
}
