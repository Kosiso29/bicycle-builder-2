import { Button } from "@mui/material";
import Loading from "@/app/components/loading";
import { useState } from "react";
import { positionCanvasImages } from "../utils/position-canvas-images";

export default function Presets({ parentProps, setFrameSetDimensions, presets, modelsPresets }: { parentProps: any, setFrameSetDimensions: any, presets: any, modelsPresets: any }) {
    const { models, setCanvasDrawImageProps, setRerender, frameSetDimensions, canvasDrawImageProps, setCanvasSelectionLevelState, setStemDimensions, setSelectionPresetProps, setSelectionLevel, setShowSummary, stemDimensions, setTooltips } = parentProps;
    const [loading, setLoading] = useState(0.5);

    const getCanvasSelectionLevelState = (filteredPresets: any) => {
        const mappedFilteredPresets = filteredPresets.map((item: any) => item.category);
        if (mappedFilteredPresets.includes("Tyre")) {
            setCanvasSelectionLevelState(6);
        } else if (mappedFilteredPresets.includes("Saddle")) {
            setCanvasSelectionLevelState(5);
        } else if (mappedFilteredPresets.includes("Stem") || mappedFilteredPresets.includes("Handle Bar")) {
            setCanvasSelectionLevelState(4);
        } else if (mappedFilteredPresets.includes("Front Wheel Set") || mappedFilteredPresets.includes("Back Wheel Set")) {
            setCanvasSelectionLevelState(3);
        }
    }

    const getFilteredPresets = (preset: string) => { 
        const filteredModelIds = modelsPresets.filter((item: any) => item.preset_name === preset).map((item: any) => item.model_id);
        return models.filter((item: any) => filteredModelIds.includes(item?.id));
    }

    const checkForFrameSetInPreset = (preset: string) => {
        const filteredPresets = getFilteredPresets(preset);

        for (const item of filteredPresets) {
            const canvasProp = item.category.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");
            if (canvasProp === "frameSet") {
                return true;
            }
        }

        return false;
    }

    const getPresetComponents = (preset: string) => {
        const filteredPresets = getFilteredPresets(preset);
        let loadedCount = 0;

        filteredPresets.forEach((item: any) => {
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const canvasProp = item.category.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;
                const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
                const height = image?.naturalHeight * (width / image?.naturalWidth);
                let newFrameSetDimensions = null;

                if (canvasProp === 'frameSet') {
                    const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                        hasStem, hasHandleBar, key_metrics, aerodynamics, weight, comfort, stiffness, overall } = item;
                    const offsets = {
                        stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
                    };

                    newFrameSetDimensions = { width, height, actualWidth, ...offsets, hasStem, hasHandleBar }
                    
                    setFrameSetDimensions(newFrameSetDimensions);
                    setTooltips({ key_metrics, aerodynamics, weight, comfort, stiffness, overall });
                }

                if (canvasProp === 'stem') {
                    const { hasHandleBar } = item;
                    setStemDimensions({ hasHandleBar })
                }

                setCanvasDrawImageProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { ...prevState[canvasProp], image, image2: canvasProp === 'tire' ? image : undefined, width, height, brand, model, price, y: canvasProp === 'saddle' ? frameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions || frameSetDimensions, stemDimensions)

                loadedCount++;

                setSelectionPresetProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { brand, model }
                }));
                if (loadedCount === filteredPresets.length) {
                    setRerender((prevState: any) => !prevState);
                    setLoading(0.5);
                    setCanvasSelectionLevelState(6);
                    setShowSummary(true);
                    setSelectionLevel(7);
                }
            };

        })

        if (filteredPresets.length === 0) {
            setLoading(0.5);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl text-center">Builds</h1>
            {
                Object.values(presets).filter((item: any) => item !== "None").map((item: any, index: number) => (
                    <div key={item}>
                        <p className="mb-2 text-center">{item}</p>
                        <div className="flex justify-center items-center">
                            <Button size="small" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} disabled={(!canvasDrawImageProps.frameSet.image || !canvasDrawImageProps.frameSet.brand) && !checkForFrameSetInPreset(item)} variant="contained" onClick={() => { setLoading(index); getPresetComponents(item) }}>Apply Build</Button>
                        </div>
                        {loading === index ? <div className='self-center mt-2'><Loading small /></div> : null}
                    </div>
                ))
            }
        </div>
    )
}
