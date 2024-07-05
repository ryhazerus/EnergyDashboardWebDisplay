import { API_ENDPOINTS } from "../constants/api_calls";

export default class MeterService {

    async check(connection: MeterConnection) {
        try {
            const response = await fetch(API_ENDPOINTS.CHECK.VALIDATE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(connection)
            });

            if (!response.ok) {
                throw new Error(JSON.stringify(response));
            }

            return await response.json();

        } catch (error) {
            console.error("Error in MeterService check:", error);
            throw error;
        }
    }
}