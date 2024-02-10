// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem, Button } from "@mui/material";
import SelectElement from "../ui/select";

export default function SelectionTemplate({ setImage, dataSet, label, show, updateDrawImageProps }) {
    const [brand, setBrand] = useState("");
    const [allBrands] = useState(dataSet);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const imageRef = useRef(null);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrands.filter(itemBrand => itemBrand.brand === e.target.value)[0].model;
        setAllModels(models);
    }

    const handleModelChange = (e) => {
        setModel(e.target.value);
        imageRef.current?.setAttribute("src", e.target.value);
    }

    const updateCanvasImage = () => {
        const imageProps = updateDrawImageProps();
        setImage(imageProps);
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
                                <MenuItem value={item.src} key={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </SelectElement> : null
            }
            <Button variant="contained" onClick={updateCanvasImage}>Set Frame</Button>
            <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto" }} alt="" />
        </div>
    )
}
