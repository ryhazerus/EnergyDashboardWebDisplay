"use client";

import { useEffect, useState } from "react";
import RadialGauge from "../../components/gauges/RadialGauge";
import MeterGauge from "../../components/gauges/MeterGauge";
import ComparisonGauge from "../../components/gauges/ComparisonGauge";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

import { useConnectionStore } from "@/app/core/stores/ConnectionStore";
import { useDataStore } from "@/app/core/stores/DataStore";
import { useRouter } from 'next/navigation'
import MeterService from "@/app/core/services/MeterService";

import { formatRounding } from "@/app/core/utils/formatting";
import Configuration from "@/app/components/configuration/Configuration";

export default function Home() {

  const router = useRouter();
  const connectionState = useConnectionStore();
  const dataState = useDataStore();
  const meterService = new MeterService(dataState);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Set meter check here to see if we are connected to a smart meter
    if (!connectionState.meter.meter_ip_address) {
      router.push('/pages/setup', { scroll: false })
    }

    // Start websocket service, this might need some error handling
    meterService.pollMeterData();
  }, []);

  const calcGasUsageEur = (gas_price: number, gas_usage: number) => {
    if (!gas_price) {
      gas_price = 0;
    }

    if (!gas_usage) {
      gas_usage = 0;
    }

    return formatRounding(gas_price * gas_usage);
  }

  const openConfigMenu = () => {
    setOpen(!open)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-rows-3 grid-flow-col gap-4">

        <div className="row-span-3 mx-4 my-12 ...">
          <RadialGauge
            radius={150}
            value={dataState.dataStream?.data_p1_meter?.power_w}
            maxValue={5000}
            unit="w"
            gaugeBackground="#2c134d"
            gaugeHighlight="#8d37ff"
            fontColor="#eaeaea"
          />
          <ComparisonGauge
            valueIn={(((dataState.dataStream.edx_energy_export_live * 5) / 3600) / 1000)}
            valueOut={(((dataState.dataStream.edx_energy_live * 5) / 3600) / 1000)}
            unit={'kWh'}
          />
        </div>
        <div className="col-span-2 ...">
          <RadialGauge
            radius={90}
            value={dataState.dataStream.edx_water_live}
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
            value={calcGasUsageEur(dataState.dataStream?.edx_gas_costs, dataState.dataStream.edx_gas_live)}
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
            value={dataState.dataStream.edx_energy_export_live ?? 0.00}
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
        <div className="row-span-1">
          <button
            type="button"
            onClick={() => openConfigMenu()}
            className="ml-3 inline-flex items-center rounded-md border border-white bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Configure
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center  p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden bg-black border border-gray-300 rounded-lg  px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-100">
                    Configuration
                  </DialogTitle>
                  {/* Insert Config here */}
                  <Configuration />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
