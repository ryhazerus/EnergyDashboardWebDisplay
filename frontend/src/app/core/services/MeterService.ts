import { API_ENDPOINTS, WS_API } from "../constants/api_calls";
import { DataState, useDataStore } from "../stores/DataStore";

export default class MeterService {
    dataState: DataState;

    constructor(store: DataState) {
        this.dataState = store
    }

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
            throw error;
        }
    }

    async pollMeterData() {
        const ws = new WebSocket(API_ENDPOINTS.HOMEWIZARD.POLLING);

        // Open a connection to the server
        ws.onopen = () => {
            // TODO: propagate this to the Zustand store to show the users 
            console.log("Connection Established!");
        };

        // Wait on messages from the server
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);

            if (response) {
                // TODO: Set the response form the server in Zustand to populate the dashboard meters
                this.dataState.updateMeter(response)
            }
        };

        // On close we're going to try to reconnect again
        ws.onclose = () => {
            console.error("Connection Closed!");
            // TODO: Add a timeout here for easing the load on the frontend
            this.pollMeterData()
        };

        ws.onerror = (err) => {
            // TODO: propagate errors to the Zustand store to inform the users
            console.log("WS Error", err);
        };

        return () => {
            ws.close();
        };
    }
}