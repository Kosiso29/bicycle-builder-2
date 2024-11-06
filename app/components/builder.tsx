'use client'

import BikeBuilder from "./bike-builder";
import Summary from "./summary";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import Payment from "@/app/components/payment";
import 'react-toastify/dist/ReactToastify.css';
import PaymentResult from "@/app/components/payment-result";

// Types
import { Models } from "@/app/lib/definitions";

export default function Builder({ models, builds, modelsPresets, colorsPresets, colors, accessoryModels }: { models: Models, builds: any, modelsPresets: any, colorsPresets: any, colors: any, accessoryModels: any }) {
    const [buildProcessState, setBuildProcessStage] = useState("build")
    const [showSummary, setShowSummary] = useState(false);
    const [showBilling, setShowBilling] = useState(false);
    const [canvasImage, setCanvasImage] = useState("");
    const [resetComponent, setResetComponent] = useState(0);
    const [frameSetDimensions, setFrameSetDimensions] = useState({});
    const [stemDimensions, setStemDimensions] = useState({ hasHandleBar: true });
    const [handleBarDimensions, setHandleBarDimensions] = useState({});
    const [canvasDrawImageProps, setCanvasDrawImageProps] = useState<any>({
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
    const [rerender, setRerender] = useState(false);
    const [totalPrice, setTotalPrice] = useState<any>(null);
    
    useEffect(() => {
        const calculateTotalPrice = () => {
            const componentsPrice: any = Object.keys(canvasDrawImageProps).reduce((acc: any, key) => {
                if (key !== "backWheelSet" && key !== "groupSet_shifter") {
                    acc.push(canvasDrawImageProps[key]);
                }
                return acc;
            }, []).reduce((acc: any, item: any) => {
                if (item.price) {
                    acc = (parseFloat(acc) + parseFloat(item.price)).toFixed(2);
                }
                return acc;
            }, 0);
            const accessoriesPrice: any = Object.values(addonAccessories).reduce((acc: any, value: any) => {
                acc = (parseFloat(acc) + parseFloat(value.price)).toFixed(2);
                return acc;
            }, 0);
            setTotalPrice(parseFloat(componentsPrice) + parseFloat(accessoriesPrice));
        }
        calculateTotalPrice();
    }, [rerender, addonAccessories, canvasDrawImageProps])

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
                builds={builds}
                modelsPresets={modelsPresets}
                colorsPresets={colorsPresets}
                colors={colors}
                accessoryModels={accessoryModels}
                setResetComponent={setResetComponent}
                addonAccessories={addonAccessories}
                setAddonAccessories={setAddonAccessories}
                showBilling={showBilling}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                buildProcessState={buildProcessState}
                setBuildProcessStage={setBuildProcessStage}
                rerender={rerender}
                setRerender={setRerender}
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
                buildProcessState={buildProcessState}
                setBuildProcessStage={setBuildProcessStage}
                totalPrice={totalPrice}
            />
            <Payment
                showBilling={showBilling}
                setShowBilling={setShowBilling}
                canvasImage={canvasImage}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                buildProcessState={buildProcessState}
                setBuildProcessStage={setBuildProcessStage}
            />
            <PaymentResult
                buildProcessState={buildProcessState}
                setBuildProcessStage={setBuildProcessStage}
                totalPrice={totalPrice}
            />
            <ToastContainer
                autoClose={3500}
                position="bottom-left"
            />
        </div>

    );
}
