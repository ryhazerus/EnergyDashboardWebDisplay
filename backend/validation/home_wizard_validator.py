from validation.meter_validation import BaseValidator
import asyncio
from homewizard_energy import HomeWizardEnergy


class HomeWizardValidator(BaseValidator):

    def __init__(self, ip_address, identifier):
        super().__init__(ip_address, identifier)

    async def validate_connection(self) -> bool:
        if not self.ip_address:
            raise NotImplementedError

        async with HomeWizardEnergy(host=self.ip_address) as api:
            result = await api.device()

            if result.product_type == "HWE-P1":
                return True

            return False
