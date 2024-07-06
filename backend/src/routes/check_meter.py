from fastapi import APIRouter
import datetime
from src.database.database_handler import db_handler
from src.models.connection_request import ConnectionRequest
from src.models.response import DefaultResponse
from src.validation.base import valid_meter

router = APIRouter()
METER_TYPE = "P1"


@router.post("/check/")
async def check_meter(conn_request: ConnectionRequest):
    if not valid_meter(conn_request):
        return DefaultResponse(
            status=404, message="No Smart Meter Found", body={}
        ).model_dump()

    db_handler.insert_smart_meter(
        meter_type=METER_TYPE,
        meter_name=conn_request.meter_brand,
        timestamp=datetime.datetime.now(),
        ip_address=conn_request.meter_ip_address,
    )

    return DefaultResponse(
        status=200,
        message=f"{conn_request.meter_brand} Smart Meter Found",
        body=conn_request,
    ).model_dump()
