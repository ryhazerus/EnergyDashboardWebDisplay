from energy_dashboard.validation.base.validator import BaseValidator
from homewizard_energy import HomeWizardEnergyV1, HomeWizardEnergyV2, DisabledError, has_v2_api
from homewizard_energy.errors import UnauthorizedError


class HomeWizardValidator(BaseValidator):
    async def validate(self, existing_token: str | None = None) -> dict | None:
        """Detect API version, authenticate if needed, and return connection info.

        Returns a dict with 'api_version' and 'token' on success, or None on failure.
        Raises DisabledError when the device is v2 but token creation has not been
        enabled (user needs to press the button on the device).

        If existing_token is provided (from a previous successful auth), it is tried
        first.  Only if the device rejects it (UnauthorizedError) does the flow fall
        through to get_token(), which requires the user to press the physical button.
        """
        if not self.ip_address or not self.is_valid_ip(self.ip_address):
            return None

        try:
            is_v2 = await has_v2_api(self.ip_address)

            if is_v2:
                # Re-use a previously stored token when available
                if existing_token:
                    try:
                        async with HomeWizardEnergyV2(host=self.ip_address, token=existing_token) as api:
                            device_info = await api.device()
                            if device_info:
                                return {"api_version": "v2", "token": existing_token}
                    except UnauthorizedError:
                        pass  # token was revoked; fall through to get_token()

                # No valid token — go through the button-press auth flow
                async with HomeWizardEnergyV2(host=self.ip_address) as api:
                    token = await api.get_token("energy-dashboard")
                    device_info = await api.device()
                    if device_info:
                        return {"api_version": "v2", "token": token}
            else:
                async with HomeWizardEnergyV1(host=self.ip_address) as api:
                    device_info = await api.device()
                    if device_info:
                        return {"api_version": "v1", "token": None}
        except DisabledError:
            raise
        except Exception:
            pass

        return None
