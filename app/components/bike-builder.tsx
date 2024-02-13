// @ts-nocheck

'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import FrameSet from "./frame-set";
import WheelSet from "./wheel-set";
import Stem from "./stem";

export default function BikeBuilder() {
    const [canvasState, setCanvasState] = useState(1);
    const [selectionLevel, setSelectionLevel] = useState(1);
    const [frameSetDimensions, setFrameSetDimensions] = useState({});

    const [canvasContext, setCanvasContext] = useState(null);

    function setImage(drawImageProps) {

        const { image, x, y, width, height } = drawImageProps;
        
        canvasContext.drawImage(image, x, y, width, height);
        setCanvasState(prevState => {
            prevState++;
            return prevState;
        });
    }

    const getCanvasContext = () => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        return context;
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
    
    useEffect(() => {
        const context = getCanvasContext();
        setCanvasContext(context);
    }, [])

    return (
        <main className="">
            <div className="h-screen mr-[25rem] bg-blue-100 w-[calc(100% - 25rem)] p-5">
                <canvas id="canvas" className="border-black bg-gray-300 border rounded-lg" width={1000} height={680} />
            </div>
            <div className="flex flex-col justify-between fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5">
                <FrameSet setImage={setImage} canvasContext={canvasContext} show={selectionLevel === 1} setFrameSetDimensions={setFrameSetDimensions} />
                <WheelSet setImage={setImage} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={550} canvasY={260} frameSetDimensions={frameSetDimensions} label="Front Wheel Set" />
                <WheelSet setImage={setImage} canvasContext={canvasContext} show={selectionLevel === 3} canvasX={40} canvasY={260} frameSetDimensions={frameSetDimensions} label="Back Wheel Set" />
                <Stem setImage={setImage} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={600} canvasY={160} frameSetDimensions={frameSetDimensions} />
                <div className="flex justify-between">
                    <Button variant="outlined" onClick={handleSelectionLevel}>Prev</Button>
                    <Button variant="contained" onClick={handleSelectionLevel}>Next</Button>
                </div>
            </div>
        </main>

    );
}
