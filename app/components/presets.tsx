import { Button } from "@mui/material";
import Loading from "@/app/components/loading";
import { useState } from "react";
import { positionCanvasImages } from "../utils/position-canvas-images";

export default function Presets({ parentProps, setFrameSetDimensions, presets, modelsPresets }: { parentProps: any, setFrameSetDimensions: any, presets: any, modelsPresets: any }) {
    const { models, setCanvasDrawImageProps, setRerender, frameSetDimensions, canvasDrawImageProps, setCanvasSelectionLevelState, setStemDimensions, setSelectionPresetProps, setSelectionLevel, setShowSummary, stemDimensions, setTooltips } = parentProps;
    const [loading, setLoading] = useState(0.5);
    const [multipleImages, setMultipleImages] = useState([]);
    
    const populateMultipleImages = (filteredPresets: any) => {
        setMultipleImages([]);
        const uniqueImagePresets: any = [];
        const multipleImagePresets: any = [];
        
        filteredPresets.forEach((filteredPreset: any, filteredPresetIndex: number) => {
          const duplicateIndex = filteredPresets.findIndex((item: any, index: number) => item.category === filteredPreset.category && item.brand === filteredPreset.brand && item.model === filteredPreset.model && index !== filteredPresetIndex);
            if (duplicateIndex === -1) {
                uniqueImagePresets.push(filteredPreset);
            } else {
                multipleImagePresets.push(filteredPreset);
            }
        });

        return { uniqueImagePresets, multipleImagePresets }
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
        let loadedCountUnique = 0, loadedCountMultiple = 0, finalUniqueCount = false, finalMultipleCount = false, newFrameSetDimensions = frameSetDimensions;
        const { uniqueImagePresets, multipleImagePresets } = populateMultipleImages(filteredPresets);

        uniqueImagePresets.sort((a: any) => (a.category === "Frame Set" ? -1 : 1)).forEach((item: any) => {
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;
                const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
                const height = image?.naturalHeight * (width / image?.naturalWidth);

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
                    [canvasProp]: { ...prevState[canvasProp], image, image2: canvasProp === 'tire' ? image : undefined, width, height, brand, model, price, y: canvasProp === 'saddle' ? newFrameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel|groupSet_shifter/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions, stemDimensions)

                loadedCountUnique++;

                setSelectionPresetProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { brand, model }
                }));
                if (loadedCountUnique === uniqueImagePresets.length) {
                    if (finalMultipleCount) {
                        setRerender((prevState: any) => !prevState);
                        setLoading(0.5);
                        setCanvasSelectionLevelState(6);
                        setShowSummary(true);
                        setSelectionLevel(7);
                    }
                    finalUniqueCount = true;
                }
            };

        })

        multipleImagePresets.forEach((item: any) => {
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;
                const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
                const height = image?.naturalHeight * (width / image?.naturalWidth);
    
                setMultipleImages((prevState: any) => {
                    prevState.push({ image, globalCompositeOperation: item.globalCompositeOperation, canvasLayerLevel: item.canvasLayerLevel });
                    return prevState;
                })

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions, stemDimensions)

                loadedCountMultiple++;

                if (loadedCountMultiple === multipleImagePresets.length) {
                    setCanvasDrawImageProps((prevState: any) => ({
                        ...prevState,
                        [canvasProp]: { ...prevState[canvasProp], image, image2: canvasProp === 'tire' ? image : undefined, multipleImages, width, height, brand, model, price, y: canvasProp === 'saddle' ? newFrameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel|groupSet_shifter/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                    }));

                    setSelectionPresetProps((prevState: any) => ({
                        ...prevState,
                        [canvasProp]: { brand, model }
                    }));
                    if (finalUniqueCount) {
                        setRerender((prevState: any) => !prevState);
                        setLoading(0.5);
                        setCanvasSelectionLevelState(6);
                        setShowSummary(true);
                        setSelectionLevel(7);
                    }
                    finalMultipleCount = true;
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
