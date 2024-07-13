// TODO: Smart meter interface can be consolidated so that only relevant items are received
interface UserConfiguration {
    meter_brand: string
    meter_ip_address: string,
    user_gas_price: number
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
    smr_version: number;
    meter_model: string;
    unique_meter_id: string;
    active_tariff: number;
    total_energy_import_kwh: number;
    total_energy_import_t1_kwh: number;
    total_energy_import_t2_kwh: number;
    total_energy_import_t3_kwh: number | null;
    total_energy_import_t4_kwh: number | null;
    total_energy_export_kwh: number;
    total_energy_export_t1_kwh: number;
    total_energy_export_t2_kwh: number;
    total_energy_export_t3_kwh: number | null;
    total_energy_export_t4_kwh: number | null;
    active_power_w: number;
    active_power_l1_w: number;
    active_power_l2_w: number;
    active_power_l3_w: number;
    active_voltage_v: number | null;
    active_voltage_l1_v: number;
    active_voltage_l2_v: number;
    active_voltage_l3_v: number;
    active_current_a: number;
    active_current_l1_a: number;
    active_current_l2_a: number;
    active_current_l3_a: number;
    active_apparent_power_va: number | null;
    active_apparent_power_l1_va: number | null;
    active_apparent_power_l2_va: number | null;
    active_apparent_power_l3_va: number | null;
    active_reactive_power_var: number | null;
    active_reactive_power_l1_var: number | null;
    active_reactive_power_l2_var: number | null;
    active_reactive_power_l3_var: number | null;
    active_power_factor: number | null;
    active_power_factor_l1: number | null;
    active_power_factor_l2: number | null;
    active_power_factor_l3: number | null;
    active_frequency_hz: number | null;
    voltage_sag_l1_count: number;
    voltage_sag_l2_count: number;
    voltage_sag_l3_count: number;
    voltage_swell_l1_count: number;
    voltage_swell_l2_count: number;
    voltage_swell_l3_count: number;
    any_power_fail_count: number;
    long_power_fail_count: number;
    active_power_average_w: number | null;
    monthly_power_peak_w: number | null;
    monthly_power_peak_timestamp: Date | null;
    total_gas_m3: number;
    gas_timestamp: Date;
    gas_unique_id: string;
    active_liter_lpm: number | null;
    total_liter_m3: number | null;
    external_devices: {
        [key: string]: ExternalDevice;
    };
}

interface ExternalDevice {
    unique_id: string;
    meter_type: DeviceType;
    value: number;
    unit: string;
    timestamp: Date;
}

enum DeviceType {
    GAS_METER = 3
}

interface Configuration {
    is_valid: bool
}
