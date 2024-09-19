/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import Loading from "@/app/components/loading";
import { useEffect, useState } from "react";
import { positionCanvasImages } from "../utils/position-canvas-images";
import { updateTooltips } from "../utils/update-tooltips";

export default function Presets({ parentProps, setFrameSetDimensions, presets, modelsPresets }: { parentProps: any, setFrameSetDimensions: any, presets: any, modelsPresets: any }) {
    const { models, setCanvasDrawImageProps, setRerender, frameSetDimensions, canvasDrawImageProps, setCanvasSelectionLevelState, setStemDimensions, setSelectionPresetProps, setSelectionLevel, setShowSummary, stemDimensions, setTooltips } = parentProps;
    const [loading, setLoading] = useState(0.5);
    const [multipleImages, setMultipleImages] = useState([]);
    const [uniqueImagePresetsProps, setUniqueImagePresetsProps]: any = useState(null);
    
    const populateMultipleImages = (filteredPresets: any) => {
        setMultipleImages([]);
        const uniqueImagePresets: any = [];
        const multipleImagePresets: any = [];
        
        filteredPresets.forEach((filteredPreset: any) => {
            if (filteredPreset.category === "Back Wheel Set") {
                return;
            }
            if (filteredPreset.category === "Frame Set") {
                if (filteredPreset.linked_stem) {
                    const linkedStem = models.filter((model: any) => model.id === filteredPreset.linked_stem)[0]
                    setSelectionPresetProps((prevState: any) => ({
                        ...prevState,
                        stem: { brand: linkedStem.brand, model: linkedStem.model }
                    }));
                }
                if (filteredPreset.linked_handle_bar) {
                    const linkedHandleBar = models.filter((model: any) => model.id === filteredPreset.linked_handle_bar)[0]
                    setSelectionPresetProps((prevState: any) => ({
                        ...prevState,
                        handleBar: { brand: linkedHandleBar.brand, model: linkedHandleBar.model }
                    }));
                }
            }
            if (filteredPreset.category === "Front Wheel Set") {
                const backWheelSet = models.filter((item: any) => item.model === filteredPreset.model && item.brand === filteredPreset.brand && item.category === 'Back Wheel Set')[0]
                uniqueImagePresets.push(backWheelSet);
            }
            const filteredDuplicates = models.filter((item: any) => {
                return item.category === filteredPreset.category && item.brand === filteredPreset.brand && item.model === filteredPreset.model && !item.is_primary
            });
            if (filteredPreset.category === 'Group Set - Drivetrain') {
                const filteredGroupSetShifter = models.filter((item: any) => {
                    return item.category === 'Group Set - Shifter' && item.brand === filteredPreset.brand && item.model === filteredPreset.model
                });
                uniqueImagePresets.push(filteredGroupSetShifter[0]);
            }
            if (filteredDuplicates.length === 0) {
                uniqueImagePresets.push(filteredPreset);
            } else {
                multipleImagePresets.push(filteredPreset);
                filteredDuplicates.forEach((duplicate: any) => multipleImagePresets.push(duplicate));
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
        setSelectionLevel(1); // set selection level away from stem/handleBar selections so that linkedStem/linkedHandleBar would be handled properly
        const filteredPresets = getFilteredPresets(preset);
        let loadedCountUnique = 0, newFrameSetDimensions = frameSetDimensions;
        const { uniqueImagePresets, multipleImagePresets } = populateMultipleImages(filteredPresets);
        setUniqueImagePresetsProps(null);

        uniqueImagePresets.sort((a: any) => (a.category === "Frame Set" ? -1 : 1)).forEach((item: any) => {
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            if (canvasProp === 'frameSet') {
                const { actualWidth } = item;
                newFrameSetDimensions.actualWidth = actualWidth;
            }

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;

                const previewImageWidth = image?.width;
                const previewImageHeight = image?.height;

                const width = (newFrameSetDimensions?.width * actualWidth) / newFrameSetDimensions?.actualWidth;
                const height = previewImageHeight * (width / previewImageWidth);
                let offsets = {}, linkedModels = {};

                if (canvasProp === 'frameSet') {
                    const { linked_stem, linked_handle_bar, stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                        hasStem, hasHandleBar } = item;
                    offsets = {
                        stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
                    };
                    linkedModels = { linkedStem: linked_stem, linkedHandleBar: linked_handle_bar }

                    newFrameSetDimensions = { width, height, actualWidth, ...offsets, hasStem, hasHandleBar }
                    
                    setFrameSetDimensions(newFrameSetDimensions);
                }

                if (canvasProp === 'stem') {
                    const { hasHandleBar } = item;
                    setStemDimensions({ hasHandleBar })
                }

                setCanvasDrawImageProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { ...prevState[canvasProp], ...offsets, ...linkedModels, image, image2: canvasProp === 'tire' ? image : undefined, width, height, actualWidth, previewImageWidth, previewImageHeight, width2: width, height2: height, brand, model, price, y: canvasProp === 'saddle' ? newFrameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel|groupSet_shifter/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                updateTooltips(item, canvasProp, setTooltips);

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions, stemDimensions)

                loadedCountUnique++;

                setSelectionPresetProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { brand, model }
                }));
                if (loadedCountUnique === uniqueImagePresets.length) {
                    if (multipleImagePresets.length > 0) {
                        setUniqueImagePresetsProps({ multipleImagePresets, newFrameSetDimensions })
                    } else {
                        setTooltips((prevState: any) => ({ ...prevState, model: "", key_metrics: "---" }))
                        setRerender((prevState: any) => !prevState);
                        setLoading(0.5);
                        setCanvasSelectionLevelState(6);
                        setShowSummary(true);
                        setSelectionLevel(7);
                    }
                }
            };

        })

        if (filteredPresets.length === 0) {
            setLoading(0.5);
        }
    }

    const renderMultipleImagePresets = (multipleImagePresets: any, newFrameSetDimensions: any) => {
        let loadedCountMultiple = 0;

        multipleImagePresets.forEach((item: any) => {
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;

                const previewImageWidth = image?.width;
                const previewImageHeight = image?.height;

                const width = (newFrameSetDimensions?.width * actualWidth) / newFrameSetDimensions?.actualWidth;
                const height = previewImageHeight * (width / previewImageWidth);
    
                setMultipleImages((prevState: any) => {
                    prevState.push({ image, globalCompositeOperation: item.globalCompositeOperation, canvasLayerLevel: item.canvasLayerLevel });
                    return prevState;
                })

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions, stemDimensions)

                loadedCountMultiple++;

                if (loadedCountMultiple === multipleImagePresets.length) {
                    setCanvasDrawImageProps((prevState: any) => ({
                        ...prevState,
                        [canvasProp]: { ...prevState[canvasProp], image, image2: canvasProp === 'tire' ? image : undefined, multipleImages, width, height, actualWidth, previewImageWidth, previewImageHeight, brand, model, price, y: canvasProp === 'saddle' ? newFrameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel|groupSet_shifter/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                    }));

                    setSelectionPresetProps((prevState: any) => ({
                        ...prevState,
                        [canvasProp]: { brand, model }
                    }));
                    setTooltips((prevState: any) => ({ ...prevState, model: "", key_metrics: "---" }))
                    setRerender((prevState: any) => !prevState);
                    setLoading(0.5);
                    setCanvasSelectionLevelState(6);
                    setShowSummary(true);
                    setSelectionLevel(7);
                }
            };

        })
    }
    
    useEffect(() => {
        if (uniqueImagePresetsProps) {
            const { multipleImagePresets, newFrameSetDimensions } = uniqueImagePresetsProps;
            renderMultipleImagePresets(multipleImagePresets, newFrameSetDimensions);
        }
    }, [uniqueImagePresetsProps])

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
