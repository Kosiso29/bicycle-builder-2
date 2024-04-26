import { Button } from "@mui/material";

export default function Presets({ parentProps }: { parentProps: any }) {
    const { models, setCanvasDrawImageProps, setRerender, frameSetDimensions } = parentProps;

    const getPresetComponents = (preset: string) => {
        const filteredPresets = models.filter((item: any) => item?.[preset]);
        let loadedCount = 0;

        filteredPresets.forEach((item: any) => {
            const image = new Image();

            image.src = item.src;

            const canvasProp = item.category.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;
                const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
                const height = image?.naturalHeight * (width / image?.naturalWidth);

                setCanvasDrawImageProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { ...prevState[canvasProp], image, image2: canvasProp === 'tire' ? image : undefined, width, height, brand, model, price, globalCompositeOperation: /tire|wheel/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                loadedCount++;

                if (loadedCount === filteredPresets.length) {
                    setRerender((prevState: any) => !prevState);
                }
            };

        })
    }

    const presets = () => {
        return [
            { title: "Aerodynamics", buttonText: "build preset", onClick: () => { getPresetComponents("best_aerodynamics"); } },
            { title: "Lightweight", buttonText: "build preset", onClick: () => { getPresetComponents("best_lightweight"); } },
        ]
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">Presets</h1>
            {
                presets()?.map((item: any) => (
                    <div key={item.title}>
                        <h2 className="mb-2">{item.title}</h2>
                        <Button size="small" variant="contained" onClick={item.onClick}>{item.buttonText}</Button>
                    </div>
                ))
            }
        </div>
    )
}
