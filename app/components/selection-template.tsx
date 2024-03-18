/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import SelectElement from "../ui/select";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const [src, setSrc] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrandsData.filter(itemBrand => itemBrand.brand === e.target.value);
        setAllModels(models);
        setSelectedIndex(null);
    }

    const handleModelChange = (index, modelData) => {
        setSrc(modelData?.src);
        setModel(modelData?.model);
        imageRef.current?.setAttribute("src", modelData?.src);
        if (setActualWidth) {
            setActualWidth(modelData?.actualWidth);
        }
        setImageLoaded(false);
        setSelectedIndex(index);
    }

    const updateCanvasImage = () => {
        const imageProps = updateDrawImageProps(brand, model, allModels);

        setCanvasDrawImageProps(prevState => {
            prevState = { ...prevState, ...imageProps };
            return prevState;
        });

        const values = Object.values(imageProps)[0];
        const stemX = values?.stemX;
        const stemY = values?.stemY;
        const saddleX = values?.saddleX;
        const saddleY = values?.saddleY;
        const frontWheelSetX = values?.frontWheelSetX;
        const frontWheelSetY = values?.frontWheelSetY;
        const backWheelSetX = values?.backWheelSetX;
        const backWheelSetY = values?.backWheelSetY;

        setCanvasDrawImageProps(prevState => {
            return {
                ...prevState,
                stem: {
                    ...prevState.stem,
                    x: stemX ? stemX : prevState.stem.x,
                    y: stemY ? stemY : prevState.stem.y
                },
                handleBar: {
                    ...prevState.handleBar,
                    x: stemX ? stemX + 30 : prevState.handleBar.x,
                    y: stemY ? stemY + 2 : prevState.handleBar.y
                },
                saddle: {
                    ...prevState.saddle,
                    x: saddleX ? saddleX : prevState.saddle.x,
                    y: saddleY ? saddleY : prevState.saddle.y
                },
                frontWheelSet: {
                    ...prevState.frontWheelSet,
                    x: frontWheelSetX ? frontWheelSetX : prevState.frontWheelSet.x,
                    y: frontWheelSetY ? frontWheelSetY : prevState.frontWheelSet.y
                },
                backWheelSet: {
                    ...prevState.backWheelSet,
                    x: backWheelSetX ? backWheelSetX : prevState.backWheelSet.x,
                    y: backWheelSetY ? backWheelSetY : prevState.backWheelSet.y
                },
            }
        });
        setRerender(prevState => !prevState);
    }

    useEffect(() => {
        imageRef.current?.setAttribute("src", src);
    }, [show, src]);

    useEffect(() => {
        if (model && imageLoaded) {
            updateCanvasImage();
        }
    }, [model, imageLoaded]);

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

    if (!show) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">{label}</h1>
            <SelectElement value={brand} onChange={handleBrandChange} label="Brands">
                {
                    uniqueBrands.map(brand => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </SelectElement>
            {
                allModels.length > 0 ?
                    <List
                        sx={{ borderRadius: "4px", paddingTop: "0", paddingBottom: "0", overflow: "hidden", border: "1px solid lightgray" }}
                        subheader={
                            <ListSubheader id="nested-list-subheader" sx={{ backgroundColor: "rgb(156 163 175)", color: "white" }}>
                                Models
                            </ListSubheader>
                        }
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
                                            const { model, src, actualWidth } = item;
                                            handleModelChange(index, { model, src, actualWidth })
                                        }}>
                                        <ListItemText primary={item.model} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    : null
            }
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", visibility: imageLoaded ? "visible" : "hidden", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
        </div>
    )
}
