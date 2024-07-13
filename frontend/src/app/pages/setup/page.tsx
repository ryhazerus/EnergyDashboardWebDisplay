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
       <div>
            <Configurations />
        </div>
    )
}