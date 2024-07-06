import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from energy_dashboard.routes import check_meter, meter_poll

app = FastAPI()

# Set configurations for FastAPI
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(check_meter.router)
app.include_router(meter_poll.router)


def start():
    uvicorn.run(app, host="0.0.0.0", port=8000)
