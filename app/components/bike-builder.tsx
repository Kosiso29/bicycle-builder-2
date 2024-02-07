// @ts-nocheck

'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import { FormControl, MenuItem, InputLabel, Select, Button } from "@mui/material";
import { frameSet } from "../lib/apiData";

export default function BikeBuilder() {
    const [brand, setBrand] = useState("");
    const [allBrands] = useState(frameSet);
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const imageRef = useRef(null);

    // function previewImage(event) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         imageRef.current?.setAttribute("src", e.target.result);
    //     };
    //     reader.readAsDataURL(event.target.files[0])
    // }

    function setImage() {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var x = 300;
        var y = 150;
        // var width = document.getElementById('preview').width;
        // var height = document.getElementById('preview').height;

        var image = document.getElementById('preview');
        // image.src = srcValue;
        // image.alt = srcValue
        // context.globalCompositeOperation = 'destination-over';
        context.drawImage(image, x, y, image.width, image.height);
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = allBrands.filter(itemBrand => itemBrand.brand === e.target.value)[0].model;
        setAllModels(models);
    }

    const handleModelChange = (e) => {
        setModel(e.target.value);
        console.log('inputValue', e.target.value, e.target.outerHTML);
        imageRef.current?.setAttribute("src", e.target.value);
    }

    return (
        <main className="">
            <div className="h-screen mr-[25rem] bg-blue-100 w-[calc(100% - 25rem)] p-5">
                <canvas id="canvas" className="border-black bg-gray-300 border rounded-lg" width={1000} height={480} />
            </div>
            <div className="fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5">
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl font-bold">Frame Set</h1>
                    <FormControl fullWidth>
                        <InputLabel id="BrandLabel">Brands</InputLabel>
                        <Select
                            labelId="BrandLabel"
                            id="BrandId"
                            value={brand}
                            label="Brands"
                            onChange={handleBrandChange}
                        >
                            {
                                allBrands.map(item => (
                                    <MenuItem value={item.brand} key={item.brand}>{item.brand}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {
                        allModels.length > 0 ? 
                            <FormControl fullWidth>
                                <InputLabel id="ModelLabel">Models</InputLabel>
                                <Select
                                    labelId="ModelLabel"
                                    id="ModelId"
                                    value={model}
                                    label="Models"
                                    onChange={handleModelChange}
                                >
                                    {
                                        allModels.map(item => (
                                            <MenuItem value={item.src} key={item.name}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl> : null
                    }
                    <Button variant="contained" onClick={setImage}>Set Frame</Button>
                    <Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto" }} alt="" />
                </div>
            </div>
        </main>

    );
}
