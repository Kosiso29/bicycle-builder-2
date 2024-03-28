/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import SelectElement from "../ui/select";
import Loading from "@/app/components/loading";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth }) {
    const { setRerender, setCanvasDrawImageProps, models: databaseModels } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrandsData, setAllBrandsData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const [src, setSrc] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    const imageRef = useRef(null);
    const imageRef2 = useRef(null);
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
                    y: saddleY ? saddleY - prevState.saddle.height : prevState.saddle.y
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
                tire: {
                    ...prevState.tire,
                    x: frontWheelSetX ? frontWheelSetX - 10 : prevState.tire.x,
                    y: frontWheelSetY ? frontWheelSetY - 11 : prevState.tire.y,
                    x2: backWheelSetX ? backWheelSetX - 10 : prevState.tire.x2,
                    y2: backWheelSetY ? backWheelSetY - 11 : prevState.tire.y2
                },
            }
        });
        setRerender(prevState => !prevState);
    }

    useEffect(() => {
        imageRef.current?.setAttribute("src", src);
    }, [show, src]);

    useEffect(() => {
        if ((model && imageLoaded)) {
            if (/Wheel Set/i.test(label)) {
                if (imageLoaded && image2Loaded) {
                    updateCanvasImage();
                }
            } else {
                updateCanvasImage();
            }
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

    if (!show) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">{/Wheel Set/i.test(label) ? "Wheel Set" : label}</h1>
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
                                            if (selectedIndex !== index) {
                                                const { model, src, actualWidth } = item;
                                                handleModelChange(index, { model, src, actualWidth })
                                            }
                                        }}>
                                        <ListItemText primary={item.model} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    : null
            }
            {imageLoaded ? null : <div className='self-center'><Loading /></div>}
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImageLoaded(true)} />
            <Image ref={imageRef2} src={''} id="preview2" style={{ width: "auto", height: "auto", display: "none" }} alt="" crossOrigin="anonymous" onLoad={() => setImage2Loaded(true)} />
        </div>
    )
}
