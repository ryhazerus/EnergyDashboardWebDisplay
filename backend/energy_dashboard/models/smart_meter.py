import datetime
from typing import Optional

from pydantic import Field, BaseModel


class SmartMeter(BaseModel):
    id: Optional[int] = Field(None, description="The primary key of the smart meter")
    meter_type: str = Field(..., description="The type of the smart meter (e.g., Electric, Gas, Water)")
    meter_name: str = Field(..., description="The name of the smart meter")
    timestamp: datetime = Field(..., description="The timestamp when the smart meter was created")
    ip_address: str = Field(..., description="The IP address of the smart meter")
    api_version: str = Field(default="v1", description="HomeWizard API version (v1 or v2)")
    api_token: Optional[str] = Field(None, description="Authentication token for v2 API devices")

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
