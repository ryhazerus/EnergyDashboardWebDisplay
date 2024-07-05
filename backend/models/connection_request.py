from pydantic import BaseModel


class ConnectionRequest(BaseModel):
    meter_brand: str
    ip_address: str
