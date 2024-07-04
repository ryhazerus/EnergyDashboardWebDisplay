"use client";

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const BASE_API = "/api/v1/data"

export default function Setup() {
    const [userInput, setUserInput] = useState("")
    const [configuration, setConfiguration] = useState({})
    const router = useRouter()





    const checkConnection = (userInputValue: string) => {
        const METER_CHECK = "meter_model";
        let formattedUrl = `http://${userInputValue}${BASE_API}`
        console.log(formattedUrl)
        fetch(formattedUrl, { mode: 'no-cors' })
            .then(response => {
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: any) => {
                let result = data[METER_CHECK] ?? undefined;

                if (result) {
                    router.push('/dashboard', { scroll: false });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle error state or show error message to user
            });
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userInputValue = event.currentTarget.p1meter.value;

        if (userInputValue) {
            setUserInput(userInputValue);
            checkConnection(userInputValue);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="pb-5 mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <h1 className="text-2xl font-semibold leading-6 text-gray-200">P1 Energy Dashboard⚡</h1>
                <p className="mt-2 max-w-4xl text-sm text-gray-300">You have successfully installed the Unofficial P1 Energy Display for Web. Please finish your setup to go to the display.</p>
                <div className="border-b border-gray-200 py-4"></div>
                <div className="overflow-hidden rounded-lg bg-black shadow my-8 border border-gray-700">
                    <div className="px-4 py-5 sm:p-6">
                        <form onSubmit={onSubmit} method="GET">
                            <div>
                                <div className="my-2">
                                    <label htmlFor="location" className="block text-sm font-medium leading-6">
                                        Meter Brand
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
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
                                        <input type="text" name="p1meter" id="p1meter" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="192.168.1.1" />
                                    </div>
                                    <button type="submit" className=" w-full rounded-md bg-indigo-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Connect</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <p className="mt-2 max-w-4xl text-sm text-gray-400"><span className="text-white">Disclaimer:</span> This is an <span className="underline">unofficial</span> app that comes without any support. We are not affiliated with any of the brands we support. If you&apos;re experiencing problems please submit a ticket on <a className="underline" href="https://github.com/ryhazerus">github.com</a> and we will try to help.</p>
            </div>
        </div>
    )
}