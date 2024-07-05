import uvicorn
from fastapi import FastAPI

from routes import check_meter, meter_poll

app = FastAPI()

app.include_router(check_meter.router)
app.include_router(meter_poll.router)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
