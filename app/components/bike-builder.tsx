/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { RotateLeft as RotateLeftIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Link from "next/link";
import SelectionTabs from "./selection-tabs";
import FrameSet from "./frame-set";
import GroupSet from "./group-set";
import WheelSet from "./wheel-set";
import Stem from "./stem";
import HandleBar from "./handle-bar";
import Saddle from "./saddle";
import Tire from "./tire";
import Presets from "./presets";
import Tooltips from "./tooltips";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import { positionCanvasImages } from "@/app/utils/position-canvas-images";
import AddonSummary from "./addon-summary";

export default function BikeBuilder({
    canvasDrawImageProps, setCanvasDrawImageProps, initialCanvasDrawImageProps, setInitialCanvasDrawImageProps, setCanvasImage, showSummary, setShowSummary,
    frameSetDimensions, setFrameSetDimensions, models, presets, modelsPresets, colors, accessoryModels, setResetComponent, stemDimensions, setStemDimensions,
    handleBarDimensions, setHandleBarDimensions, addonAccessories, setAddonAccessories, showBilling, totalPrice, setTotalPrice
}) {
    const [selectionLevel, setSelectionLevel] = useState(1);
    const [selectionLevelProps, setSelectionLevelProps] = useState([]);
    const [canvasSelectionLevelState, setCanvasSelectionLevelState] = useState(1);
    const [rerender, setRerender] = useState(false);
    const [canvasContext, setCanvasContext] = useState(null);
    const [linkedComponentDimensions, setLinkedComopnentDimensions] = useState({ hasHandleBar: false }); // this does not affect canvasDrawImageProps
    const [tooltips, setTooltips] = useState({
        key_metrics: "---",
        aerodynamics: "---",
        weight: "---",
        comfort: "---",
        stiffness: "---",
        overall: "---"
    });
    // selectionPresetProps sets the selection template with brand and model after preset selection is made
    const [selectionPresetProps, setSelectionPresetProps] = useState({
        frontWheelSet: {},
        stem: {},
        handleBar: {},
        saddle: {},
        tire: {},
    });

    const parentProps = {
        setRerender,
        setCanvasDrawImageProps,
        setSelectionLevelProps,
        models,
        selectionLevelProps,
        setStemDimensions,
        setTooltips,
        frameSetDimensions,
        canvasDrawImageProps,
        setCanvasSelectionLevelState,
        selectionPresetProps,
        setSelectionPresetProps,
        setSelectionLevel,
        setShowSummary,
        initialCanvasDrawImageProps,
        setInitialCanvasDrawImageProps,
        stemDimensions,
        handleBarDimensions,
        setHandleBarDimensions,
        colors,
        accessoryModels,
        addonAccessories,
        setAddonAccessories,
        setLinkedComopnentDimensions
    }

    const canvasNumberData = [
        { text: "1.", x: 500, y: 150 },
        { text: "2.", x: 80, y: 250 },
        { text: "3.", x: 680, y: 110 },
        { text: "4.", x: 500, y: 520 },
        { text: "5.", x: 200, y: 80 },
    ]

    const canvasPlaceholderImages = {
        frameSet: { image: "/PH-Specialized_Allez_Sprint_final.png", x: 200, y: 100, globalCompositeOperation: 'destination-over' },
        frontWheelSet: { image: "/PH-ENVE_SES_4.5_F-final.png", globalCompositeOperation: 'destination-over' },
        backWheelSet: { image: "/PH-ENVE_SES_4.5_R-final.png", globalCompositeOperation: 'destination-over' },
        stem: { image: "/PH-CADEX-Aero_Integrated_Handlebar.png", globalCompositeOperation: 'destination-over', hasHandleBar: true },
        handleBar: { image: "/PH-Cadex-Race-final.png", x: 638, y: 169, width: 80, height: 85.58692421991084, stemHandleBarX: 38, stemHandleBarY: 2, globalCompositeOperation: 'destination-over' },
        saddle: { image: "/PH-ENVE_X_SELLE_ITALIA_BOOST_SLR.png", x: 258, y: 86.65583333333333, width: 116.26666666666667, height: 23.344166666666666, globalCompositeOperation: 'destination-over' },
        tire: { image: "/PH-Tan_SES31_FullWheel-modified.png", globalCompositeOperation: 'destination-over' },
        // drivetrain actualWidth used is 622mm instead of 722mm
        groupSet_drivetrain: { image: "/PH-Drivetrain_dura-ace_final.png", x: 185, y: 380, width: 331.733333333, height: 136.6176524785, globalCompositeOperation: 'destination-over' },
        groupSet_shifter: { image: "/PH-dura-ace-shifter.png", x: 701, y: 121.859649118, width: 80, height: 96.140350882, stemShifterX: 98, stemShifterY: 76, handleBarShifterX: 50, handleBarShifterY: 70, globalCompositeOperation: 'destination-over' },
    }

    function setImage(doNotRenderCanvasNumbers = false, doNotIncrementCanvasSelectionLevelState = false) {
        const canvasDrawImagePropsOrderArray = ['frameSet', 'groupSet_drivetrain', 'frontWheelSet', 'backWheelSet', 'stem', 'groupSet_shifter', 'handleBar', 'saddle', 'tire'];
        const placeholdersInCanvasDrawImageProps = {};

        const newCanvasDrawImageProps = {};
        
        canvasDrawImagePropsOrderArray.forEach(key => {
            if (canvasDrawImageProps.hasOwnProperty(key)) {
              newCanvasDrawImageProps[key] = canvasDrawImageProps[key];
            }
        })

        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        }
        console.log('canvasDrawImageProps', newCanvasDrawImageProps);
        iterateCanvasDrawImageProps(newCanvasDrawImageProps, doNotRenderCanvasNumbers, placeholdersInCanvasDrawImageProps);
        iterateCanvasDrawImageProps(placeholdersInCanvasDrawImageProps, doNotRenderCanvasNumbers);

        if (!doNotIncrementCanvasSelectionLevelState) {
            setCanvasSelectionLevelState(prevState => {
                if (prevState === selectionLevel) prevState++;
                return prevState;
            });
        }
    }

    function iterateCanvasDrawImageProps(newCanvasDrawImageProps, doNotRenderCanvasNumbers, placeholdersInCanvasDrawImageProps) {
        Object.entries(newCanvasDrawImageProps).forEach((drawImageProps) => {
            if (drawImageProps[0] === "stem" && frameSetDimensions.hasStem) {
                return
            }
            if (drawImageProps[0] === "handleBar" && (frameSetDimensions.hasHandleBar || !canvasDrawImageProps.stem.image || stemDimensions.hasHandleBar)) {
                return
            }
            if (doNotRenderCanvasNumbers && !drawImageProps[1].brand) {
                return;
            }
            if (drawImageProps[1].image) {
                const { image, multipleImages, x, y, width, height, globalCompositeOperation, model } = drawImageProps[1];

                canvasContext.globalCompositeOperation = globalCompositeOperation;

                if (placeholdersInCanvasDrawImageProps && (!model || drawImageProps[0] === 'groupSet_shifter')) {
                    placeholdersInCanvasDrawImageProps[drawImageProps[0]] = drawImageProps[1];
                    return;
                }

                if (!doNotRenderCanvasNumbers) {
                    const canvasDrawImagePropsArray = ['frameSet', 'frontWheelSet', 'stem', 'groupSet_drivetrain', 'saddle'];

                    canvasContext.font = "1.5rem Arial"
                    canvasNumberData.forEach((canvasNumber, index) => {
                        if (canvasDrawImageProps[canvasDrawImagePropsArray[index]]?.brand || (index + 1 === 3 && (canvasDrawImageProps.frameSet.linkedStem || canvasDrawImageProps.frameSet.linkedHandleBar))) {
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


                if (multipleImages) {
                    multipleImages.forEach(imageItem => {
                        canvasContext.globalCompositeOperation = imageItem.globalCompositeOperation
                        canvasContext.drawImage(imageItem.image, x, y, width, height);
                    })
                } else {
                    canvasContext.drawImage(image, x, y, width, height);
                }
                if (drawImageProps[1].image2) {
                    const { image2, x2, y2, width2, height2 } = drawImageProps[1];

                    canvasContext.drawImage(image2, x2, y2, width2, height2);
                }
            }
        })
    }

    const updateSelectionLevel = (newSelectionLevel) => {
        setSelectionLevel(newSelectionLevel);
    }

    const handleCanvasEvents = (e, callback) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = 20;
        const height = 30;

        for (const [index, item] of Object.entries(canvasNumberData)) {
            if (x >= (item.x * 0.9) && x <= (item.x * 0.9) + width && y >= ((item.y - 25) * 0.9) && y <= ((item.y - 25) * 0.9) + height) {
                callback(index);
                break;
            }
        }
    }

    const handleCanvasClick = (e) => {
        handleCanvasEvents(e, (index) => {
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

    const handleSelectionLevel = (e) => {
        let newSelectionLevel = selectionLevel;
        if (/Prev/i.test(e.target.textContent)) {
            newSelectionLevel--;
        }

        if (/Next/i.test(e.target.textContent)) {
            newSelectionLevel++;
        }

        setSelectionLevel(newSelectionLevel)
    };

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
        setStemDimensions({ hasHandleBar: true });
        setResetComponent(prevState => prevState + 1);
        setShowSummary(false);
    }

    const filterComponentData = (filteredModelPlaceholders, componentKey) => {
        return filteredModelPlaceholders.filter(item => {
            const joinedHyphenatedProp = item.category.split(" - ").map((item: any, index: number) => index === 1 ? item.toLowerCase() : item).join("_")

            const canvasProp = joinedHyphenatedProp.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");
            return canvasProp === componentKey;
        })
    }

    const updateCanvasPlaceholderImageDimensions = (filteredModelPlaceholders, image, componentKey, componentData, frameSetActualWidth) => {
        const filteredComponentData = filterComponentData(filteredModelPlaceholders, componentKey);

        if (componentKey === 'frameSet') {
            const { actualWidth, stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                hasStem, hasHandleBar } = filteredComponentData[0];
            const offsets = {
                stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
                groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
                hasStem, hasHandleBar
            };
            setFrameSetDimensions({ ...offsets, actualWidth, width: 528 });
            setCanvasDrawImageProps(prevState => {
                return { ...prevState, [componentKey]: { ...prevState[componentKey], ...offsets } }
            })
        }

        if (filteredComponentData.length > 0) {
            const previewImageWidth = image?.width;
            const previewImageHeight = image?.height;
            const actualWidth = filteredComponentData[0].actualWidth;

            const width = (528 * actualWidth) / frameSetActualWidth;
            const height = previewImageHeight * (width / previewImageWidth);
            componentData.width = width;
            componentData.height = height;

            componentData.previewImageWidth = previewImageWidth;
            componentData.previewImageHeight = previewImageHeight;
            componentData.actualWidth = actualWidth;
            
            if (componentKey === 'tire') {
                componentData.width2 = width;
                componentData.height2 = height;
            }
            if (componentKey === 'stem' || componentKey === 'handleBar') {
                componentData.groupSet_shifterX = filteredComponentData[0].groupSet_shifterX;
                componentData.groupSet_shifterY = filteredComponentData[0].groupSet_shifterY;
            }
            
            positionCanvasImages(filteredComponentData[0], componentKey, canvasPlaceholderImages, setCanvasDrawImageProps, frameSetDimensions, stemDimensions)
        }

    }

    const renderCanvasPlaceholderImages = () => {
        let loadedCount = 0;

        setCanvasDrawImageProps(canvasPlaceholderImages);

        const filteredModelPlaceholders = models.filter(item => {
            switch (item.category + " - " + item.model) {
                case "Frame Set - Allez Sprint":
                    return true;
                case "Group Set - Drivetrain - Dura-Ace Di2":
                    return true;
                case "Group Set - Shifter - Dura-Ace Di2":
                    return true;
                case "Front Wheel Set - SES 4.5":
                    return true;
                case "Back Wheel Set - SES 4.5":
                    return true;
                case "Stem - Aero Integrated Handlebar":
                    return true;
                case "Handle Bar - Race":
                    return true;
                case "Saddle - ENVE X Selle Italia Boost SLR":
                    return true;
                case "Tyre - SES Road":
                    return true;
                default:
                    break;
            }
        });

        const frameSetActualWidth = filterComponentData(filteredModelPlaceholders, "frameSet")[0].actualWidth;

        Object.entries(canvasPlaceholderImages).forEach(entries => {
            const image = new Image();

            image.src = entries[1].image;
            image.crossOrigin = "anonymous";
            image.onload = function () {
                updateCanvasPlaceholderImageDimensions(filteredModelPlaceholders, image, entries[0], entries[1], frameSetActualWidth);
                const returnPrevState = (prevState) => ({ ...prevState, [entries[0]]: { ...entries[1], ...prevState[entries[0]], width: entries[1].width, height: entries[1].height, image, image2: entries[0] === 'tire' ? image : null, width2: entries[0] === 'tire' ? entries[1].width2 : null, height2: entries[0] === 'tire' ? entries[1].height2 : null } }) 
                setCanvasDrawImageProps(prevState => returnPrevState(prevState))

                loadedCount++;

                if (loadedCount === Object.values(canvasPlaceholderImages).length) {
                    // rerun positioning of components whose positions depend on their height.
                    const filteredStemData = filterComponentData(filteredModelPlaceholders, 'stem');
                    positionCanvasImages(filteredStemData[0], 'stem', canvasPlaceholderImages, setCanvasDrawImageProps, frameSetDimensions, stemDimensions)
                    const filteredSaddleData = filterComponentData(filteredModelPlaceholders, 'saddle');
                    positionCanvasImages(filteredSaddleData[0], 'saddle', canvasPlaceholderImages, setCanvasDrawImageProps, frameSetDimensions, stemDimensions)
                    setCanvasDrawImageProps(prevState => {
                        setInitialCanvasDrawImageProps(prevState);
                        return { ...prevState };
                    })

                    setRerender(prevState => !prevState);
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

    const handleBarStemConditions = !stemDimensions.hasHandleBar && (canvasDrawImageProps.stem.image && canvasDrawImageProps.stem.model) && !frameSetDimensions.hasHandleBar;

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
        if (selectionLevel < 6) {
            setShowSummary(false);
        }
    }, [selectionLevel]);

    useEffect(() => {
        // reset handlebar props when there's no handlebar
        if ((!canvasDrawImageProps.stem.model && canvasDrawImageProps.handleBar.model && !frameSetDimensions.hasStem)) {
            setStemDimensions(prevState => ({ ...prevState, hasHandleBar: true }));
            setCanvasDrawImageProps(prevState => ({
                ...prevState,
                handleBar: { ...initialCanvasDrawImageProps.handleBar, x: prevState.handleBar.x, y: prevState.handleBar.y },
                // groupSet_shifter: { ...initialCanvasDrawImageProps.groupSet_shifter, x: prevState.groupSet_shifter.x, y: prevState.groupSet_shifter.y },
            }));
            setRerender(prevState => !prevState);
        }
        if (Object.keys(frameSetDimensions).length > 0) {
            if (canvasSelectionLevelState === 1 && !canvasDrawImageProps.frameSet.model) {
                setImage(false, true);
            } else {
                setImage();
                const componentsPrice = Object.keys(canvasDrawImageProps).reduce((acc, key) => {
                    if (key !== "backWheelSet" && key !== "groupSet_shifter") {
                        acc.push(canvasDrawImageProps[key]);
                    }
                    return acc;
                }, []).reduce((acc, item) => {
                    if (item.price) {
                        acc = (parseFloat(acc) + parseFloat(item.price)).toFixed(2);
                    }
                    return acc;
                }, 0);
                const accessoriesPrice = Object.values(addonAccessories).reduce((acc, value) => {
                    acc = (parseFloat(acc) + parseFloat(value.price)).toFixed(2);
                    return acc;
                }, 0);
                setTotalPrice(parseFloat(componentsPrice) + parseFloat(accessoriesPrice));
            }
        }
    }, [rerender]);

    return (
        <div className={`${showSummary || showBilling ? "hidden" : ""}`}>
            <div className="flex flex-col mr-[22rem] h-screen bg-blue-100 w-[calc(100% - 22rem)] overflow-auto">
                <div className="flex items-stretch">
                    <div className="flex flex-col justify-between bg-gray-100 w-40 border border-black py-5 px-2">
                        <Presets parentProps={parentProps} setFrameSetDimensions={setFrameSetDimensions} presets={presets} modelsPresets={modelsPresets} />
                        <div className="flex justify-center">
                            <Link href="/" className="block mt-5">
                                <Button size="small" variant="outlined">Exit Builder</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="h-[calc(100vh-9rem)] min-h-[560px] max-h-[620px] w-[calc(((100vh-9rem)*900)/620)] min-w-[810px] max-w-[900px] overflow-hidden flex justify-center items-center ml-auto mr-auto">
                        <canvas id="canvas" className="scale-90" onMouseMove={handleCanvasHover} onClick={handleCanvasClick} width={950} height={680} />
                    </div>
                </div>
                <Tooltips tooltips={tooltips} canvasDrawImageProps={canvasDrawImageProps} />
            </div>
            <div id="selection" className="flex flex-col gap-4 fixed right-0 top-0 h-screen w-[22rem] border-l-8 bg-gray-100 border-gray-400 p-5 pb-0 overflow-auto">
                <div>
                    <div className="mt-2 mb-3">
                        <SelectionTabs indexArray={[1, 2, 3, 4, 5]} value={selectionLevel < 6 ? selectionLevel : false} updateSelectionLevel={updateSelectionLevel} canvasSelectionLevelState={canvasSelectionLevelState} setCanvasSelectionLevelState={setCanvasSelectionLevelState} toast={toast} />
                    </div>
                    {
                        showSummary ?
                            <>
                                <div className="flex justify-between pb-3">
                                    <Button size="small" variant="outlined" onClick={() => { setShowSummary(false); setSelectionLevel(prevState => prevState - 1) }}>Back</Button>
                                    <Button size="small" variant="contained">Proceed</Button>
                                </div>
                                <Button size="small" fullWidth variant="outlined">Add to Favourites</Button>
                            </> :
                            <>
                                <div className="flex justify-between py-2">
                                    <Button size="small" variant="outlined" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} disabled={selectionLevel === 1} onClick={handleSelectionLevel}>Prev</Button>
                                    {
                                        selectionLevel < 5 ?
                                            <Button size="small" variant="contained" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} onClick={handleSelectionLevel}>Next</Button> :
                                            <Button size="small" variant="contained" onClick={handleSummary}>Summary</Button>
                                    }
                                </div>
                            </>
                    }
                </div>
                <FrameSet parentProps={parentProps} handleReset={handleReset} show={selectionLevel === 1} setFrameSetDimensions={setFrameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={45} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Front Wheel Set" />
                <Tire parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={540} canvasY={254} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <Stem parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3} canvasX={600} canvasY={150} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <HandleBar parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3 && (handleBarStemConditions || frameSetDimensions.hasStem) && !linkedComponentDimensions.hasHandleBar} canvasX={635} canvasY={157} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                <GroupSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={550} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Groupset" />
                <Saddle parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 5} canvasX={240} canvasY={110} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                {/* {
                    showSummary ? <AddonSummary parentProps={parentProps} /> : null
                } */}
                <div className="flex flex-col justify-self-end mt-auto shadow-[0_-13px_16px_-16px_rgba(0,0,0,0.3)] gap-3 sticky border-gray-400 w-full bg-gray-100 bottom-0 pb-5 pt-2 z-50">
                    <div className='flex justify-between items-center'>
                        <h1 className={`font-bold text-xl`}>Total:</h1>
                        <p className={`text-primary text-md font-bold`}>{totalPrice !== null ? '$ ' + CurrencyFormatter(totalPrice) : "---"}</p>
                        <RotateLeftIcon color="error" fontSize="large" onClick={handleReset} className="cursor-pointer self-end" />
                    </div>
                </div>
            </div>
        </div>

    );
}
