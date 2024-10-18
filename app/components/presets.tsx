/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import Loading from "@/app/components/loading";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { positionCanvasImages } from "../utils/position-canvas-images";
import { updateTooltips } from "../utils/update-tooltips";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

export default function Presets({ parentProps, setFrameSetDimensions, builds, modelsPresets }: { parentProps: any, setFrameSetDimensions: any, builds: any, modelsPresets: any }) {
    const { models, setCanvasDrawImageProps, setRerender, frameSetDimensions, canvasDrawImageProps, setCanvasSelectionLevelState, setStemDimensions, setSelectionPresetProps, setSelectionLevel, setShowSummary, stemDimensions, setTooltips, initialCanvasDrawImageProps, selectedFeatureBuild, colorsPresets, updateSelectionLevel } = parentProps;
    const [loading, setLoading] = useState(0.5);
    const [multipleImages, setMultipleImages] = useState([]);
    const [uniqueImagePresetsProps, setUniqueImagePresetsProps]: any = useState(null);
    const dispatch = useDispatch();

    const frameBuildIds = modelsPresets.filter((modelPreset: any) => modelPreset.model_id === canvasDrawImageProps.frameSet.id).map((modelPreset: any) => modelPreset.preset_id);
    
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

    const getFilteredPresets = (presetId: string) => { 
        const filteredModelIds = modelsPresets.filter((item: any) => item.preset_id === presetId).map((item: any) => item.model_id);
        return models.filter((item: any) => filteredModelIds.includes(item?.id));
    }

    const completePresetLoading = () => {
        setTooltips((prevState: any) => ({ ...prevState, model: "", key_metrics: "---" }))
        setRerender((prevState: any) => !prevState);
        setLoading(0.5);
        setCanvasSelectionLevelState(6);
        dispatch(builderActions.updateSelectedFeatureBuild(""));
    }

    const checkForFrameSetInPreset = (presetId: string) => {
        const filteredPresets = getFilteredPresets(presetId);

        for (const item of filteredPresets) {
            const canvasProp = item.category.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");
            if (canvasProp === "frameSet") {
                return true;
            }
        }

        return false;
    }

    const getPresetComponents = (presetId: string) => {
        updateSelectionLevel(1); // set selection level away from stem/handleBar selections so that linkedStem/linkedHandleBar would be handled properly
        const filteredPresets = getFilteredPresets(presetId);
        let loadedCountUnique = 0, newFrameSetDimensions = frameSetDimensions;
        const { uniqueImagePresets, multipleImagePresets } = populateMultipleImages(filteredPresets);
        setUniqueImagePresetsProps(null);

        uniqueImagePresets.sort((a: any) => (a.category === "Frame Set" ? -1 : 1)).forEach((item: any) => {
            let presetColorValue = "", presetColorPrice = "", presetColorSrc = "";
            const image = new Image();

            image.src = item.src;
            image.crossOrigin = "anonymous";

            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

            if (canvasProp === 'frameSet') {
                const { actualWidth } = item;
                newFrameSetDimensions.actualWidth = actualWidth;
            }

            const modelColorArray: any = colorsPresets.filter((colorPreset: any) => colorPreset.preset_id === presetId && colorPreset.color_model_id === item.id );
            
            if (modelColorArray.length > 0) {
                presetColorValue = modelColorArray[0]?.color_value;
                presetColorPrice = modelColorArray[0]?.color_price;
                presetColorSrc = modelColorArray[0]?.color_image_url;
                image.src = presetColorSrc;
            }

            image.onload = function () {
                const { actualWidth, brand, model, price } = item;

                const previewImageWidth = image?.width;
                const previewImageHeight = image?.height;

                const width = (newFrameSetDimensions?.width * actualWidth) / newFrameSetDimensions?.actualWidth;
                const height = previewImageHeight * (width / previewImageWidth);
                let offsets = {}, linkedModels = {}, frameSetId: any = null;

                if (canvasProp === 'frameSet') {
                    const { id, linked_stem, linked_handle_bar, stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                        hasStem, hasHandleBar } = item;
                    offsets = {
                        stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                        groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
                    };
                    linkedModels = { linkedStem: linked_stem, linkedHandleBar: linked_handle_bar }

                    newFrameSetDimensions = { width, height, actualWidth, ...offsets, hasStem, hasHandleBar }

                    frameSetId = id;
                    
                    setFrameSetDimensions(newFrameSetDimensions);

                    if (hasStem) {
                        setCanvasDrawImageProps((prevState: any) => ({
                            ...prevState,
                            stem: { ...initialCanvasDrawImageProps.stem, x: prevState.stem?.x, y: prevState.stem?.y, x2: prevState.stem?.x2, y2: prevState.stem?.y2 }
                        }))
                    }
                }

                if (canvasProp === 'stem') {
                    const { hasHandleBar } = item;
                    setStemDimensions({ hasHandleBar })
                }

                setCanvasDrawImageProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { ...prevState[canvasProp], ...offsets, ...linkedModels, id: frameSetId, image, image2: canvasProp === 'tire' ? image : undefined, width, height, actualWidth, previewImageWidth, previewImageHeight, width2: width, height2: height, brand, model, price, y: canvasProp === 'saddle' ? newFrameSetDimensions.saddleY - height : prevState[canvasProp].y, globalCompositeOperation: /tire|wheel|groupSet_shifter/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                updateTooltips(item, canvasProp, setTooltips);

                positionCanvasImages(item, canvasProp, canvasDrawImageProps, setCanvasDrawImageProps, newFrameSetDimensions, stemDimensions)

                loadedCountUnique++;

                setSelectionPresetProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { brand, model, presetColorValue, presetColorPrice, presetColorSrc }
                }));
                if (loadedCountUnique === uniqueImagePresets.length) {
                    if (multipleImagePresets.length > 0) {
                        setUniqueImagePresetsProps({ multipleImagePresets, newFrameSetDimensions })
                    } else {
                        completePresetLoading();
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
                    completePresetLoading();
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

    useEffect(() => {
        if (selectedFeatureBuild && Object.keys(initialCanvasDrawImageProps.frameSet).length > 0) {
            getPresetComponents(selectedFeatureBuild);
        }
    }, [selectedFeatureBuild, initialCanvasDrawImageProps])

    return (
        <div className="flex flex-col w-28 flex-grow max-h-full overflow-hidden gap-2">
            <h1 className="font-bold text-2xl">Bike <br /> Ideas</h1>
            <div className="flex flex-col flex-grow w-[6.5rem] max-h-[80%] gap-5 overflow-y-auto pr-3 pt-3">
                {
                    canvasDrawImageProps.frameSet.id ? builds.filter((build: any) => build.name !== "None" && frameBuildIds.includes(build.id)).map((build: any, index: number) => (
                        <button key={build.id} className="group relative hover:bg-back-color focus-visible:outline-primary border border-back-color transition-all py-1" disabled={(!canvasDrawImageProps.frameSet.image || !canvasDrawImageProps.frameSet.brand) && !checkForFrameSetInPreset(build.name)} onClick={() => { setLoading(index); getPresetComponents(build.id) }}>
                            <div className="absolute -right-[10px] -top-[10px] w-[20px] h-[20px]">
                                <NextImage src="/Yellow-Star.png" width={20} height={20} alt='' />
                            </div>
                            {/* <p className="mb-2 text-center text-sm">{build.name}</p> */}
                            <div className="flex justify-center text-transparent w-full h-full py-1 overflow-hidden">
                                <NextImage className="group-hover:scale-[1.6] transition-all" src={build.image_url} style={{ width: "auto", maxWidth: "100%", height: "4rem" }} width={100} height={100} alt='' />
                            </div>
                            {loading === index ? <div className='absolute inset-0 flex justify-center items-center bg-[#00000040]'><Loading small /></div> : null}
                        </button>
                    )) : <p>Select a frame to see bike ideas *</p>
                }
            </div>
        </div>
    )
}
