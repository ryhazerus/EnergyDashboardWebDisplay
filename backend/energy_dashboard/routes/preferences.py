from fastapi import APIRouter, HTTPException
import datetime
from homewizard_energy import DisabledError
from energy_dashboard.database.database_handler import db_handler
from energy_dashboard.models.connection_request import ConnectionRequest
from energy_dashboard.models.response import DefaultResponse
from energy_dashboard.validation.base import valid_meter

router = APIRouter(prefix="/meters")

# TODO: For now this is the only distinction needed, keep in mind in future design decisions
METER_TYPE = "P1"


def parse_gas_price(gas_price):
    """
    Parses the input to determine a valid gas price.

    Args:
        gas_price: The input value to be parsed. It can be a float, string, or None.

    Returns:
        float: The parsed gas price. Returns 0.00 for invalid inputs.
    """
    try:
        # Handle None or empty string inputs
        if gas_price is None or (isinstance(gas_price, str) and gas_price.strip() == ""):
            return 0.00

        # Attempt to convert to float
        return float(gas_price)
    except (ValueError, TypeError):
        # Return 0.00 for invalid conversions
        return 0.00


@router.post("/check")
async def check_meter(conn_request: ConnectionRequest):
    # If we already have a token stored for this IP, pass it so the validator can
    # verify connectivity without hitting the button-press flow again.
    existing_token = None
    try:
        rows = db_handler.get_smart_meters()
        if rows:
            existing = dict(rows[0])
            if existing.get("ip_address") == conn_request.meter_ip_address and existing.get("api_token"):
                existing_token = existing["api_token"]
    except Exception:
        pass

    # Validate meter settings by calling the designated meter API.
    # DisabledError propagates when the device is v2 but token creation is not enabled.
    try:
        meter_info = await valid_meter(conn_request, existing_token)
    except DisabledError:
        raise HTTPException(
            status_code=403,
            detail="Press the button on your HomeWizard device, then click Save again within 30 seconds.",
        )

    if not meter_info:
        raise HTTPException(status_code=404, detail="No Smart Meter Found")

    # Insert base meter information in the config database
    db_handler.insert_smart_meter(
        meter_type=METER_TYPE,
        meter_name=conn_request.meter_brand,
        timestamp=datetime.datetime.now(),
        ip_address=conn_request.meter_ip_address,
        api_version=meter_info["api_version"],
        api_token=meter_info.get("token"),
    )

    # Always resolve to a valid gas price format
    user_gas_price = parse_gas_price(conn_request.user_gas_price)

    db_handler.insert_user_preferences(user_gas_price)

    # Return a valid response with the basic meter information
    return DefaultResponse(status=200, message=f"{conn_request.meter_brand} Smart Meter Found",
                           body=conn_request).model_dump()
