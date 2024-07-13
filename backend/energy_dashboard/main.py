import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from energy_dashboard.routes import preferences, meter

app = FastAPI()

# Set configurations for FastAPI
# TODO: Set the whitelisting accordingly
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
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

app.include_router(preferences.router)
app.include_router(meter.router)


def start():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    start()
