// TODO: Smart meter interface can be consolidated so that only relevant items are received
interface UserConfiguration {
    meter_brand: string
    meter_ip_address: string,
    user_gas_price: float
}

interface SmartMeter {
    data_p1_meter: P1Model;
    edx_gas_live: number;
    edx_energy_live: number;
    edx_energy_export_live: number;
    edx_water_live: number;
    edx_gas_costs: number;
}

interface P1Model {
    wifi_ssid: string;
    wifi_strength: number;
    protocol_version: number;
    meter_model: string;
    unique_id: string;
    tariff: number;
    energy_import_kwh: number;
    energy_import_t1_kwh: number;
    energy_import_t2_kwh: number;
    energy_import_t3_kwh: number | null;
    energy_import_t4_kwh: number | null;
    energy_export_kwh: number;
    energy_export_t1_kwh: number;
    energy_export_t2_kwh: number;
    energy_export_t3_kwh: number | null;
    energy_export_t4_kwh: number | null;
    power_w: number;
    power_l1_w: number;
    power_l2_w: number;
    power_l3_w: number;
    voltage_v: number | null;
    voltage_l1_v: number;
    voltage_l2_v: number;
    voltage_l3_v: number;
    current_a: number;
    current_l1_a: number;
    current_l2_a: number;
    current_l3_a: number;
    apparent_power_va: number | null;
    apparent_power_l1_va: number | null;
    apparent_power_l2_va: number | null;
    apparent_power_l3_va: number | null;
    reactive_power_var: number | null;
    reactive_power_l1_var: number | null;
    reactive_power_l2_var: number | null;
    reactive_power_l3_var: number | null;
    power_factor: number | null;
    power_factor_l1: number | null;
    power_factor_l2: number | null;
    power_factor_l3: number | null;
    frequency_hz: number | null;
    voltage_sag_l1_count: number;
    voltage_sag_l2_count: number;
    voltage_sag_l3_count: number;
    voltage_swell_l1_count: number;
    voltage_swell_l2_count: number;
    voltage_swell_l3_count: number;
    any_power_fail_count: number;
    long_power_fail_count: number;
    average_power_15m_w: number | null;
    monthly_power_peak_w: number | null;
    monthly_power_peak_timestamp: Date | null;
    active_liter_lpm: number | null;
    total_liter_m3: number | null;
    external_devices: {
        [key: string]: ExternalDevice;
    };
}

interface ExternalDevice {
    unique_id: string;
    type: DeviceType;
    value: number;
    unit: string;
    timestamp: Date;
}

enum DeviceType {
    GAS_METER = "gas_meter",
    HEAT_METER = "heat_meter",
    WARM_WATER_METER = "warm_water_meter",
    WATER_METER = "water_meter",
    INLET_HEAT_METER = "inlet_heat_meter",
}

interface Configuration {
    is_valid: bool
}
