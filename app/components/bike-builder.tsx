/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from 'react-toastify';
import Link from "next/link";
import FrameSet from "./frame-set";
import WheelSet from "./wheel-set";
import Stem from "./stem";
import HandleBar from "./handle-bar";
import Saddle from "./saddle";
import Tire from "./tire";

export default function BikeBuilder({ canvasDrawImageProps, setCanvasDrawImageProps, setCanvasImage, showSummary, setShowSummary, frameSetDimensions, setFrameSetDimensions }) {
    const [selectionLevel, setSelectionLevel] = useState(1);
    const [canvasSelectionLevelState, setCanvasSelectionLevelState] = useState(1);
    const [rerender, setRerender] = useState(false);
    const [canvasContext, setCanvasContext] = useState(null);

    const parentProps = {
        setRerender,
        setCanvasDrawImageProps
    }

    function setImage() {

        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        }
        Object.values(canvasDrawImageProps).forEach((drawImageProps, index) => {
            if (drawImageProps.image) {
                if (index === 3 && frameSetDimensions.hasStem) {
                    return
                }
                if (index === 4 && frameSetDimensions.hasHandleBar) {
                    return
                }
                const { image, x, y, width, height, globalCompositeOperation } = drawImageProps;

                canvasContext.globalCompositeOperation = globalCompositeOperation;

                canvasContext.drawImage(image, x, y, width, height);
                if (drawImageProps.image2) {
                    const { image2, x2, y2, width2, height2 } = drawImageProps;

                    canvasContext.drawImage(image2, x2, y2, width2, height2);
                }
            }
        })

        setCanvasSelectionLevelState(prevState => {
            if (prevState === selectionLevel) prevState++;
            return prevState;
        });
    }

    const getCanvasContext = () => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        return context;
    }

    const hasParts = (selectionLevel) => {
        if (selectionLevel === 4 && frameSetDimensions.hasStem) {
            return true;
        }
        if (selectionLevel === 5 && frameSetDimensions.hasHandleBar) {
            return true;
        };
        return false;
    }

    const autoSkipExistingPartsSelection = (currentSelectionLevel, selectionButtonText) => {
        if (hasParts(currentSelectionLevel) && /Next/i.test(selectionButtonText)) {
            currentSelectionLevel++;
            if (currentSelectionLevel > canvasSelectionLevelState) {
                setCanvasSelectionLevelState(currentSelectionLevel);
            };
            return autoSkipExistingPartsSelection(currentSelectionLevel, selectionButtonText);
        }
        if (hasParts(currentSelectionLevel) && /Prev/i.test(selectionButtonText)) {
            currentSelectionLevel--;
            return autoSkipExistingPartsSelection(currentSelectionLevel, selectionButtonText);
        }
        return currentSelectionLevel;
    }

    const handleSelectionLevel = (e) => {
        let newSelectionLevel = selectionLevel;
        if (/Prev/i.test(e.target.textContent)) {
            if (selectionLevel > 1) {
                newSelectionLevel--;
                newSelectionLevel = autoSkipExistingPartsSelection(newSelectionLevel, e.target.textContent);
            } else {
                toast.info("You're at the beginning");
            }
        }

        if (/Next/i.test(e.target.textContent)) {
            if (canvasSelectionLevelState > selectionLevel) {
                newSelectionLevel++;
                newSelectionLevel = autoSkipExistingPartsSelection(newSelectionLevel, e.target.textContent);
            } else {
                toast.error("Please either skip or complete selection before proceeding");
            }
        }

        if (/Skip/i.test(e.target.textContent)) {
            newSelectionLevel++;
            setCanvasSelectionLevelState(prevState => {
                prevState++;
                return prevState
            });
        }


        setSelectionLevel(newSelectionLevel)
    };

    const handleRemove = () => {
        const removeKey = Object.keys(canvasDrawImageProps).filter((_, index) => index + 1 === selectionLevel);

        setCanvasDrawImageProps(prevState => {
            prevState[removeKey] = {};
            return prevState;
        });
        setRerender(prevState => !prevState);
    }

    const handleSummary = () => {
        const canvas = document.getElementById('canvas');
        setCanvasImage(canvas.toDataURL());
        setShowSummary(true);
    }

    useEffect(() => {
        const context = getCanvasContext();
        setCanvasContext(context);
    }, [])

    useEffect(() => {
        if (Object.keys(frameSetDimensions).length > 0) {
            setImage();
        }
    }, [rerender]);

    return (
        <div className={`${showSummary ? "hidden" : ""}`}>
            <div className="h-screen mr-[25rem] bg-blue-100 w-[calc(100% - 25rem)] p-5">
                <canvas id="canvas" className="border-black bg-gray-300 border rounded-lg ml-auto mr-auto" width={1000} height={680} />
                <Link href="/" className="block mt-4">
                    <Button variant="outlined">Back</Button>
                </Link>
            </div>
            <div className="flex flex-col justify-between fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5 overflow-auto">
                <FrameSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 1} setFrameSetDimensions={setFrameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={550} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Front Wheel Set" />
                <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3} canvasX={45} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Back Wheel Set" />
                <Stem parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={600} canvasY={150} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <HandleBar parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 5} canvasX={635} canvasY={157} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <Saddle parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 6} canvasX={240} canvasY={110} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <Tire parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 7} canvasX={540} canvasY={254} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <div className="flex flex-col gap-5 mt-5">
                    <div className="flex justify-between">
                        <Button variant="outlined" onClick={handleSelectionLevel}>Prev</Button>
                        <Button variant="text" color="error" onClick={handleRemove}>Remove</Button>
                        {
                            selectionLevel < 7 ?
                                <Button variant="contained" onClick={handleSelectionLevel}>Next</Button> :
                                <Button variant="contained" onClick={handleSummary}>Summary</Button>
                        }
                    </div>
                    <Button variant="outlined" disabled={canvasSelectionLevelState > selectionLevel || selectionLevel === 7 ? true : false} fullWidth onClick={handleSelectionLevel}>Skip</Button>
                </div>
            </div>
        </div>

    );
}
