import { MAP_COLOR_VARIANT_TO_BG } from "@/app/core/utils/mapVariants";
import { TailwindColor } from "@/app/core/utils/tailwindBaseColors";


interface BlurProps {
    color: TailwindColor,
    position: "bottom" | "top";
}

export default function Blur(props: BlurProps) {


    const classNames = [
        'fixed',
        'z-0',
        'h-[134px]',
        'w-[134px]',
        'lg:w-[300px]',
        'lg:h-[300px]',
        'rounded-full',
        MAP_COLOR_VARIANT_TO_BG[props.color],
        'blur-[150px]',
        'md:blur-[350px]',
        'opacity-1',
        props.position === 'top' ? 'left-0 top-0' : '',
        props.position === 'bottom' ? 'right-0 bottom-0' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (<div className={classNames}></div>)
}