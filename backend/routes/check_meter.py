from fastapi import APIRouter

from models.connection_request import ConnectionRequest

router = APIRouter()


@router.post("/check/")
async def check_meter(conn_request: ConnectionRequest):

    

    return conn_request.model_dump()


