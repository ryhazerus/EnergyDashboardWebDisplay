from pydantic import BaseModel
from typing import Optional


class UserConfiguration(BaseModel):
    user_gas_price: Optional[float]
