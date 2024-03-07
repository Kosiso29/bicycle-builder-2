// @ts-nocheck
'use client'

import BikeBuilder from "./bike-builder";
import Summary from "./summary";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function Builder({ categories }) {
    const [showSummary, setShowSummary] = useState(false);
    const [canvasImage, setCanvasImage] = useState("");
    const [frameSetDimensions, setFrameSetDimensions] = useState({});
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
            <BikeBuilder canvasDrawImageProps={canvasDrawImageProps} setCanvasDrawImageProps={setCanvasDrawImageProps} setCanvasImage={setCanvasImage} showSummary={showSummary} setShowSummary={setShowSummary} frameSetDimensions={frameSetDimensions} setFrameSetDimensions={setFrameSetDimensions} categories={categories} />
            <Summary canvasDrawImageProps={canvasDrawImageProps} canvasImage={canvasImage} showSummary={showSummary} setShowSummary={setShowSummary} frameSetDimensions={frameSetDimensions} />
            <ToastContainer autoClose={3500} position="bottom-left" />
        </div>

    );
}
