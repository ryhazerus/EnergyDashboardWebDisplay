
const BASE_API = "http://localhost:8000"


/**
 * API Call internal library for keeping track
 * of all available APIs used in services.
 * Everything is grouped by api endpoint.
 */
export const API_ENDPOINTS = Object.freeze({
    CHECK: {
        VALIDATE: `${BASE_API}/meters/check`,
    }
});