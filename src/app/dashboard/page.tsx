"use client";

import { useEffect, useState } from "react";
import RadialGauge from "../components/RadialGauge";
import MeterGauge from "../components/MeterGauge";
import sun from "./sun.svg"
import thermometer from "./thermometer.svg"
import flame from "./flame.svg"
import ComparisonGauge from "../components/ComparisonGauge";
import arrowUp from "./arrow-up.svg"
import arrowDown from "./arrow-down.svg"

const data_mock: SmartMeter = {
  active_power_w: 0,
  gas_today: 0,
  total_energy_import_kwh: 10
}

export default function Home() {
  const [data, setData] = useState(data_mock);

  useEffect(() => {
    initWebsocket();
  }, []);

  const initWebsocket = () => {
    const ws = new WebSocket(
      "ws://localhost:8001"
    );

    ws.onopen = () => {
      console.log("Connection Established!");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response)
      if (response) {
        setData(response)
      }

    };
    ws.onclose = () => {
      console.log("Connection Closed!");
      initWebsocket();
    };

    ws.onerror = (err) => {
      console.log("WS Error", err);
    };

    return () => {
      ws.close();
    };
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 mx-4 my-12 ...">
          <RadialGauge
            radius={150}
            value={data.active_power_w}
            maxValue={10000}
            unit="w"
            gaugeBackground="#2c134d"
            gaugeHighlight="#8d37ff"
            fontColor="#eaeaea"
          />
          <ComparisonGauge
            valueInIcon={arrowUp}
            valueIn={11.8}
            valueOut={14.5}
            valueOutIcon={arrowDown}
            unit={'kWh'}

          />
        </div>
        <div className="col-span-2 ...">
          <RadialGauge
            radius={90}
            value={0}
            maxValue={100}
            unit="L"
            gaugeBackground="#1b3b50"
            gaugeHighlight="#3dbfff"
            fontColor="#eaeaea"
          />
        </div>
        <div className="row-span-2 col-span-2 ...">
          <RadialGauge
            radius={110}
            value={Math.round(data.gas_today * 100) / 100}
            maxValue={10}
            unit="m3"
            gaugeBackground="#501228"
            gaugeHighlight="#fd2d86"
            fontColor="#eaeaea"
          />
        </div>
        <div className="mx-8 col-span-2 ...">
          <MeterGauge
            icon={flame}
            value={12.67}
            minValue={0}
            maxValue={100}
            unit={"€"}
            gaugeBackground={"#595959"}
            gaugeHighlight={"#ffffff"}
            fontColor={""}
            width={200}
            height={20}
          />
        </div>
        <div className="mx-8 col-span-2 ...">
          <MeterGauge
            icon={sun}
            value={18.32}
            minValue={0}
            maxValue={35}
            unit={"kWh"}
            gaugeBackground={"#314d2c"}
            gaugeHighlight={"#5fda35"}
            fontColor={""}
            width={200}
            height={20}
          />
        </div>
        <div className="mx-8 col-span-2 ...">
          <MeterGauge
            icon={thermometer}
            value={21}
            minValue={0}
            maxValue={50}
            unit={"°C"}
            gaugeBackground={"#59382b"}
            gaugeHighlight={"#ff7600"}
            fontColor={""}
            width={200}
            height={20}
          />
        </div>
      </div>
    </main>
  );
}
