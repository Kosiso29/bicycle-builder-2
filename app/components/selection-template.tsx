/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, Button } from "@mui/material";
import SelectElement from "../ui/select";
import Loader from "./loader";

export default function SelectionTemplate({ parentProps, dataSet, label, show, updateDrawImageProps, setActualWidth }) {
    const { setRerender, setCanvasDrawImageProps } = parentProps;
    const [brand, setBrand] = useState("");
    const [allBrands] = useState(dataSet);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const [src, setSrc] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrands.filter(itemBrand => itemBrand.brand === e.target.value)[0].model;
        setAllModels(models);
    }

    const handleModelChange = (e, inputData) => {
        setSrc(e.target.value);
        setModel(inputData?.props?.['data-name']);
        imageRef.current?.setAttribute("src", e.target.value);
        if (setActualWidth) {
            setActualWidth(inputData?.props?.['data-actual-width']);
        }
        setImageLoaded(false);
    }

    const updateCanvasImage = () => {
        const imageProps = updateDrawImageProps(brand, model);

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
    }, [model, imageLoaded])

    if (!show) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">{ label }</h1>
            <SelectElement value={brand} onChange={handleBrandChange} label="Brands">
                {
                    allBrands.map(item => (
                        <MenuItem value={item.brand} key={item.brand}>{item.brand}</MenuItem>
                    ))
                }
            </SelectElement>
            {
                allModels.length > 0 ?
                    <SelectElement value={src} onChange={handleModelChange} label="Models">
                        {
                            allModels.map(item => (
                                <MenuItem value={item.src} key={item.name} data-name={item.name} data-actual-width={item.actualWidth || "0"}>{item.name}</MenuItem>
                            ))
                        }
                    </SelectElement> : null
            }
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", visibility: imageLoaded ? "visible" : "hidden", display: "none" }} alt="" onLoadingComplete={() => setImageLoaded(true)} />
        </div>
    )
}
