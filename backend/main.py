import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import check_meter, meter_poll

app = FastAPI()

# Set configurations for FastAPI
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
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

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)
