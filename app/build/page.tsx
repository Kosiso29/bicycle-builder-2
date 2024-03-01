'use client'

import BikeBuilder from "../components/bike-builder";
import Summary from "../components/summary";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
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
        <main className="">
            <BikeBuilder canvasDrawImageProps={canvasDrawImageProps} setCanvasDrawImageProps={setCanvasDrawImageProps} setCanvasImage={setCanvasImage} showSummary={showSummary} setShowSummary={setShowSummary} frameSetDimensions={frameSetDimensions} setFrameSetDimensions={setFrameSetDimensions} />
            <Summary canvasDrawImageProps={canvasDrawImageProps} canvasImage={canvasImage} showSummary={showSummary} setShowSummary={setShowSummary} frameSetDimensions={frameSetDimensions} />
            <ToastContainer autoClose={3500} position="bottom-left" />
        </main>

    );
}
