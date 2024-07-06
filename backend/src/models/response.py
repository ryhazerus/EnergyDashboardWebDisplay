from pydantic import BaseModel
from typing import Dict


class DefaultResponse(BaseModel):
    status: int
    message: str
    body: Dict
