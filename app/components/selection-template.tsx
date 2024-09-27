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
import SizeSelector from "@/app/ui/toggle-button";
import SizeChart from "./size_chart";
import ModelButton from "@/app/ui/model-button";
import KeyMetrics from "@/app/components/key-metrics";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth, identifier, displayLabel, handleReset, recaliberateComponents }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels, selectionLevelProps, selectionPresetProps, initialCanvasDrawImageProps, setInitialCanvasDrawImageProps,
        canvasDrawImageProps, frameSetDimensions, stemDimensions, setFrameSetDimensions, setStemDimensions, setTooltips, colors, accessoryModels, setAddonAccessories, setLinkedComopnentDimensions } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
    const [initialModelData, setInitialModelData] = useState(null);
    const [modelData, setModelData] = useState(null);
    const [allModels, setAllModels] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    const [multipleImages, setMultipleImages] = useState([]);
    const [multipleImagesLoaded, setMultipleImagesLoaded] = useState(false);
    const imageRef = useRef(null);
    const imageRef2 = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [price, setPrice] = useState(0.00);
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const [tyreTube, setTyreTube] = useState({});
    const [disableSelections, setDisableSelections] = useState(false);
    const [modelInfo, setModelInfo] = useState(null);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrandsData.filter(itemBrand => itemBrand.brand === e.target.value && itemBrand.is_primary);
        setAllModels(models);
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

    const resetCanvasComponents = () => {
        setCanvasDrawImageProps(prevState => {
            selectionLevelProps.forEach(selectionLevelProp => {
                // This is for the cockpit of stem and handleBar selectionLevelProps
                if ((selectionLevelProps.length > 1 && !selectionLevelProp.includes('Wheel') && !selectionLevelProp.includes('groupSet')) || identifier === "tire") {
                    if (selectionLevelProp === identifier) {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                    }
                } else {
                    if (selectionLevelProp === 'groupSet_shifter') {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2, stemShifterX: prevState[selectionLevelProp].stemShifterX, stemShifterY: prevState[selectionLevelProp].stemShifterY };
                    } else if (identifier === 'saddle') {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState.frameSet.saddleY - initialCanvasDrawImageProps[selectionLevelProp]?.height };
                    } else {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                    }
                }
            })
            return prevState;
        });

        positionCanvasImages(canvasDrawImageProps[identifier], identifier, canvasDrawImageProps, setCanvasDrawImageProps, frameSetDimensions, stemDimensions);
    }

    const handleModelRemove = (index) => {
        setModel("");
        setModelData(null);
        setSelectedIndex(null);
        imageRef.current?.setAttribute("src", "/Cadex-Saddle.png");
        if (/Wheel Set/i.test(label)) {
            setTooltips(prevState => ({ ...prevState, aerodynamics: getToolTipValue(null, prevState.aerodynamicsFrame, prevState.aerodynamics), weight: getToolTipValue(null, prevState.weightFrame, prevState.weight), overall: getToolTipValue(null, prevState.overallFrame, prevState.overall), aerodynamicsWheel: null, weightWheel: null, overallWheel: null }));
        }
        if (/Wheel Set|Group Set/i.test(label)) {
            imageRef2.current?.setAttribute("src", "/Cadex-Saddle.png");
        };

        resetCanvasComponents();

        if (selectionLevelProps.includes('frameSet')) {
        
            const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                hasStem, hasHandleBar, actualWidth, width, height } = initialCanvasDrawImageProps.frameSet;
    
            const offsets = {
                stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
            };

            setFrameSetDimensions({ width, height, actualWidth, ...offsets, hasStem, hasHandleBar });
    
            recaliberateComponents(setCanvasDrawImageProps, actualWidth);
    
            recaliberateComponents(setInitialCanvasDrawImageProps, actualWidth);
    
            if (hasStem && !hasHandleBar) {
                setStemDimensions(prevState => ({ ...prevState, hasHandleBar: false }))
            }
    
            // set hasHandleBar to true for the placeholder stem which has handleBar
            if (!hasStem && !canvasDrawImageProps.stem.model) {
                setStemDimensions(prevState => ({ ...prevState, hasHandleBar: true }))
            }
            // handleReset();
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
            imageElement?.setAttribute("src", modelData?.src + '?random=' + Math.random());
        } else {
            imageElement?.setAttribute("src", modelData?.src);
        }
    }

    const checkSelectedIndex = (index) => selectedIndex === index && modelData?.brand === brand;

    const updateBrandsData = (brands) => {
        setAllBrandsData(brands);
        const reducedBrands = [];
        brands.forEach(brandItem => {
            if (!reducedBrands.includes(brandItem.brand)) {
                reducedBrands.push(brandItem.brand);
            }
        });
        setUniqueBrands(reducedBrands);
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
        updateBrandsData(brandsWithoutLinkedComponents);
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
            setSelectedFeatures(prevState => ({ ...prevState, colors: selectedModelData[0]?.color_value }))
            setModelData(selectedModelData[0]);
            setInitialModelData(selectedModelData[0]);
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

    if (!show) {
        return null;
    }

    return (
        <div id={identifier} className="flex flex-col gap-4">
            {identifier === "stem" && <h1 className="text-2xl font-bold">Cockpit</h1>}
            <div className="flex gap-2">
                <h1 className={`${identifier === "stem" || identifier === "handleBar" ? "text-xl" : "text-2xl"} font-bold`}>{displayLabel || label}</h1>
                {imageLoaded ? null : <div className='self-center'><Loading small /></div>}
            </div>
            <TextField select size="small" value={brand} disabled={disableSelections} sx={{ '& .Mui-disabled.MuiSelect-select': { cursor: 'not-allowed' } }} onChange={handleBrandChange} label="Brands">
                {
                    uniqueBrands.map(brand => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
            <div className="flex justify-end">
                <SizeChart size_chart_url={modelData?.size_chart_url} />
            </div>
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
                                        handleModelRemove(index);
                                    }
                                }}
                                src={item.previewSrc || item.src}
                                model={item.model}
                                price={CurrencyFormatter(price && checkSelectedIndex(index) ? price : item.price)}
                                modelInfo={item}
                                setModelInfo={setModelInfo}
                            />
                        ))
                        : null
                }
            </div>
            {/* {
                allModels.length > 0 ?
                    <List
                        sx={{ borderRadius: "4px", paddingTop: "0", paddingBottom: "0", overflow: "hidden", border: "1px solid lightgray" }}
                        subheader={
                            <ListSubheader id="nested-list-subheader" sx={{ backgroundColor: "rgb(156 163 175)", color: "white", lineHeight: "2.5rem" }}>
                                Models
                            </ListSubheader>
                        }
                        dense
                    >
                        {
                            allModels.map((item, index) => (
                                <ListItem
                                    key={label + item.model + index}
                                    disablePadding
                                    sx={{
                                        backgroundColor: checkSelectedIndex(index) ? "#1A1A1A" : "initial",
                                        color: checkSelectedIndex(index) ? "white" : "initial",
                                        transition: ".2s ease-in",
                                        "&.MuiListItem-root": disableSelections && { cursor: "not-allowed" }
                                    }}>
                                    <ListItemButton
                                        divider={index !== (allModels.length - 1) ? true : false}
                                        selected={checkSelectedIndex(index)}
                                        data-value={item.src}
                                        data-actual-width={item.actualWidth || "0"}
                                        disabled={disableSelections}
                                        sx={{ "&.Mui-disabled": { cursor: "not-allowed" } }}
                                        onClick={() => {
                                            if (!checkSelectedIndex(index) && !disableSelections) {
                                                setSelectedFeatures({});
                                                handleModelChange(index, item);
                                                setInitialModelData(item);
                                            }
                                        }}>
                                        <ListItemText primary={item.model} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                        <div className="flex items-center gap-2">
                                            <ListItemText className={`flex justify-end ${checkSelectedIndex(index) ? "text-white whitespace-nowrap" : "text-primary"}`} primary={<>$&nbsp;{CurrencyFormatter(price && checkSelectedIndex(index) ? price : item.price)}</>} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                            <ListItemText className={`flex justify-end hover:text-red-500 ${checkSelectedIndex(index) ? "text-white" : selectedIndex !== index && modelData?.brand === brand ? "invisible" : "hidden"}`} onClick={() => { handleModelRemove(index) }} primary={<CloseOutlined fontSize="small" />} />
                                        </div>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    : null
            } */}
            <NextImage ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
            <NextImage ref={imageRef2} src={''} id="preview2" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImage2Loaded(true)} />
            {
                brand === modelData?.brand &&
                <div>
                    <div className="mt-4">
                        <SizeSelector
                            values={colors?.filter(color => color?.model_id === modelData?.id).map(color => color.value)}
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
                        />
                        <SizeSelector values={modelData?.lengths} type="lengths" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
                        <SizeSelector values={modelData?.sizes} type="sizes" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
                        <SizeSelector values={modelData?.ratios} type="ratios" label={label} model={model} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
                    </div>
                </div>
            }
            {
                identifier === "tire" && modelData &&
                <div className="flex flex-col gap-4 pb-10">
                    <TextField select size="small" value={tyreTube.tubeBrand} onChange={(e) => { setTyreTube(prevState => ({ ...prevState, tube: e.target.value === "Tubeless" ? "Tubeless" : "Tube", tubeBrand: e.target.value, tubeModels: e.target.value === "Tubeless" ? null : prevState.allTubeData.filter(item => item.brand === e.target.value), selectedIndex: null })) }} label="Tube/Tubeless">
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
                                                setRerender(prevState => !prevState);
                                            }
                                        }}
                                        src={item.previewSrc || item.src}
                                        model={item.model}
                                        price={CurrencyFormatter(item.price)}
                                    />
                                ))
                                : null
                        }
                    </div>
                    {/* {
                        tyreTube.tubeModels?.length > 0 ?
                            <List
                                sx={{ borderRadius: "4px", paddingTop: "0", paddingBottom: "0", overflow: "hidden", border: "1px solid lightgray" }}
                                subheader={
                                    <ListSubheader sx={{ backgroundColor: "rgb(156 163 175)", color: "white", lineHeight: "2.5rem" }}>
                                        Models
                                    </ListSubheader>
                                }
                                dense
                            >
                                {
                                    tyreTube.tubeModels.map((item, index) => (
                                        <ListItem
                                            key={label + item.model + index}
                                            disablePadding
                                            sx={{
                                                backgroundColor: tyreTube.selectedIndex === index ? "#1A1A1A" : "initial",
                                                color: tyreTube.selectedIndex === index ? "white" : "initial",
                                                transition: ".2s ease-in"
                                            }}>
                                            <ListItemButton
                                                divider={index !== (tyreTube.tubeModels.length - 1) ? true : false}
                                                selected={tyreTube.selectedIndex === index}
                                                onClick={() => {
                                                    if (tyreTube.selectedIndex !== index) {
                                                        setTyreTube(prevState => ({ ...prevState, selectedIndex: index }));
                                                        setAddonAccessories(prevState => ({ ...prevState, ["Tube"]: { brand: item.brand, model: item.model, price: item.price } }))
                                                    }
                                                }}>
                                                <ListItemText primary={item.model} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                                <div className="flex items-center gap-2">
                                                    <ListItemText className={`flex justify-end ${tyreTube.selectedIndex === index ? "text-white whitespace-nowrap" : "text-primary"}`} primary={<>$&nbsp;{CurrencyFormatter(item.price)}</>} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                                    <ListItemText
                                                        className={`flex justify-end ${tyreTube.selectedIndex === index ? "text-white" : tyreTube.selectedIndex === tyreTube.tubeModels.length ? "hidden" : "invisible"}`}
                                                        onClick={() => {
                                                            setTyreTube(prevState => ({ ...prevState, selectedIndex: tyreTube.tubeModels.length }));
                                                            setAddonAccessories(prevState => {
                                                                const { Tube, ...restProps } = prevState;
                                                                return { ...restProps };
                                                            })
                                                            setRerender(prevState => !prevState);
                                                        }}
                                                        primary={<CloseOutlined fontSize="small" />} />
                                                </div>
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            : null
                    } */}
                </div>
            }
            {modelInfo && <KeyMetrics model="" modelInfo={modelInfo} setModalInfo={setModelInfo} /> }
        </div>
    )
}
