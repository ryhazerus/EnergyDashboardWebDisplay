import { API_ENDPOINTS } from "../constants/api_calls";


export interface MeterConnection {
    meter_brand: string
    meter_ip_address: string,
}


export default class MeterService {

    async check(connection: MeterConnection) {
        try {
            const response = await fetch(API_ENDPOINTS.CHECK.VALIDATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(connection)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error in MeterService check:", error);
            throw error;
        }
    }
}