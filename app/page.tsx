'use client'

import BikeBuilder from "./components/bike-builder";
import Summary from "./components/summary";
import NoSSR from "./components/no-ssr";
import { useState } from "react";

export default function Home() {
    const [showSummary, setShowSummary] = useState(false);
    const [canvasImage, setCanvasImage] = useState("");
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
            <NoSSR>
                <BikeBuilder canvasDrawImageProps={canvasDrawImageProps} setCanvasDrawImageProps={setCanvasDrawImageProps} setCanvasImage={setCanvasImage} showSummary={showSummary} setShowSummary={setShowSummary} />
                <Summary canvasDrawImageProps={canvasDrawImageProps} canvasImage={canvasImage} showSummary={showSummary} setShowSummary={setShowSummary} />
            </NoSSR>
        </main>

    );
}
