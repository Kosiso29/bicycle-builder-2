/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField } from "@mui/material";
import { CloseOutlined, OpenInNew } from "@mui/icons-material";
import Loading from "@/app/components/loading";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import { positionCanvasImages } from "@/app/utils/position-canvas-images";
import { updateTooltips } from "@/app/utils/update-tooltips";
import SizeSelector from "@/app/ui/size-selector";
import FeatureSelector from "@/app/ui/feature-selector";
import ColorSelector from "@/app/ui/color-selector";
import SizeChart from "./size_chart";
import ModelButton from "@/app/ui/model-button";
import KeyMetrics from "@/app/components/key-metrics";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth, identifier, displayLabel, handleReset, updateFrameSetData, handleBarShow }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels, selectionLevelProps, selectionPresetProps, initialCanvasDrawImageProps, selectionLevel, canvasDrawImageProps, frameSetDimensions, 
        stemDimensions, setTooltips, colors, accessoryModels, setAddonAccessories, setLinkedComopnentDimensions, setCanvasLoading, setShowSizeChartModal, setSizeChartUrl } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
    const [initialModelData, setInitialModelData] = useState(null);
    const [modelData, setModelData] = useState(null);
    const [allModels, setAllModels] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);
    const [multipleImagesLoaded, setMultipleImagesLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    const imageRef = useRef(null);
    const imageRef2 = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [price, setPrice] = useState(0.00);
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const [tyreTube, setTyreTube] = useState({});
    const [disableSelections, setDisableSelections] = useState(false);
    const [modelInfo, setModelInfo] = useState(null);

    const selectedFeatureBuild = useSelector((state: IRootState) => state.builderReducer.selectedFeatureBuild);
    const region = useSelector((state: IRootState) => state.regionReducer.region);
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrandsData.filter(itemBrand => itemBrand.brand === e.target.value && itemBrand.is_primary);
        if (identifier === 'stem') {
            populateStemSteererModel(models);
        } else {
            setAllModels(models);
        }
    }

    const handleModelChange = (index, modelData, modelData2) => {
        setModel(modelData?.model);
        setPrice(modelData?.price);
        setModelData(modelData);
        setMultipleImages([]);

        const multipleModels = databaseModels.filter(item => item.category === label && item.brand === brand).filter(item => {
            return item.category === label && item.model === modelData?.model && item.brand === brand
        })
        if (multipleModels.length > 1) {
            let loadedCount = 0;
            multipleModels.forEach(item => {
                const image = new Image();

                image.src = item.src;
                image.crossOrigin = "anonymous";

                setMultipleImages(prevState => {
                    prevState.push({ image, globalCompositeOperation: item.globalCompositeOperation, canvasLayerLevel: item.canvasLayerLevel });
                    return prevState;
                })

                image.onload = function () {
                    loadedCount++
                    if (loadedCount === multipleModels.length) {
                        setMultipleImagesLoaded(true);
                    }
                }

            })
        }
        setImageLoaded(false);
        const backWheetSet = databaseModels.filter(item => item.model === modelData.model && item.category === 'Back Wheel Set')[0];
        const groupSetShifter = databaseModels.filter(item => item.model === modelData.model && item.category === 'Group Set - Shifter')[0];
        loadImage2(/Wheel Set/i, modelData2 || backWheetSet);
        loadImage2(/Group Set/i, modelData2 || groupSetShifter);

        reloadImage(imageRef.current, modelData);

        if (setActualWidth) {
            setActualWidth(modelData?.actualWidth);
        }
        setSelectedIndex(index);
    }

    const resetCanvasComponents = (canvasProp) => {
        const setCanvasDrawImagePropsFromSelectionLevelProps = (prevState) => {
            selectionLevelProps.forEach(selectionLevelProp => {
                if (canvasProp) {
                    if (canvasProp === 'frontWheelSet') {
                        prevState[canvasProp] = { ...initialCanvasDrawImageProps[canvasProp], x: prevState[canvasProp]?.x, y: prevState[canvasProp]?.y, x2: prevState[canvasProp]?.x2, y2: prevState[canvasProp]?.y2 };
                        prevState['backWheelSet'] = { ...initialCanvasDrawImageProps['backWheelSet'], x: prevState['backWheelSet']?.x, y: prevState['backWheelSet']?.y, x2: prevState['backWheelSet']?.x2, y2: prevState['backWheelSet']?.y2 };
                    } else if (canvasProp === 'groupSet_drivetrain') {
                        prevState['groupSet_shifter'] = { ...initialCanvasDrawImageProps['groupSet_shifter'], x: prevState['groupSet_shifter']?.x, y: prevState['groupSet_shifter']?.y, x2: prevState['groupSet_shifter']?.x2, y2: prevState['groupSet_shifter']?.y2, stemShifterX: prevState['groupSet_shifter'].stemShifterX, stemShifterY: prevState['groupSet_shifter'].stemShifterY };
                        prevState[canvasProp] = { ...initialCanvasDrawImageProps[canvasProp], x: prevState[canvasProp]?.x, y: prevState[canvasProp]?.y, x2: prevState[canvasProp]?.x2, y2: prevState[canvasProp]?.y2 };
                    } else if (canvasProp === 'saddle') {
                        prevState[canvasProp] = { ...initialCanvasDrawImageProps[canvasProp], x: prevState[canvasProp]?.x, y: prevState.frameSet.saddleY - initialCanvasDrawImageProps[canvasProp]?.height };
                    } else {
                        prevState[canvasProp] = { ...initialCanvasDrawImageProps[canvasProp], x: prevState[canvasProp]?.x, y: prevState[canvasProp]?.y, x2: prevState[canvasProp]?.x2, y2: prevState[canvasProp]?.y2 };
                    }
                } else {
                    if (selectionLevelProp === identifier || (selectionLevelProp === "backWheelSet" && identifier === "frontWheelSet") || (selectionLevelProp === "groupSet_shifter" && identifier === "groupSet_drivetrain")) {
                        if (selectionLevelProp === 'groupSet_shifter') {
                            prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2, stemShifterX: prevState[selectionLevelProp].stemShifterX, stemShifterY: prevState[selectionLevelProp].stemShifterY };
                        } else if (identifier === 'saddle') {
                            prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState.frameSet.saddleY - initialCanvasDrawImageProps[selectionLevelProp]?.height };
                        } else {
                            prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                        }
                    }
                }
            })
            return { ...prevState };
        }

        setCanvasDrawImageProps(prevState => {
            return { ...setCanvasDrawImagePropsFromSelectionLevelProps(prevState) };
        });

        const newCanvasDrawImageProps = setCanvasDrawImagePropsFromSelectionLevelProps(canvasDrawImageProps);

        positionCanvasImages(newCanvasDrawImageProps[identifier], identifier, newCanvasDrawImageProps, setCanvasDrawImageProps, frameSetDimensions, stemDimensions);
    }

    const handleModelRemove = (index, modelData, stemSteererSize) => {
        setModel("");
        setModelData(null);
        setSelectedIndex(null);
        imageRef.current?.setAttribute("src", "/Cadex-Saddle.png");
        if (/Frame Set/i.test(label)) {
            setTooltips(prevState => ({ ...prevState, aerodynamics: getToolTipValue(prevState.aerodynamicsWheel, null, prevState.aerodynamics), weight: getToolTipValue(prevState.weightWheel, null, prevState.weight), overall: getToolTipValue(prevState.overallWheel, null, prevState.overall), aerodynamicsFrame: null, weightFrame: null, overallFrame: null }));
        }
        if (/Wheel Set/i.test(label)) {
            setTooltips(prevState => ({ ...prevState, aerodynamics: getToolTipValue(null, prevState.aerodynamicsFrame, prevState.aerodynamics), weight: getToolTipValue(null, prevState.weightFrame, prevState.weight), overall: getToolTipValue(null, prevState.overallFrame, prevState.overall), aerodynamicsWheel: null, weightWheel: null, overallWheel: null }));
        }
        if (/Wheel Set|Group Set/i.test(label)) {
            imageRef2.current?.setAttribute("src", "/Cadex-Saddle.png");
        };

        const joinedHyphenatedProp = modelData.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

        const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");

        resetCanvasComponents(canvasProp);

        if (selectionLevelProps.includes('frameSet') && !stemSteererSize) {
            updateFrameSetData(initialCanvasDrawImageProps.frameSet);
        }
        setRerender(prevState => !prevState);
    }

    const updateCanvasImage = ({ multipleImages, modelData }) => {
        const { key_metrics, aerodynamics, weight, comfort, stiffness, overall } = modelData;
        const imageProps = updateDrawImageProps({ brand, model, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall }, { allModels, multipleImages, modelData });

        setCanvasDrawImageProps(prevState => {
            Object.keys(imageProps).forEach(key => {
                prevState = {
                    ...prevState,
                    [key]: { ...prevState[key], ...imageProps[key] }
                }
            })
            return prevState;
        });

        positionCanvasImages(Object.values(imageProps)[0], identifier, canvasDrawImageProps, setCanvasDrawImageProps, frameSetDimensions, stemDimensions);

        setRerender(prevState => !prevState);
    }

    function getToolTipValue(wheelValue: number, frameValue: number, originalValue: number) {
        if (wheelValue && frameValue) return (wheelValue + frameValue) / 2;

        if (wheelValue) return wheelValue;

        if (frameValue) return frameValue;

        if (!wheelValue && !frameValue) return 0.0;

        return originalValue
    }

    function loadImage2(regex, modelData2) {
        if (regex.test(label)) {
            setImage2Loaded(false);
            reloadImage(imageRef2.current, modelData2);
        }
    }

    function reloadImage(imageElement, modelData) {
        if (imageElement?.getAttribute("src") === modelData?.src) {
            // Force a reload of the image if new image to be loaded is the same as the old one
            imageElement?.setAttribute("src", modelData?.src + '?random=' + Math.random());
        } else {
            imageElement?.setAttribute("src", modelData?.src);
        }
    }

    const checkSelectedIndex = (index) => selectedIndex === index && modelData?.brand === brand;

    const updateBrandsData = (brands) => {
        setAllBrandsData(brands);
        const uniqueBrands = [];
        brands.forEach(brandItem => {
            if (!uniqueBrands.includes(brandItem.brand)) {
                uniqueBrands.push(brandItem.brand);
            }
        });
        setUniqueBrands(uniqueBrands);
    }

    const resetSelection = () => {
        setBrand("");
        setAllModels([]);
        setModel("");
        setPrice(0.00);
        setModelData(null);
        setSelectedIndex(null);
        setDisableSelections(false);
    }

    function populateStemSteererModel(models) {
        const filteredStemModelsBySteererSize = models.filter(item => item.steerer_size && canvasDrawImageProps.frameSet.steerer_size ? parseFloat(item.steerer_size.match(/\d+(\.\d+)?/)[0]) >= parseFloat(canvasDrawImageProps.frameSet.steerer_size.match(/\d+(\.\d+)?/)[0]) : true);
        setAllModels(filteredStemModelsBySteererSize);
    }

    const populateStemSteererSizeData = (brandsData) => {
        const filteredStemBrandsBySteererSize = brandsData.filter(item => item.steerer_size && canvasDrawImageProps.frameSet.steerer_size ? parseFloat(item.steerer_size.match(/\d+(\.\d+)?/)[0]) >= parseFloat(canvasDrawImageProps.frameSet.steerer_size.match(/\d+(\.\d+)?/)[0]) : true);
        setAllBrandsData(filteredStemBrandsBySteererSize);
        updateBrandsData(filteredStemBrandsBySteererSize);
        populateStemSteererModel(allModels);
    }

    // Linked components are rendered such that they don't interfer with the canvasDrawImageProps data since they don't have images
    const getLinkedBrandData = (linkedModel) => {
        const brandsWithLinkedComponents = databaseModels.filter(item => item.category === label && item.is_primary);
        const identifiers = ["stem", "handleBar"];
        if (identifiers.includes(identifier)) {
            const linkedBrandData = brandsWithLinkedComponents.filter(item => {
                return item.id === canvasDrawImageProps.frameSet[linkedModel]
            })?.[0];
            if (linkedBrandData) {
                updateBrandsData(brandsWithLinkedComponents)
                setBrand(linkedBrandData.brand);
                const models = brandsWithLinkedComponents.filter(itemBrand => itemBrand.brand === linkedBrandData.brand);
                setAllModels(models);
                const selectedIndex = models.findIndex(item => item.id === canvasDrawImageProps.frameSet[linkedModel]);
                setModel(linkedBrandData.model);
                setPrice(linkedBrandData.price);
                setModelData(linkedBrandData);
                setSelectedIndex(selectedIndex);
                setDisableSelections(true);
                if (linkedBrandData.hasHandleBar && identifier === "stem") {
                    setLinkedComopnentDimensions({ hasHandleBar: true });
                }
            } else if (disableSelections) {
                resetSelection();
                if (identifier === "stem") {
                    setLinkedComopnentDimensions({ hasHandleBar: false });
                }
            }
        }
    }

    useEffect(() => {
        const brandsWithoutLinkedComponents = databaseModels.filter(item => item.category === label && item.is_primary && item.src);
        if (identifier === 'stem') {
            populateStemSteererSizeData(brandsWithoutLinkedComponents);
        } else {
            updateBrandsData(brandsWithoutLinkedComponents);
        }
        getLinkedBrandData("linkedStem");
        getLinkedBrandData("linkedHandleBar");
    }, [databaseModels, show]);

    useEffect(() => {
        if (disableSelections) {
            resetCanvasComponents();
        }
    }, [disableSelections, show])

    useEffect(() => {
        if (selectionPresetProps[identifier]?.model) {
            setBrand(selectionPresetProps[identifier].brand);
            const models = allBrandsData.filter(itemBrand => itemBrand.brand === selectionPresetProps[identifier].brand && itemBrand.is_primary);
            setAllModels(models);
            const selectedModelIndex = models.findIndex(itemModel => itemModel.model === selectionPresetProps[identifier]?.model);
            setSelectedIndex(selectedModelIndex);
            const selectedModelData = models.filter(itemModel => itemModel.model === selectionPresetProps[identifier]?.model);
            if (selectionPresetProps[identifier]?.presetColorValue) {
                setSelectedFeatures(prevState => ({ ...prevState, colors: { name: selectionPresetProps[identifier]?.presetColorName, value: selectionPresetProps[identifier]?.presetColorValue } }))
            } else {
                setSelectedFeatures(prevState => ({ ...prevState, colors: selectedModelData[0]?.color_value ? { name: selectedModelData[0]?.color_name, value: selectedModelData[0]?.color_value } : {} }))
            }
            setInitialModelData(selectedModelData[0]);
            const newSelectedModelData = { ...selectedModelData[0] };
            if (selectionPresetProps[identifier]?.presetColorPrice) {
                newSelectedModelData.price = selectionPresetProps[identifier]?.presetColorPrice;
                newSelectedModelData.src = selectionPresetProps[identifier]?.presetColorSrc;
            }
            setModelData(newSelectedModelData);
        }
    }, [selectionPresetProps[identifier]?.model]);

    useEffect(() => {
        // check for modelData.src so that linked components won't be added to canvasDrawImageProps
        if ((model && imageLoaded && image2Loaded && modelData.src)) {
            if (multipleImages.length > 0) {
                if (multipleImagesLoaded) {
                    setMultipleImagesLoaded(false);
                    updateCanvasImage({ multipleImages, modelData });
                }
            } else {
                updateCanvasImage({ modelData });
            }
        }
    }, [model, imageLoaded, image2Loaded, multipleImagesLoaded]);

    useEffect(() => {
        const allTubeData = accessoryModels.filter(item => item.accessory === "Tube")
        const tubeBrands = allTubeData.map(item => item.brand);
        setTyreTube(prevState => ({ ...prevState, tube: "Tubeless", tubeBrand: "Tubeless", allTubeData, tubeBrands }));
    }, [accessoryModels]);

    useEffect(() => {
        if (modelData && show) {
            updateTooltips(modelData, identifier, setTooltips);
        }
    }, [modelData, show])

    useEffect(() => {
        if (!show && identifier === 'handleBar' && !canvasDrawImageProps.stem.model) {
            setModel("");
            setSelectedIndex(null);
        }
    }, [show])

    useEffect(() => {
        if ((show || selectionPresetProps) && identifier) {
            setCanvasDrawImageProps(prevState => ({
                ...prevState,
                [identifier]: { ...prevState[identifier], selectedFeatures, sizes: modelData?.sizes }
            }));
        }
    }, [selectedFeatures, show, selectionPresetProps, identifier])

    useEffect(() => {
        if (identifier === 'stem' && modelData) {
            populateStemSteererSizeData(allBrandsData);
            if (canvasDrawImageProps.frameSet.steerer_size && modelData.steerer_size && modelData.steerer_size < canvasDrawImageProps.frameSet.steerer_size) {
                handleModelRemove(selectedIndex, modelData, modelData.steerer_size);
            }
        }
    }, [canvasDrawImageProps, show])

    useEffect(() => {
        if (show) {
            imageLoaded && image2Loaded && Object.keys(initialCanvasDrawImageProps.frameSet).length > 0 && !selectedFeatureBuild ? setCanvasLoading(false) : setCanvasLoading(true)
        }
    }, [show, model, imageLoaded, image2Loaded, Object.keys(initialCanvasDrawImageProps.frameSet).length, selectedFeatureBuild])

    if (!show && !handleBarShow && identifier === "handleBar") {
        return null;
    }

    return (
        <div id={identifier} className="flex flex-col gap-2 mt-6">
            {identifier === "stem" && <h1 className="text-2xl font-extrabold">Cockpit</h1>}
            <div>
                <div className="flex gap-2">
                    <h1 className={`${identifier === "stem" || identifier === "handleBar" ? "text-xl" : "text-2xl"} font-extrabold`}>Choose your {displayLabel || label}</h1>
                </div>
                {identifier !== "tire" && identifier !== "handleBar" &&  <div><p className="text-gray-400 text-lg">{selectionLevel}/5</p></div>}
            </div>
            <TextField select size="small" value={brand} disabled={disableSelections} sx={{ '& .Mui-disabled.MuiSelect-select': { cursor: 'not-allowed' } }} onChange={handleBrandChange} label="Brands" SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
                {
                    uniqueBrands.map(brand => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
            <div className="flex justify-between gap-2 flex-wrap pb-3">
                {
                    allModels.length > 0 ?
                        allModels.map((item, index) => (
                            <ModelButton
                                key={item.model + index}
                                selected={checkSelectedIndex(index)}
                                disabled={disableSelections}
                                onClick={() => {
                                    if (!checkSelectedIndex(index) && !disableSelections) {
                                        setSelectedFeatures({});
                                        handleModelChange(index, item);
                                        setInitialModelData(item);
                                    } else {
                                        handleModelRemove(index, item);
                                    }
                                }}
                                src={item.previewSrc || item.src}
                                model={item.model}
                                price={CurrencyFormatter(price && checkSelectedIndex(index) ? price : item.price, currencyCode, countryCode)}
                                modelInfo={item}
                                setModelInfo={setModelInfo}
                            >
                                <ColorSelector
                                    values={[item.color_value, ...colors?.filter(color => color?.model_id === item?.id).map(color => color.value)]}
                                    type="colors"
                                    label={label}
                                    model={model}
                                    colors={colors}
                                    modelData={modelData}
                                    initialModelData={initialModelData}
                                    handleModelChange={handleModelChange}
                                    selectedIndex={selectedIndex}
                                    databaseModels={databaseModels}
                                    selectedFeatures={selectedFeatures}
                                    setSelectedFeatures={setSelectedFeatures}
                                    setPrice={setPrice}
                                    isModelSelected={checkSelectedIndex(index)}
                                />
                            </ModelButton>
                        ))
                        : null
                }
            </div>
            {
                show && 
                <>
                    <NextImage ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
                    <NextImage ref={imageRef2} src={''} id="preview2" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImage2Loaded(true)} />
                </>
            }
            {
                brand === modelData?.brand && (modelData?.lengths?.length > 0 || modelData?.ratios?.length > 0 || modelData?.sizes?.length > 0 || modelData?.size_chart_url) &&
                <div>
                    { identifier !== "groupSet_drivetrain" && identifier !== "stem" && identifier !== "handleBar" ? <SizeSelector values={modelData?.sizes} type="sizes" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} /> : null}
                    <div className="flex justify-end">
                        <SizeChart sizeChartUrl={modelData?.size_chart_url} setSizeChartUrl={setSizeChartUrl} setShowSizeChartModal={setShowSizeChartModal} />
                    </div>
                    <div>
                        <FeatureSelector values={modelData?.lengths} type="lengths" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
                        <div className="flex gap-2 justify-between">
                            {identifier === "groupSet_drivetrain" || identifier === "stem" || identifier === "handleBar" ? <FeatureSelector values={modelData?.sizes} type="sizes" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} /> : null}
                            <FeatureSelector values={modelData?.ratios} type="ratios" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
                        </div>
                    </div>
                </div>
            }
            {
                identifier === "tire" && modelData &&
                <div className="flex flex-col gap-4 pt-5 pb-10">
                    <TextField select size="small" value={tyreTube.tubeBrand} onChange={(e) => { setTyreTube(prevState => ({ ...prevState, tube: e.target.value === "Tubeless" ? "Tubeless" : "Tube", tubeBrand: e.target.value, tubeModels: e.target.value === "Tubeless" ? null : prevState.allTubeData.filter(item => item.brand === e.target.value), selectedIndex: null })) }} label="Tube/Tubeless" SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
                        <MenuItem value={"Tubeless"}>Tubeless</MenuItem>
                        {
                            tyreTube.tubeBrands?.map(tubeBrand => (
                                <MenuItem value={tubeBrand} key={tubeBrand}>{tubeBrand}</MenuItem>
                            ))
                        }
                    </TextField>
                    <div className="flex justify-between gap-2 flex-wrap">
                        {
                            tyreTube.tubeModels?.length > 0 ?
                                tyreTube.tubeModels.map((item, index) => (
                                    <ModelButton
                                        key={item.model + index}
                                        selected={tyreTube.selectedIndex === index}
                                        onClick={() => {
                                            if (tyreTube.selectedIndex !== index) {
                                                setTyreTube(prevState => ({ ...prevState, selectedIndex: index }));
                                                setAddonAccessories(prevState => ({ ...prevState, ["Tube"]: { brand: item.brand, model: item.model, price: item.price } }))
                                            } else {
                                                setTyreTube(prevState => ({ ...prevState, selectedIndex: tyreTube.tubeModels.length }));
                                                setAddonAccessories(prevState => {
                                                    const { Tube, ...restProps } = prevState;
                                                    return { ...restProps };
                                                })
                                            }
                                            setRerender(prevState => !prevState);
                                        }}
                                        src={item.previewSrc || item.src}
                                        model={item.model}
                                        price={CurrencyFormatter(item.price, currencyCode, countryCode)}
                                    />
                                ))
                                : null
                        }
                    </div>
                </div>
            }
            {modelInfo && <KeyMetrics model="" modelInfo={modelInfo} setModalInfo={setModelInfo} />}
        </div>
    )
}
