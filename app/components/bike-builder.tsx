// @ts-nocheck

'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@mui/material";
import { frameSet } from "../lib/apiData";
import FrameSet from "./frame-set";
import WheelSet from "./wheel-set";

export default function BikeBuilder() {
    const [canvasState, setCanvasState] = useState(1);
    const [selectionLevel, setSelectionLevel] = useState(1)

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
        setCanvasState(prevState => {
            prevState++;
            return prevState;
        });
    }

    const handleSelectionLevel = (e) => {
        let newSelectionLevel = selectionLevel;
        if (/Prev/i.test(e.target.textContent)) {
            if (selectionLevel > 1) {
                newSelectionLevel--;
            } else {
                alert("you're at the beginning")
            }
        }
        
        if (/Next/i.test(e.target.textContent)) {
            if (canvasState > selectionLevel) {
                newSelectionLevel++;
            } else {
                alert('Complete selection before proceeding');
            }
        }
        setSelectionLevel(newSelectionLevel)
    }

    return (
        <main className="">
            <div className="h-screen mr-[25rem] bg-blue-100 w-[calc(100% - 25rem)] p-5">
                <canvas id="canvas" className="border-black bg-gray-300 border rounded-lg" width={1000} height={480} />
            </div>
            <div className="flex flex-col justify-between fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5">
                {/* <div style={{ display: selectionLevel === 1 ? 'block' : 'none' }}>
                    <FrameSet setImage={setImage} />
                </div>
                <div style={{ display: selectionLevel === 2 ? 'block' : 'none' }}>
                    <WheelSet setImage={setImage} />
                </div> */}
                {
                    selectionLevel === 1 ?
                        <FrameSet setImage={setImage} />:null
                    }
                {
                    selectionLevel === 2 ?
                        <WheelSet setImage={setImage} />:null
                    }
                <div className="flex justify-between">
                    <Button variant="outlined" onClick={handleSelectionLevel}>Prev</Button>
                    <Button variant="contained" onClick={handleSelectionLevel}>Next</Button>
                </div>
            </div>
        </main>

    );
}
