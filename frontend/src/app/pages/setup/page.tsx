"use client";

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import MeterService from "@/app/core/services/MeterService";
import { useConnectionStore } from "@/app/core/stores/ConnectionStore";
import { DataState } from "@/app/core/stores/DataStore";
import Configurations from "@/app/components/configuration/Configuration";

const meterService = new MeterService({} as DataState);

export default function Setup() {
    const router = useRouter();

    const state = useConnectionStore();

    useEffect(() => {
        // TODO: this should be moved to an auth middleware
        if (state.meter.meter_ip_address) {
            router.push('/pages/dashboard', { scroll: false })
        }
    },)



    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Container for configuration setup */}
            <div className="pb-5 mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <h1 className="text-2xl font-semibold leading-6 text-gray-200">P1 Energy Dashboard⚡</h1>
                <p className="mt-2 max-w-4xl text-sm text-gray-300">You have successfully installed the P1 Energy Dashboard for Web. Please finish your setup to go to the display dashboard.</p>
                <div className="border-b border-gray-200 py-4"></div>
                <Configurations />
                {/* Disclaimer for users warning state of software */}
                <p className="mt-2 max-w-4xl text-sm text-gray-400"><span className="text-white">Disclaimer:</span> This is an <span className="underline">unofficial</span> app that comes without any support. We are not affiliated with any of the brands we support. If you&apos;re experiencing problems please submit a ticket on our <a className="underline" href="https://github.com/ryhazerus">Github page</a> and we will try to help.</p>
            </div>
        </div>

    )
}