from pydantic import BaseModel


class HomeWizardP1Scheme(BaseModel):
    product_name: str
    product_type: str
    serial: str
    firmware_version: str
    api_version: str
   