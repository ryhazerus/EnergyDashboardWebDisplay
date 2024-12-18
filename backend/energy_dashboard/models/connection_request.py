from typing import Optional
from pydantic import BaseModel


class ConnectionRequest(BaseModel):
    meter_brand: str
    meter_ip_address: str
    user_gas_price: Optional[float] = None
