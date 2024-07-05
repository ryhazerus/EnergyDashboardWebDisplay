from pydantic import BaseModel


class DefaultResponse(BaseModel):
    status: int
    message: str
    body: object
