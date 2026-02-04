from energy_dashboard.models.connection_request import ConnectionRequest
from energy_dashboard.validation.home_wizard_validator import HomeWizardValidator


async def valid_meter(request: ConnectionRequest, existing_token: str | None = None) -> dict | None:
    """Validate the meter and return connection info dict, or None if invalid.

    The returned dict contains 'api_version' and 'token' (token is None for v1).
    Lets DisabledError propagate so the route can return a specific error message.

    existing_token, when provided, is tried before requesting a fresh token from the
    device.  This avoids the button-press flow on re-saves when the token is still valid.
    """
    match request.meter_brand:
        case "HomeWizard P1 Meter":
            validator = HomeWizardValidator(request.meter_ip_address)
            return await validator.validate(existing_token)

        case _:
            return None
