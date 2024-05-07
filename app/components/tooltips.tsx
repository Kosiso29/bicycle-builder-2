import { Star, StarHalf, StarOutline, SquareOutlined } from "@mui/icons-material";

export default function Tooltips({ tooltips, canvasDrawImageProps }: { tooltips: any, canvasDrawImageProps: any }) {
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

    return (
        <div className="bg-gray-100 rounded-t-lg border border-black p-3 pb-5">
            <div className="flex justify-between">
                <div className="max-w-[65%]">
                    <p>{canvasDrawImageProps.frameSet.model || "Key metrics about the selection"} -</p>
                    <p className="whitespace-pre-wrap">{tooltips.key_metrics}</p>
                </div>
                {/* <div>
                    <p>Gearing @ 90rpm​</p>
                    <p>Max Speed – 53-11 = xyz​</p>
                    <p>Min Speed  - 39-34 = abc</p>
                </div> */}
                <div className="text-right">
                    <p>Aerodynamics - {renderStars(tooltips.aerodynamics)}</p>
                    <p>Weight - {renderStars(tooltips.weight)}</p>
                    <p>Comfort -  {renderStars(tooltips.comfort)}​</p>
                    <p>Stiffness-to-Weight -  {renderStars(tooltips.stiffness)}</p>
                    <p>Overall -  {renderStars(tooltips.overall)}</p>
                </div>
            </div>
            <div className="flex justify-between mt-3">
                <p>Build the best lightweight/aero/all-rounder​</p>
                <div className="flex">
                    <p>Portfolio –</p>
                    <SquareOutlined />
                    <SquareOutlined />
                    <SquareOutlined />
                    <SquareOutlined />
                </div>
            </div>
        </div>
    )
}
