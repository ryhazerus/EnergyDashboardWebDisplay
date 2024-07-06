import { formatRounding } from "@/app/core/utils/formatting"
import Image from "next/Image"

interface ComparisonGaugeProps {
    valueInIcon: JSX.Element
    valueIn: number
    valueOut: number
    valueOutIcon: JSX.Element
    unit: string
}

export default function ComparisonGauge(props: ComparisonGaugeProps) {
    return (
        <div className="flex flex-col items-center m-4">
            <div className="flex flex-row items-center">
                <Image src={props.valueInIcon} alt="Image 1" width={40} height={40} />
                <h3 className="ml-2 text-4xl font-semibold">{formatRounding(props.valueIn)}</h3>
                <Image src={props.valueOutIcon} alt="Image 2" width={40} height={40}/>
                <h3 className="ml-2 text-4xl font-semibold">{formatRounding(props.valueOut)}</h3>
            </div>
            <span className="mt-2 text-xl font-semibold text-gray-500">{props.unit}</span>
        </div>
    )
}