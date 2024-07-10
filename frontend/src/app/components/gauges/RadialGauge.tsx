import { formatRounding } from "@/app/core/utils/formatting";

interface RadialGaugeProps {
    radius: number;
    value: number;
    maxValue: number;
    unit: string;
    gaugeBackground: string;
    gaugeHighlight: string;
    fontColor: string;
}

export default function RadialGauge(props: RadialGaugeProps) {

    const calcStrokeWidth = (radius: number) => {
        return radius * 0.15;
    };

    const calcInnerRadius = (radius: number, strokeWidth: number) => {
        return radius - strokeWidth / 2;
    };

    const calcFontSize = (radius: number) => {
        return radius / 2;
    };

    // Function to calculate stroke dash array based on value and maxValue
    const calcDashArray = (value: number, maxValue: number, radius: number) => {
        const circumference = 2 * Math.PI * calcInnerRadius(radius, calcStrokeWidth(radius));
        const result = `${(value / maxValue) * circumference} ${circumference}`;

        return String(result);
    };

    // Function to calculate stroke dash offset to start the gauge fill from the correct position
    const calcDashOffset = (value: number, maxValue: number, radius: number) => {
        const circumference =
            2 * Math.PI * calcInnerRadius(radius, calcStrokeWidth(radius));
        return circumference * (1 - value / maxValue);
    };

    return (
        <svg height={props.radius * 2} width={props.radius * 2}>
            {/* Linear Gradiant for showing gauge fill  */}
            <defs>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={props.gaugeHighlight}></stop>
                    <stop offset="100%" stopColor={props.gaugeHighlight}></stop>
                </linearGradient>
            </defs>

            {/* <!-- Radial Gauge Base --> */}
            <circle
                className="gauge-base"
                cx={props.radius}
                cy={props.radius}
                fill="transparent"
                r={calcInnerRadius(props.radius, calcStrokeWidth(props.radius))}
                stroke={props.gaugeBackground}
                strokeWidth={calcStrokeWidth(props.radius)}></circle>

            {/* <!-- Gauge Fill --> */}
            <circle
                className="gauge-fill"
                cx={props.radius}
                cy={props.radius}
                fill="transparent"
                r={calcInnerRadius(props.radius, calcStrokeWidth(props.radius))}
                stroke={props.gaugeHighlight}
                strokeWidth={calcStrokeWidth(props.radius)}
                strokeDasharray={calcDashArray(props.value, props.maxValue, props.radius)}
                strokeLinecap="round"
                strokeDashoffset={calcDashOffset(props.value, 0, props.radius)}
                style={{
                    transition: "0.3s",
                }}
            >
            </circle>
            {/* <!-- Value notation --> */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill={props.fontColor}
                fontSize={calcFontSize(props.radius)}
                fontWeight="bold"
                dy=".3em"
            >{formatRounding(props.value) ?? 0}
            </text>
            {/* <!-- Unit notation --> */}
            <text
                x="50%"
                y="70%"
                textAnchor="middle"
                fill={props.gaugeHighlight}
                fontSize={calcFontSize(props.radius) / 1.5}
                fontWeight="medium"
                dy=".3em"
            >{props.unit}
            </text>
        </svg>
    )
}