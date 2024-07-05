"use client";

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import MeterService from "@/app/core/services/MeterService";
import { useConnectionStore } from "@/app/core/store/ConnectionStore";

const meterService = new MeterService();

export default function Setup() {
    const router = useRouter();
    const state = useConnectionStore()

    const [errors, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // TODO: this should be moved to an auth middleware
        if (state.meter.meter_ip_address) {
            router.push('/pages/dashboard', { scroll: false })
        }
    },)

    const checkConnection = async (meterConnection: MeterConnection) => {

        // Enable loading icon on button
        setIsLoading(true)

        // Perform meter check, if the response is valid redirect to dashboard
        meterService.check(meterConnection)
            .then(response => {
                // Save meter to local storage for next sessions
                state.setMeter(meterConnection)
                router.push('/pages/dashboard', { scroll: false })
            })
            .catch(error => {
                // TODO: Pass error form API back to frontend
                setError("Could not connect to meter")
                setIsLoading(false)
            });
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Collect information from html form, these are required by the backend
        const meterBrand = event.currentTarget.meterBrand?.value;
        const meterAddress = event.currentTarget.p1meter?.value;

        // Check if the meter brand has been set, default is HomeWizard P1
        if (!meterBrand) {
            setError("Meter brand is not set")
            return
        }

        // Check if the ip address of the meter has been filled in
        if (!meterAddress) {
            setError("Meter ip address is not set")
            return
        }

        // Map user inputs to MeterConnection data-structure
        // Extra validation will be performed server-side with Pydantic 
        let meterConnection: MeterConnection = {
            meter_brand: meterBrand,
            meter_ip_address: meterAddress
        }

        // Perform the connectivity check with the given information
        checkConnection(meterConnection);
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Container for configuration setup */}
            <div className="pb-5 mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <h1 className="text-2xl font-semibold leading-6 text-gray-200">P1 Energy Dashboard⚡</h1>
                <p className="mt-2 max-w-4xl text-sm text-gray-300">You have successfully installed the P1 Energy Dashboard for Web. Please finish your setup to go to the display dashboard.</p>
                <div className="border-b border-gray-200 py-4"></div>
                <div className="overflow-hidden rounded-lg bg-black shadow my-8 border border-gray-700">
                    <div className="px-4 py-5 sm:p-6">
                        {/* Configuration form for setting up the P1 meter dashboard */}
                        <form onSubmit={onSubmit} method="POST">
                            <div>
                                <div className="my-2">
                                    <label htmlFor="location" className="block text-sm font-medium leading-6">
                                        Meter Brand
                                    </label>
                                    <select
                                        id="location"
                                        name="meterBrand"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-black-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue="HomeWizard P1 Meter"
                                    >
                                        <option>HomeWizard P1 Meter</option>
                                    </select>
                                </div>
                                <label htmlFor="p1meter" className="block text-sm font-medium leading-6 text-gray-200">P1 Meter IP Address</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
                                        <input type="text" autoComplete="off" name="p1meter" id="p1meter" className="block autofill:bg-black flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="192.168.1.1" />
                                    </div>
                                    <button hidden={isLoading} type="submit" className=" w-full rounded-md bg-indigo-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Connect</button>
                                    <button hidden={!isLoading} disabled={true} type="button" className="w-full rounded-md bg-indigo-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                        </svg>
                                        Loading...
                                    </button>
                                    {/* Reactive-ish form errors to display to the user... this could be nicer... */}
                                    {errors ? (<p className="text-red-400 text-center">{errors}</p>) : ""}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Disclaimer for users warning state of software */}
                <p className="mt-2 max-w-4xl text-sm text-gray-400"><span className="text-white">Disclaimer:</span> This is an <span className="underline">unofficial</span> app that comes without any support. We are not affiliated with any of the brands we support. If you&apos;re experiencing problems please submit a ticket on our <a className="underline" href="https://github.com/ryhazerus">Github page</a> and we will try to help.</p>
            </div>
        </div>
    )
}