/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { toast } from 'react-toastify';
import Link from "next/link";
import SelectionTabs from "./selection-tabs";
import FrameSet from "./frame-set";
import WheelSet from "./wheel-set";
import Stem from "./stem";
import HandleBar from "./handle-bar";
import Saddle from "./saddle";
import Tire from "./tire";
import SummaryList from "@/app/components/summary-list";

export default function BikeBuilder({
    canvasDrawImageProps, setCanvasDrawImageProps, setCanvasImage, showSummary,
    setShowSummary, frameSetDimensions, setFrameSetDimensions, models, setResetComponent
}) {
    const [selectionLevel, setSelectionLevel] = useState(1);
    const [selectionLevelProps, setSelectionLevelProps] = useState([]);
    const [canvasSelectionLevelState, setCanvasSelectionLevelState] = useState(1);
    const [rerender, setRerender] = useState(false);
    const [removeComponentSelection, setRemoveComponentSelection] = useState(false);
    const [canvasContext, setCanvasContext] = useState(null);
    const [initialCanvasDrawImageProps, setInitialCanvasDrawImageProps] = useState(canvasDrawImageProps);

    const parentProps = {
        setRerender,
        setCanvasDrawImageProps,
        setSelectionLevelProps,
        models,
        selectionLevelProps,
        removeComponentSelection
    }

    const canvasNumberData = [
        { text: "1.", x: 500, y: 150 },
        { text: "2.", x: 450, y: 520 },
        { text: "3.", x: 800, y: 450 },
        { text: "4.", x: 750, y: 120 },
        { text: "5.", x: 200, y: 80 },
        { text: "6.", x: 80, y: 250 },
    ]

    function setImage(doNotRenderCanvasNumbers = false, doNotIncrementCanvasSelectionLevelState = false) {

        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        }
        Object.values(canvasDrawImageProps).forEach((drawImageProps, index) => {
            if (drawImageProps.image) {
                if (index === 3 && frameSetDimensions.hasStem) {
                    return
                }
                if (index === 4 && (frameSetDimensions.hasHandleBar || !canvasDrawImageProps.stem.image)) {
                    return
                }
                const { image, x, y, width, height, globalCompositeOperation } = drawImageProps;

                canvasContext.globalCompositeOperation = globalCompositeOperation;

                if (!doNotRenderCanvasNumbers) {
                    const canvasDrawImagePropsArray = ['frameSet', 'groupSet', 'frontWheelSet', 'stem', 'saddle', 'tire'];

                    canvasContext.font = "1.5rem Arial"
                    canvasNumberData.forEach((canvasNumber, index) => {
                        if (canvasDrawImageProps[canvasDrawImagePropsArray[index]]?.brand) {
                            // canvasContext.beginPath();
                            // canvasContext.arc(canvasNumber.x, canvasNumber.y, 20, 0, 2 * Math.PI, false);
                            canvasContext.fillStyle = 'blue';
                            // canvasContext.fill();
                            // canvasContext.fillStyle = "white";
                            // canvasContext.textAlign = "center";
                            // canvasContext.textBaseline = "middle";
                        } else {
                            canvasContext.fillStyle = "black";
                        }
                        canvasContext.fillText(canvasNumber.text, canvasNumber.x, canvasNumber.y);
                    });
                }


                canvasContext.drawImage(image, x, y, width, height);
                if (drawImageProps.image2) {
                    const { image2, x2, y2, width2, height2 } = drawImageProps;

                    canvasContext.drawImage(image2, x2, y2, width2, height2);
                }
            }
        })

        if (!doNotIncrementCanvasSelectionLevelState) {
            setCanvasSelectionLevelState(prevState => {
                if (prevState === selectionLevel) prevState++;
                return prevState;
            });
        }
    }

    const updateSelectionLevel = (newSelectionLevel) => {
        if (canvasSelectionLevelState > 1) {
            if (canvasSelectionLevelState > (newSelectionLevel - 1)) {
                setSelectionLevel(newSelectionLevel);
            } else if (newSelectionLevel === 2 || newSelectionLevel === 3) {
                setSelectionLevel(newSelectionLevel);
                if (newSelectionLevel > canvasSelectionLevelState) {
                    setCanvasSelectionLevelState(newSelectionLevel);
                }
            } else {
                toast.error("Please either skip or complete selection before proceeding");
            }
        } else {
            toast.error("Frame Set must be selected to proceed");
        }
    }

    const handleCanvasEvents = (e, callback) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = 20;
        const height = 30;

        for (const [index, item] of Object.entries(canvasNumberData)) {
            if (x >= item.x && x <= item.x + width && y >= (item.y - 25) && y <= (item.y - 25) + height) {
                callback(index);
                break;
            }
        }
    }

    const handleCanvasClick = (e) => {
        handleCanvasEvents(e, (index) => {
            if (Number(index) + 1 === 4 && (frameSetDimensions.hasStem)) {
                return;
            }
            updateSelectionLevel(Number(index) + 1);
        })
    }

    const handleCanvasHover = (e) => {
        let imageHovered = false;

        handleCanvasEvents(e, () => imageHovered = true)

        if (imageHovered) {
            e.target.style.cursor = 'pointer';
        } else {
            e.target.style.cursor = 'default';
        }
    }

    const getCanvasContext = () => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        return context;
    }

    const hasParts = (selectionLevel) => {
        if (selectionLevel === 4 && frameSetDimensions.hasHandleBar) {
            return true;
        }
        return false;
    }

    const autoSkipExistingPartsSelection = (currentSelectionLevel, selectionButtonText) => {
        if (hasParts(currentSelectionLevel) && /Next|Skip/i.test(selectionButtonText)) {
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
            if (canvasSelectionLevelState > 1) {
                if (canvasSelectionLevelState > selectionLevel) {
                    newSelectionLevel++;
                    newSelectionLevel = autoSkipExistingPartsSelection(newSelectionLevel, e.target.textContent);
                } else if (selectionLevel === 2) {
                    newSelectionLevel++;
                    if (newSelectionLevel > canvasSelectionLevelState) {
                        setCanvasSelectionLevelState(newSelectionLevel);
                    }
                } else {
                    toast.error("Please either skip or complete selection before proceeding");
                }
            } else {
                toast.error("Frame Set must be selected to proceed");
            }
        }

        if (/Skip/i.test(e.target.textContent)) {
            newSelectionLevel++;
            newSelectionLevel = autoSkipExistingPartsSelection(newSelectionLevel, e.target.textContent);
            if (newSelectionLevel > canvasSelectionLevelState) {
                setCanvasSelectionLevelState(newSelectionLevel);
            }
        }


        setSelectionLevel(newSelectionLevel)
    };

    const handleRemove = () => {
        setCanvasDrawImageProps(prevState => {
            selectionLevelProps.forEach(selectionLevelProp => {
                prevState[selectionLevelProp] = { ...initialCanvasDrawImageProps[selectionLevelProp], x: prevState[selectionLevelProp]?.x, y: prevState[selectionLevelProp]?.y, x2: prevState[selectionLevelProp]?.x2, y2: prevState[selectionLevelProp]?.y2 };
            })
            return prevState;
        });
        setRemoveComponentSelection(prevState => !prevState);
        setRerender(prevState => !prevState);
    }

    const handleReset = () => {
        setCanvasDrawImageProps({
            frameSet: {},
            frontWheelSet: {},
            backWheelSet: {},
            stem: {},
            handleBar: {},
            saddle: {},
            tire: {},
        });
        setSelectionLevel(1);
        setCanvasSelectionLevelState(1);
        setFrameSetDimensions({});
        setResetComponent(prevState => prevState + 1);
    }

    const renderCanvasPlaceholderImages = () => {
        let loadedCount = 0;

        const canvasDrawImagePropsArray = ['frameSet', 'frontWheelSet', 'backWheelSet', 'stem', 'saddle', 'tire'];

        const imageSources = [
            { image: "/PH-Specialized_Allez_Sprint_final.png", x: 200, y: 100, width: 528, height: 374.8259385665529, globalCompositeOperation: 'destination-over' },
            { image: "/PH-ENVE_SES_4.5_F-final.png", x: 553, y: 258, width: 331.73333333333335, height: 331.73333333333335, globalCompositeOperation: 'destination-over' },
            { image: "/PH-ENVE_SES_4.5_R-final.png", x: 48, y: 258, width: 331.73333333333335, height: 331.73333333333335, globalCompositeOperation: 'destination-over' },
            { image: "/PH-ENVE-SES_AR_IN-ROUTE_ONE-PIECE.png", x: 604, y: 141, width: 125.33333333333333, height: 87.16916740217711, globalCompositeOperation: 'destination-over' },
            { image: "/PH-ENVE_X_SELLE_ITALIA_BOOST_SLR.png", x: 258, y: 86.65583333333333, width: 116.26666666666667, height: 23.344166666666666, globalCompositeOperation: 'destination-over' },
            { image: "/PH-Tan_SES31_FullWheel-modified.png", x: 543, y: 247, width: 353.06666666666666, height: 353.06666666666666, x2: 38, y2: 247, width2: 353.06666666666666, height2: 353.06666666666666, globalCompositeOperation: 'destination-over' },
        ]

        imageSources.forEach((src, index) => {
            const image = new Image();

            image.src = src.image;
            image.onload = function () {
                setCanvasDrawImageProps(prevState => ({ ...prevState, [canvasDrawImagePropsArray[index]]: { ...src, image, image2: canvasDrawImagePropsArray[index] === 'tire' ? image : null } }))
                setInitialCanvasDrawImageProps(prevState => ({ ...prevState, [canvasDrawImagePropsArray[index]]: { ...src, image, image2: canvasDrawImagePropsArray[index] === 'tire' ? image : null } }))

                loadedCount++;

                if (loadedCount === imageSources.length) {
                    setFrameSetDimensions({ actualWidth: '990' });
                    setImage(false, true);
                }
            };
        });
    }

    const handleSummary = () => {
        setImage(true, true);
        const canvas = document.getElementById('canvas');
        setCanvasImage(canvas.toDataURL());
        setImage(false, true);
        setShowSummary(true);
    }

    useEffect(() => {
        const context = getCanvasContext();
        setCanvasContext(context);
    }, []);

    useEffect(() => {
        if (canvasContext) {
            renderCanvasPlaceholderImages();
        }
    }, [canvasContext]);

    useEffect(() => {
        if (!canvasDrawImageProps.stem.image) {
            setCanvasDrawImageProps(prevState => ({
                ...prevState,
                handleBar: {}
            }))
        }
        if (Object.keys(frameSetDimensions).length > 0) {
            setImage();
        }
    }, [rerender]);

    return (
        <div className={`${showSummary ? "hidden" : ""}`}>
            <div className="mr-[25rem] h-screen bg-blue-100 w-[calc(100% - 25rem)] p-5 overflow-auto">
                <canvas id="canvas" className="border-black bg-gray-300 border rounded-lg ml-auto mr-auto" onMouseMove={handleCanvasHover} onClick={handleCanvasClick} width={950} height={680} />
                <Link href="/" className="block mt-5">
                    <Button size="small" variant="outlined">Exit Builder</Button>
                </Link>
            </div>
            <div id="selection" className="flex flex-col gap-10 fixed right-0 top-0 h-screen w-[25rem] border-l-8 bg-gray-100 border-gray-400 p-5 pb-0 overflow-auto">
                <div>
                    <SelectionTabs indexArray={frameSetDimensions.hasStem && frameSetDimensions.hasHandleBar ? [1, 2, 3, 5, 6] : [1, 2, 3, 4, 5, 6]} value={selectionLevel} updateSelectionLevel={updateSelectionLevel} canvasSelectionLevelState={canvasSelectionLevelState} setCanvasSelectionLevelState={setCanvasSelectionLevelState} toast={toast} />
                </div>
                <FrameSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 1} setFrameSetDimensions={setFrameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={550} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Group Set" />
                <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3} canvasX={45} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Front Wheel Set" />
                <Stem parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={600} canvasY={150} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <HandleBar parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={635} canvasY={157} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <Saddle parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 5} canvasX={240} canvasY={110} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <Tire parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 6} canvasX={540} canvasY={254} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                {/* <SummaryList key={rerender} small canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} /> */}
                <div className="flex flex-col shadow-[0_-13px_16px_-16px_rgba(0,0,0,0.3)] gap-5 sticky border-gray-400 w-full bg-gray-100 bottom-0 pb-5 pt-2 z-50">
                    <RotateLeftIcon color="error" fontSize="large" onClick={handleReset} className="cursor-pointer self-end" />
                    <div className="flex justify-between">
                        <Button size="small" variant="outlined" onClick={handleSelectionLevel}>Prev</Button>
                        <Button size="small" variant="text" color="error" onClick={handleRemove}>Remove</Button>
                        {
                            selectionLevel < 6 ?
                                <Button size="small" variant="contained" onClick={handleSelectionLevel}>Next</Button> :
                                <Button size="small" variant="contained" onClick={handleSummary}>Summary</Button>
                        }
                    </div>
                    <Button size="small" variant="outlined" disabled={canvasSelectionLevelState > selectionLevel || selectionLevel === 7 || selectionLevel === 1 ? true : false} fullWidth onClick={handleSelectionLevel}>Skip</Button>
                </div>
            </div>
        </div>

    );
}
