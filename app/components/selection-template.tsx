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
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrands.filter(itemBrand => itemBrand.brand === e.target.value)[0].model;
        setAllModels(models);
    }

    const handleModelChange = (e, inputData) => {
        setModel(e.target.value);
        imageRef.current?.setAttribute("src", e.target.value);
        if (setActualWidth) {
            setActualWidth(inputData?.props?.['data-actual-width']);
        }
        setImageLoaded(false);
    }

    const updateCanvasImage = () => {
        const imageProps = updateDrawImageProps();

        const stemX = Object.values(imageProps)[0]?.stemX;
        const stemY = Object.values(imageProps)[0]?.stemY;
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
                    x: stemX ? stemX + 35 : prevState.handleBar.x,
                    y: stemY ? stemY + 2 : prevState.handleBar.y
                },
            }
        });
        setRerender(prevState => !prevState);
    }
    
    useEffect(() => {
        imageRef.current?.setAttribute("src", model);
    }, [ show, model ])

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
                    <SelectElement value={model} onChange={handleModelChange} label="Models">
                        {
                            allModels.map(item => (
                                <MenuItem value={item.src} key={item.name} data-actual-width={item.actualWidth || "0"}>{item.name}</MenuItem>
                            ))
                        }
                    </SelectElement> : null
            }
            <Button variant="contained" onClick={updateCanvasImage}>{`Add ${label}`}</Button>
            {
                imageLoaded ? null : <Loader />
            }
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto", visibility: imageLoaded ? "visible" : "hidden" }} alt="" onLoadingComplete={() => setImageLoaded(true)} />
        </div>
    )
}
