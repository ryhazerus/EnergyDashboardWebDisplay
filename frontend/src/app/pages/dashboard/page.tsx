"use client";

import { useEffect, useState } from "react";
import RadialGauge from "../../components/gauges/RadialGauge";
import MeterGauge from "../../components/gauges/MeterGauge";
import ComparisonGauge from "../../components/gauges/ComparisonGauge";

import flame from "./icons/flame.svg"
import sun from "./icons/sun.svg"
import thermometer from "./icons/thermometer.svg"

import { useConnectionStore } from "@/app/core/stores/ConnectionStore";
import { useDataStore } from "@/app/core/stores/DataStore";
import { useRouter } from 'next/navigation'
import MeterService from "@/app/core/services/MeterService";



export default function Home() {

  const router = useRouter();
  const connectionState = useConnectionStore();
  const dataState = useDataStore();
  const meterService = new MeterService(dataState);


  useEffect(() => {
    // Set meter check here to see if we are connected to a smart meter
    if (!connectionState.meter.meter_ip_address) {
      router.push('/pages/setup', { scroll: false })
    }

    // Start websocket service, this might need some error handling
    meterService.pollMeterData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 mx-4 my-12 ...">
          <RadialGauge
            radius={150}
            value={dataState.dataStream.active_power_w}
            maxValue={5000}
            unit="w"
            gaugeBackground="#2c134d"
            gaugeHighlight="#8d37ff"
            fontColor="#eaeaea"
          />
          <ComparisonGauge
            valueIn={0.00}
            valueOut={(((dataState.dataStream.edx_energy_live * 5) / 3600) / 1000)}
            unit={'kWh'}
          />
        </div>
        <div className="col-span-2 ...">
          <RadialGauge
            radius={90}
            value={0.00}
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
            value={dataState.dataStream.edx_gas_live}
            maxValue={10}
            unit="m3"
            gaugeBackground="#501228"
            gaugeHighlight="#fd2d86"
            fontColor="#eaeaea"
          />
        </div>
        <div className="mx-8 col-span-2 ...">
          <MeterGauge
            icon={'/icons/flame.svg'}
            value={0}
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
            icon={'/icons/sun.svg'}
            value={0}
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
            icon={'/icons/thermometer.svg'}
            value={0}
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
