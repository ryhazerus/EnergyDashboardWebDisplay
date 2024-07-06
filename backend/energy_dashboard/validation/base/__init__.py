from energy_dashboard.models.connection_request import ConnectionRequest
from energy_dashboard.validation.home_wizard_validator import HomeWizardValidator


async def valid_meter(request: ConnectionRequest):
    match request.meter_brand:
        case "HomeWizard P1 Meter":
            validator = HomeWizardValidator(request.meter_ip_address)
            return await validator.validate()

        case _:
            return False
