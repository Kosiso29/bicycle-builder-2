// @ts-nocheck

'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import { FormControl, MenuItem, InputLabel, Select, Button } from "@mui/material";
import { apiData } from "../lib/apiData";

export default function BikeBuilder() {
    const [brand, setBrand] = useState("");
    const [allBrands] = useState(apiData);
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
        var x = 150;
        var y = 150;
        var width = 150;
        var height = 150;

        var image = document.getElementById('preview');
        // image.src = srcValue;
        // image.alt = srcValue
        // context.globalCompositeOperation = 'destination-over';
        context.drawImage(image, x, y, width, height);
        console.log('I am setting image', image, imageRef.current)
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        const models = apiData.filter(itemBrand => itemBrand.brand === e.target.value)[0].model;
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
                <canvas id="canvas" className="border-black bg-white border rounded-lg w-full h-[500px]" />
            </div>
            <div className="fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5">
                {/* <p>Select file <input type="file" onChange={previewImage} /></p> */}
                <p><Image ref={imageRef} src={''} id="preview" style={{ width: "auto", height: "auto" }} width={50} height={50} alt="" /></p>
                {/* <p>Enter x <input className="border-2 border-black" id="x" /></p>
                <p>Enter y <input className="border-2 border-black" id="y" /></p>
                <p>Enter width <input className="border-2 border-black" id="width" /></p>
                <p>Enter height <input className="border-2 border-black" id="height" /></p>
                <p><button onClick={setImage}>Set image</button></p> */}
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
                    <Button variant="contained" onClick={setImage}>Set Image</Button>
                </div>
            </div>
        </main>

    );
}
