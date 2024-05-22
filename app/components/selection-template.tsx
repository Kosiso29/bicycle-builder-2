/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import Loading from "@/app/components/loading";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import { positionCanvasImages } from "@/app/utils/position-canvas-images";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth, identifier, displayLabel, handleReset }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels, selectionLevelProps, selectionPresetProps, initialCanvasDrawImageProps,
        canvasDrawImageProps, frameSetDimensions, stemDimensions } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    const imageRef = useRef(null);
    const imageRef2 = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [price, setPrice] = useState(0.00);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrandsData.filter(itemBrand => itemBrand.brand === e.target.value);
        setAllModels(models);
        setSelectedIndex(null);
    }

    const handleModelChange = (index, modelData) => {
        setModel(modelData?.model);
        setPrice(modelData?.price);
        setImageLoaded(false);
        if (/Wheel Set/i.test(label)) {
            setImage2Loaded(false);
            const backWheetSet = databaseModels.filter(item => item.model === modelData.model && item.category === 'Back Wheel Set')[0];
            imageRef2.current?.setAttribute("src", backWheetSet?.src);
        }
        imageRef.current?.setAttribute("src", modelData?.src);
        if (setActualWidth) {
            setActualWidth(modelData?.actualWidth);
        }
        setSelectedIndex(index);
    }

    const handleModelRemove = (index) => {
        setModel("");
        setSelectedIndex(null);
        imageRef.current?.setAttribute("src", "/Cadex-Saddle.png");
        if (/Wheel Set/i.test(label)) {
            imageRef2.current?.setAttribute("src", "/Cadex-Saddle.png");
        };
        setCanvasDrawImageProps(prevState => {
            selectionLevelProps.forEach(selectionLevelProp => {
                if (selectionLevelProps.length > 1 && !selectionLevelProp.includes('Wheel')) {
                    if (selectionLevelProp === identifier) {
                        prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                    }
                } else {
                    prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
                }
            })
            return prevState;
        });
        if (selectionLevelProps.includes('frameSet')) {
            handleReset();
        }
        setRerender(prevState => !prevState);
    }

    const updateCanvasImage = () => {
        const imageProps = updateDrawImageProps({ brand, model, price }, allModels);

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

    useEffect(() => {
        if (selectionPresetProps[identifier]?.model) {
            setBrand(selectionPresetProps[identifier].brand);
            const models = allBrandsData.filter(itemBrand => itemBrand.brand === selectionPresetProps[identifier].brand);
            setAllModels(models);
            let selectedModelIndex = models.findIndex(itemModel => itemModel.model === selectionPresetProps[identifier]?.model);
            setSelectedIndex(selectedModelIndex);
        }
    }, [selectionPresetProps[identifier]?.model]);

    useEffect(() => {
        if ((model && imageLoaded && image2Loaded)) {
            updateCanvasImage();
        }
    }, [model, imageLoaded, image2Loaded]);

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
            <h1 className="text-2xl font-bold">{displayLabel || label}</h1>
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
                                                handleModelChange(index, item)
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
            {imageLoaded ? null : <div className='self-center'><Loading small /></div>}
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
            <Image ref={imageRef2} src={''} id="preview2" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImage2Loaded(true)} />
        </div>
    )
}
