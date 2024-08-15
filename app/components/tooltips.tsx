import { Star, StarHalf, StarOutline, SquareOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export default function Tooltips({ tooltips, canvasDrawImageProps }: { tooltips: any, canvasDrawImageProps: any }) {
    const [openFullTooltips, setOpenFullToolTips] = useState(false);
    const tooltipsRef = useRef<HTMLDivElement>(null);

    const renderStars = (tooltip: number | string) => {
        return tooltip === "---" ? " " + tooltip : [1, 2, 3, 4, 5].map(number => {
            if (number <= parseFloat(tooltip.toString())) {
                return <Star color="primary" key={number} />;
            }
            if (number === Math.ceil(parseFloat(tooltip.toString())) && parseFloat(tooltip.toString()) % 1 !== 0) {
                return <StarHalf color="primary" key={number} />;
            }
            return <StarOutline color="primary" key={number} />;
        })
    }

    const handleArrowClick = () => {
        setOpenFullToolTips(prevState => !prevState);
    }

    useEffect(() => {
        if (openFullTooltips) {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [openFullTooltips])

    return (
        <div ref={tooltipsRef} className="bg-gray-100 border border-black p-3 pb-5 flex-grow">
            <div className="flex justify-between relative">
                <div className="max-w-[65%]">
                    <p>{tooltips.model && tooltips.model + " -"}</p>
                    <p className="whitespace-pre-wrap">{openFullTooltips ? tooltips.key_metrics || "---" : tooltips.key_metrics?.split("\n")?.[0] || "---"}</p>
                </div>
                {/* <div>
                    <p>Gearing @ 90rpm​</p>
                    <p>Max Speed – 53-11 = xyz​</p>
                    <p>Min Speed  - 39-34 = abc</p>
                </div> */}
                {openFullTooltips ? <ArrowUpwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" /> :
                    <ArrowDownwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" />}
                <div className="text-right [&>p]:h-6">
                    <p>Aerodynamics - {tooltips.aerodynamics ? renderStars(tooltips.aerodynamics) : "---"}</p>
                    <p>Weight - {tooltips.weight ? renderStars(tooltips.weight) : "---"}</p>
                    {/* <p>Comfort -  {tooltips.comfort ? renderStars(tooltips.comfort) : "---"}​</p>
                    <p>Stiffness-to-Weight -  {tooltips.stiffness ? renderStars(tooltips.stiffness) : "---"}</p> */}
                    <p>Overall -  {tooltips.overall ? renderStars(tooltips.overall) : "---"}</p>
                </div>
            </div>
        </div>
    )
}
