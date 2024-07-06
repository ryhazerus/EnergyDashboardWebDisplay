from src.models.connection_request import ConnectionRequest
from src.validation.home_wizard_validator import HomeWizardValidator


def valid_meter(request: ConnectionRequest):
    match request.meter_brand:
        case "HomeWizard P1 Meter":
            validator = HomeWizardValidator(request.meter_ip_address)
            return validator.validate()

        case _:
            return False
