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

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth, identifier, displayLabel, handleReset }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels, selectionLevelProps, selectionPresetProps, initialCanvasDrawImageProps,
        canvasDrawImageProps, frameSetDimensions, stemDimensions, setTooltips, colors } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
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
    const [resetToggleButtons, setResetToggleButtons] = useState(0);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrandsData.filter(itemBrand => itemBrand.brand === e.target.value && itemBrand.is_primary);
        setAllModels(models);
        setSelectedIndex(null);
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

        imageRef.current?.setAttribute("src", modelData?.src + '?random=' + Math.random());
        if (setActualWidth) {
            setActualWidth(modelData?.actualWidth);
        }
        setSelectedIndex(index);
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
        setCanvasDrawImageProps(prevState => {
            selectionLevelProps.forEach(selectionLevelProp => {
                if (selectionLevelProps.length > 1 && !selectionLevelProp.includes('Wheel') && !selectionLevelProp.includes('groupSet')) {
                    if (selectionLevelProp === identifier) {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                    }
                } else {
                    if (selectionLevelProp === 'groupSet_shifter') {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2, stemShifterX: prevState[selectionLevelProp].stemShifterX, stemShifterY: prevState[selectionLevelProp].stemShifterY };
                    } else {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                    }
                }
            })
            return prevState;
        });

        positionCanvasImages(canvasDrawImageProps[identifier], identifier, canvasDrawImageProps, setCanvasDrawImageProps, frameSetDimensions, stemDimensions);

        if (selectionLevelProps.includes('frameSet')) {
            handleReset();
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

    function getToolTipValue (wheelValue: number, frameValue: number, originalValue: number) {
        if (wheelValue && frameValue) return (wheelValue + frameValue) / 2;

        if (wheelValue) return wheelValue;

        if (frameValue) return frameValue;

        return originalValue
    }

    function loadImage2(regex, modelData2) {
        if (regex.test(label)) {
            setImage2Loaded(false);
            imageRef2.current?.setAttribute("src", modelData2?.src + '?random=' + Math.random());
        }
    }

    useEffect(() => {
        if (selectionPresetProps[identifier]?.model) {
            setBrand(selectionPresetProps[identifier].brand);
            const models = allBrandsData.filter(itemBrand => itemBrand.brand === selectionPresetProps[identifier].brand && itemBrand.is_primary);
            setAllModels(models);
            const selectedModelIndex = models.findIndex(itemModel => itemModel.model === selectionPresetProps[identifier]?.model);
            setSelectedIndex(selectedModelIndex);
            const selectedModelData = models.filter(itemModel => itemModel.model === selectionPresetProps[identifier]?.model);
            setModelData(selectedModelData[0]);
        }
    }, [selectionPresetProps[identifier]?.model]);

    useEffect(() => {
        if ((model && imageLoaded && image2Loaded)) {
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
        const brands = databaseModels.filter(item => item.category === label);
        setAllBrandsData(brands);
        const reducedBrands = [];
        brands.forEach(brandItem => {
            if (!reducedBrands.includes(brandItem.brand)) {
                reducedBrands.push(brandItem.brand);
            }
        });
        setUniqueBrands(reducedBrands);
    }, [databaseModels]);

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
            <div className="flex justify-between items-end">
                <div className="flex gap-2">
                    <h1 className="text-2xl font-bold">{displayLabel || label}</h1>
                    {imageLoaded ? null : <div className='self-center'><Loading small /></div>}
                </div>
                <SizeChart size_chart_url={modelData?.size_chart_url} />
            </div>
            <TextField select size="small" value={brand} onChange={handleBrandChange} label="Brands">
                {
                    uniqueBrands.map(brand => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
            {
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
                                        backgroundColor: selectedIndex === index ? "rgb(25, 118, 210)" : "initial",
                                        color: selectedIndex === index ? "white" : "initial",
                                        transition: ".2s ease-in"
                                    }}>
                                    <ListItemButton
                                        divider={index !== (allModels.length - 1) ? true : false}
                                        selected={selectedIndex === index}
                                        data-value={item.src}
                                        data-actual-width={item.actualWidth || "0"}
                                        onClick={() => {
                                            if (selectedIndex !== index) {
                                                setResetToggleButtons(prevState => prevState + 1);
                                                handleModelChange(index, item);
                                            }
                                        }}>
                                        <ListItemText primary={item.model} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                        <div className="flex items-center gap-2">
                                            <ListItemText className={`flex justify-end ${selectedIndex === index ? "text-white whitespace-nowrap" : "text-primary"}`} primary={<>$&nbsp;{CurrencyFormatter(item.price)}</>} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                            <ListItemText className={`flex justify-end ${selectedIndex === index ? "text-white" : selectedIndex === null ? "hidden" : "invisible"}`} onClick={() => { handleModelRemove(index) }} primary={<CloseOutlined fontSize="small" />} />
                                        </div>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    : null
            }
            <NextImage ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
            <NextImage ref={imageRef2} src={''} id="preview2" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImage2Loaded(true)} />
            <div className="mt-5" key={resetToggleButtons}>
                <SizeSelector
                    values={colors?.filter(color => color?.model_id === modelData?.id).map(color => color.value)}
                    type="colors"
                    label={label}
                    colors={colors}
                    modelData={modelData}
                    handleModelChange={handleModelChange}
                    selectedIndex={selectedIndex}
                    databaseModels={databaseModels}
                />
                <SizeSelector values={modelData?.lengths} type="lengths" label={label} />
                <SizeSelector values={modelData?.sizes} type="sizes" label={label} />
                <SizeSelector values={modelData?.ratios} type="ratios" label={label} />
            </div>
        </div>
    )
}
