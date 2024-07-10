import Image from 'next/image'


interface MeterGaugeProps {
    icon: string;
    value: number;
    minValue: number;
    maxValue: number;
    unit: string;
    gaugeBackground: string;
    gaugeHighlight: string;
    fontColor: string;
    height: number;
    width: number;
}

export default function MeterGauge(props: MeterGaugeProps) {

    const meterStyle = {
        stroke: props.gaugeBackground,
        strokeWidth: "12",

    };

    const meterValueStyle = {
        stroke: props.gaugeHighlight,
        strokeWidth: "12",
    }

    const getWholeValue = (value: number) => {
        return Math.floor(value)
    }

    const getSubValue = (value: number) => {
        return value.toString().split('.')[1] ?? "00";
    }

    const calcRelativeLength = (value: number, minValue: number, maxValue: number, width: number) => {
        // Calculate the relative length based on value and min/max range
        const relativeValue = Math.max(minValue, Math.min(value, maxValue));
        return ((relativeValue - minValue) / (maxValue - minValue)) * width;
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    <div className="flex">
                        <Image width={40} height={40} src={props.icon} alt="Image description" />
                    </div>
                    <div className="flex">
                        <h1 className="text-6xl font-semibold">{getWholeValue(props.value)}</h1>
                    </div>
                    <div className="flex flex-col space-y-1 items-start">
                        <h3 className='text-2xl font-semibold m-0 p-0 leading-none'>{props.unit}</h3>
                        <h3 className='text-2xl font-semibold m-0 p-0 mt-1 leading-none text-gray-500'>{getSubValue(props.value)}</h3>
                    </div>
                </div>
                <div className="flex">
                    <svg height={props.height} width={props.width}>
                        <line x1="10" y1="10" x2={props.width - 8} y2="10" strokeLinecap="round" strokeWidth="10" style={meterStyle} />
                        <line x1="10" y1="10" x2={calcRelativeLength(props.value, props.minValue, props.maxValue, props.width)} y2="10" strokeLinecap="round" strokeWidth="10" style={meterValueStyle} />
                    </svg>
                </div>
            </div>
        </div>
    )
}