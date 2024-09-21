'use client'

import BikeBuilder from "./bike-builder";
import Summary from "./summary";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import Payment from "@/app/components/payment";
import 'react-toastify/dist/ReactToastify.css';

// Types
import { Models } from "@/app/lib/definitions";

export default function Builder({ models, presets, modelsPresets, colors, accessoryModels }: { models: Models, presets: any, modelsPresets: any, colors: any, accessoryModels: any }) {
    const [showSummary, setShowSummary] = useState(false);
    const [showBilling, setShowBilling] = useState(false);
    const [canvasImage, setCanvasImage] = useState("");
    const [resetComponent, setResetComponent] = useState(0);
    const [frameSetDimensions, setFrameSetDimensions] = useState({});
    const [stemDimensions, setStemDimensions] = useState({ hasHandleBar: true });
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
    const [initialCanvasDrawImageProps, setInitialCanvasDrawImageProps] = useState(canvasDrawImageProps);
    const [addonAccessories, setAddonAccessories] = useState({});
    const [totalPrice, setTotalPrice] = useState(null);

    return (
        <div>
            <BikeBuilder
                key={resetComponent}
                canvasDrawImageProps={canvasDrawImageProps}
                setCanvasDrawImageProps={setCanvasDrawImageProps}
                initialCanvasDrawImageProps={initialCanvasDrawImageProps}
                setInitialCanvasDrawImageProps={setInitialCanvasDrawImageProps}
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
                presets={presets}
                modelsPresets={modelsPresets}
                colors={colors}
                accessoryModels={accessoryModels}
                setResetComponent={setResetComponent}
                addonAccessories={addonAccessories}
                setAddonAccessories={setAddonAccessories}
                showBilling={showBilling}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
            />
            <Summary
                canvasDrawImageProps={canvasDrawImageProps}
                canvasImage={canvasImage}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                frameSetDimensions={frameSetDimensions}
                addonAccessories={addonAccessories}
                setAddonAccessories={setAddonAccessories}
                accessoryModels={accessoryModels}
                showBilling={showBilling}
                setShowBilling={setShowBilling}
            />
            <Payment
                showBilling={showBilling}
                setShowBilling={setShowBilling}
                canvasImage={canvasImage}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
            />
            <ToastContainer
                autoClose={3500}
                position="bottom-left"
            />
        </div>

    );
}
