'use client'

import BikeBuilder from "./bike-builder";
import Summary from "./summary";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

// Types
import { Models } from "@/app/lib/definitions";

export default function Builder({ models }: { models: Models }) {
    const [showSummary, setShowSummary] = useState(false);
    const [canvasImage, setCanvasImage] = useState("");
    const [resetComponent, setResetComponent] = useState(0);
    const [frameSetDimensions, setFrameSetDimensions] = useState({});
    const [stemDimensions, setStemDimensions] = useState({});
    const [handleBarDimensions, setHandleBarDimensions] = useState({});
    const [canvasDrawImageProps, setCanvasDrawImageProps] = useState({
        frameSet: {},
        frontWheelSet: {},
        backWheelSet: {},
        stem: {},
        handleBar: {},
        saddle: {},
        tire: {},
    });

    return (
        <div>
            <BikeBuilder
                key={resetComponent}
                canvasDrawImageProps={canvasDrawImageProps}
                setCanvasDrawImageProps={setCanvasDrawImageProps}
                setCanvasImage={setCanvasImage}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                frameSetDimensions={frameSetDimensions}
                setFrameSetDimensions={setFrameSetDimensions}
                stemDimensions={stemDimensions}
                setStemDimensions={setStemDimensions}
                handleBarDimensions={handleBarDimensions}
                setHandleBarDimensions={setHandleBarDimensions}
                models={models}
                setResetComponent={setResetComponent}
            />
            {/* <Summary
                canvasDrawImageProps={canvasDrawImageProps}
                canvasImage={canvasImage}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                frameSetDimensions={frameSetDimensions}
            /> */}
            <ToastContainer
                autoClose={3500}
                position="bottom-left"
            />
        </div>

    );
}
