from energy_dashboard.validation.base.validator import BaseValidator
from homewizard_energy import HomeWizardEnergy


class HomeWizardValidator(BaseValidator):
    async def validate(self) -> bool:
        async with HomeWizardEnergy(host=self.ip_address) as api:
            try:
                if not self.ip_address or not self.is_valid_ip(self.ip_address):
                    raise ValueError(f"This value is not an ip address {self.ip_address}")
                device_info = await api.device()
                if device_info:
                    return True
            except Exception as e:
                return False
            return False
