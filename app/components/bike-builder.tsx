/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

'use client'

import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { RotateLeft as RotateLeftIcon, ThreeSixtyOutlined, ReportProblem } from '@mui/icons-material';
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
import Header from "@/app/components/header";
import CanvasIcons from "@/app/components/canvas-icons";
import BuildStart from "./build-start";
import LoadingBicycle from "@/app/components/loading-bicycle";
import Modal from "@/app/components/modal";
import { useSelector, useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";
import { IRootState } from "@/app/store";
import { useDebouncedCallback, useDebounce } from "@/app/hooks/useDebouncedCallback";

const FRAMESET_PROP = 'frameSet';
const FRONTWHEELSET_PROP = 'frontWheelSet';
const BACKWHEELSET_PROP = 'backWheelSet';
const TIRE_PROP = 'tire';
const STEM_PROP = 'stem';
const HANDLE_BAR_PROP = 'handleBar';
const GROUPSET_DRIVETRAIN_PROP = 'groupSet_drivetrain';
const GROUPSET_SHIFTER_PROP = 'groupSet_shifter';
const SADDLE_PROP = "saddle";

const selectionLevelCategoryMapping = {
    1: [FRAMESET_PROP],
    2: [FRONTWHEELSET_PROP, TIRE_PROP],
    3: [STEM_PROP, HANDLE_BAR_PROP],
    4: [GROUPSET_DRIVETRAIN_PROP],
    5: [SADDLE_PROP],
}

export default function BikeBuilder({
    canvasDrawImageProps, setCanvasDrawImageProps, initialCanvasDrawImageProps, setInitialCanvasDrawImageProps, setCanvasImage, showSummary, setShowSummary,
    frameSetDimensions, setFrameSetDimensions, models, builds, modelsPresets, colorsPresets, colors, accessoryModels, setResetComponent, stemDimensions, setStemDimensions,
    handleBarDimensions, setHandleBarDimensions, addonAccessories, setAddonAccessories, showBilling, totalPrice, setTotalPrice, buildProcessState, setBuildProcessStage, rerender, setRerender, titles
}) {
    const [selectionLevel, setSelectionLevel] = useState(1);
    const [selectionLevelProps, setSelectionLevelProps] = useState([]);
    const [canvasSelectionLevelState, setCanvasSelectionLevelState] = useState(1);
    const [canvasContext, setCanvasContext] = useState(null);
    const [canvasLoading, setCanvasLoading] = useState(false);
    const [linkedComponentDimensions, setLinkedComopnentDimensions] = useState({ hasHandleBar: false }); // this does not affect canvasDrawImageProps
    const [tooltips, setTooltips] = useState({
        key_metrics: "---",
        aerodynamics: "---",
        weight: "---",
        comfort: "---",
        stiffness: "---",
        overall: "---"
    });
    const [canvasSelectorImage, setCanvasSelectorImage] = useState(null);
    const [showSizeChartModal, setShowSizeChartModal] = useState(false);
    const [sizeChartUrl, setSizeChartUrl] = useState("");
    // selectionPresetProps sets the selection template with brand and model after preset selection is made
    const [selectionPresetProps, setSelectionPresetProps] = useState({
        frontWheelSet: {},
        stem: {},
        handleBar: {},
        saddle: {},
        tire: {},
    });

    const newBuildStart = useSelector((state: IRootState) => state.builderReducer.buildStart);
    const selectedFeatureBuild = useSelector((state: IRootState) => state.builderReducer.selectedFeatureBuild);
    const dispatch = useDispatch();

    const componentRefs = useRef([]);
    const selectionPanelRef = useRef(null);
    const debouncedSelectionLevel = useDebounce(selectionLevel, 100);

    const CANVAS_SCALE = 0.75

    const parentProps = {
        setRerender,
        setCanvasDrawImageProps,
        setSelectionLevelProps,
        models,
        selectionLevelProps,
        setStemDimensions,
        setTooltips,
        frameSetDimensions,
        setFrameSetDimensions,
        canvasDrawImageProps,
        setCanvasSelectionLevelState,
        selectionPresetProps,
        setSelectionPresetProps,
        selectionLevel,
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
        setLinkedComopnentDimensions,
        selectedFeatureBuild,
        colorsPresets,
        setCanvasLoading,
        updateSelectionLevel,
        sizeChartUrl,
        setShowSizeChartModal,
        setSizeChartUrl
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
            if (drawImageProps[1].image) {
                const { image, multipleImages, x, y, width, height, globalCompositeOperation, model } = drawImageProps[1];

                canvasContext.globalCompositeOperation = globalCompositeOperation;

                if (placeholdersInCanvasDrawImageProps && (!model || drawImageProps[0] === 'groupSet_shifter')) {
                    placeholdersInCanvasDrawImageProps[drawImageProps[0]] = drawImageProps[1];
                    return;
                }

                if (!doNotRenderCanvasNumbers) {
                    const canvasDrawImagePropsArray = ['frameSet', 'frontWheelSet', 'stem', 'groupSet_drivetrain', 'saddle'];

                    if (canvasSelectorImage) {
                        // canvasContext.font = "1.5rem Arial"
                        canvasNumberData.forEach((canvasNumber, index) => {
                            // if (canvasDrawImageProps[canvasDrawImagePropsArray[index]]?.brand || (index + 1 === 3 && (canvasDrawImageProps.frameSet.linkedStem || canvasDrawImageProps.frameSet.linkedHandleBar))) {
                            //     // canvasContext.beginPath();
                            //     // canvasContext.arc(canvasNumber.x, canvasNumber.y, 20, 0, 2 * Math.PI, false);
                            //     canvasContext.fillStyle = '#1A1A1A';
                            //     // canvasContext.fill();
                            //     // canvasContext.fillStyle = "white";
                            //     // canvasContext.textAlign = "center";
                            //     // canvasContext.textBaseline = "middle";
                            // } else {
                            //     canvasContext.fillStyle = "#888888";
                            // }
                            // canvasContext.fillText(canvasNumber.text, canvasNumber.x, canvasNumber.y);
    
                            canvasContext.drawImage(canvasSelectorImage, canvasNumber.x, canvasNumber.y, 20, 20);
                        });
                    }
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

    function updateSelectionLevel(selectionLevel) {
        setSelectionLevel(Number(selectionLevel));
        componentRefs.current[Number(selectionLevel) - 1].scrollIntoView({ behavior: 'smooth' });
    }

    const handleCanvasEvents = (e, callback) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = 20;
        const height = 30;

        for (const [index, item] of Object.entries(canvasNumberData)) {
            if (x >= (item.x * CANVAS_SCALE) && x <= (item.x * CANVAS_SCALE) + width && y >= ((item.y - 25) * CANVAS_SCALE) && y <= ((item.y - 25) * CANVAS_SCALE) + height) {
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
        setTotalPrice(null);
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

    const reverseLookup = (value: string) => {
        return Object.keys(selectionLevelCategoryMapping).find(key => selectionLevelCategoryMapping[key as keyof typeof selectionLevelCategoryMapping].includes(value)) || null;
    };

    const checkIfAllPropertySelected = () => {
        let allPropertySelected = true;
        const preventScrollIfPropertyNotSelected = (property, category) => {
            if (canvasDrawImageProps[category][property]?.length > 0) {
                if (canvasDrawImageProps[category].model && !canvasDrawImageProps[category].selectedFeatures?.[property]) {
                    // We are subtracting one value to get selectionLevel of previous of previous section
                    // We subtract again to get the index in componentRefs.current. That's why we're subtracting 2.

                    componentRefs.current[reverseLookup(category) - 1].scrollIntoView({ behavior: 'smooth' });
                    toast.warn(`${titles[category]} ${property} need to be selected!`, {
                        progressStyle: { background: "#1A1A1A" },
                        icon: <ReportProblem style={{ color: "#1A1A1A" }} fontSize="small" />,
                    });
                    allPropertySelected = false;
        
                    return;
                }
            }
        }

        Object.values(selectionLevelCategoryMapping).forEach(valueArray => {
            for (const category of valueArray) {
                preventScrollIfPropertyNotSelected('sizes', category);
                preventScrollIfPropertyNotSelected('lengths', category);
                preventScrollIfPropertyNotSelected('ratios', category);
            }
        })

        return allPropertySelected;
    }

    const handleSummary = () => {
        const allPropertySelected = checkIfAllPropertySelected();
        if (allPropertySelected) {
            setImage(true, true);
            const canvas = document.getElementById('canvas');
            setCanvasImage(canvas.toDataURL());
            setImage(false, true);
            setBuildProcessStage("summary");
        }
    }

    const calculateTotalPrice = () => {
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

    // const handleScroll = useDebouncedCallback((event: WheelEvent) => {
    //     const preventScrollIfPropertyNotSelected = (property, category) => {
    //         if (canvasDrawImageProps[category][property]?.length > 0) {
    //             if (canvasDrawImageProps[category].model && !canvasDrawImageProps[category].selectedFeatures?.[property]) {
    //                 if (!componentRefs.current) return;
              
    //                 const { scrollTop, scrollHeight, clientHeight } = componentRefs.current[selectionLevel - 1];
    //                 const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
              
    //                 if (atBottom) {
    //                     event.preventDefault();
    //                     toast.warn(`${titles[category]} ${property} need to be selected!`, {
    //                         progressStyle: { background: "#1A1A1A" },
    //                         icon: <ReportProblem style={{ color: "#1A1A1A" }} fontSize="small" />,
    //                     });
    
    //                     if (selectionPanelRef?.current) {
    //                         selectionPanelRef.current.style.pointerEvents = "none";
    //                         setTimeout(() => {
    //                             if (selectionPanelRef?.current) {
    //                                 selectionPanelRef.current.style.pointerEvents = "";
    //                             }
    //                         }, 2000);
    //                     }
            
    //                     return;
    //                 }
    //             }
    //         }
    //     }

    //     for (const category of selectionLevelCategoryMapping[selectionLevel]) {
    //         preventScrollIfPropertyNotSelected('sizes', category);
    //         preventScrollIfPropertyNotSelected('lengths', category);
    //         preventScrollIfPropertyNotSelected('ratios', category);
    //     }
    // }, 2000);

    const handleBarStemConditions = !stemDimensions.hasHandleBar && (canvasDrawImageProps.stem.image && canvasDrawImageProps.stem.model) && !frameSetDimensions.hasHandleBar;

    useEffect(() => {
        const context = getCanvasContext();
        setCanvasContext(context);
    }, []);

    useEffect(() => {
        if (canvasContext && canvasSelectorImage) {
            renderCanvasPlaceholderImages();
        }
    }, [canvasContext, canvasSelectorImage]);

    useEffect(() => {
        // reset handlebar props when there's no handlebar
        if ((!canvasDrawImageProps.stem.model && canvasDrawImageProps.handleBar.model && !frameSetDimensions.hasStem) || (stemDimensions.hasHandleBar && canvasDrawImageProps.handleBar.model) || (frameSetDimensions.hasHandleBar && canvasDrawImageProps.handleBar.model)) {
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
            }
        }
        calculateTotalPrice();
    }, [rerender]);

    useEffect(() => {
        const CanvasSelectorImage = new Image();
        CanvasSelectorImage.src = "/CanvasSelector.png";
        CanvasSelectorImage.onload = () => {
            setCanvasSelectorImage(CanvasSelectorImage);
        }
    }, [])

    useEffect(() => {
        const preventScrollIfPropertyNotSelected = (property, category) => {
            if (canvasDrawImageProps[category][property]?.length > 0) {
                if (canvasDrawImageProps[category].model && !canvasDrawImageProps[category].selectedFeatures?.[property]) {
                    // We are subtracting one value to get selectionLevel of previous of previous section
                    // We subtract again to get the index in componentRefs.current. That's why we're subtracting 2.
                    componentRefs.current[Number(debouncedSelectionLevel) - 2].scrollIntoView({ behavior: 'smooth' });
                    toast.warn(`${titles[category]} ${property} need to be selected!`, {
                        progressStyle: { background: "#1A1A1A" },
                        icon: <ReportProblem style={{ color: "#1A1A1A" }} fontSize="small" />,
                    });
        
                    return;
                }
            }
        }

        if ((debouncedSelectionLevel - 1) > 0) { // Ensure selectionLevel is not at the first level.
            for (const category of selectionLevelCategoryMapping[debouncedSelectionLevel - 1]) {
                preventScrollIfPropertyNotSelected('sizes', category);
                preventScrollIfPropertyNotSelected('lengths', category);
                preventScrollIfPropertyNotSelected('ratios', category);
            }
        }
    }, [debouncedSelectionLevel])

    // Observer to track when a section becomes visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = componentRefs.current.indexOf(entry.target);
                        setSelectionLevel((index + 1));
                    }
                });
            },
            { threshold: 0.9 } // Trigger when 50% of the section is visible
        );

        componentRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            componentRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    // useEffect(() => {
    //     selectionPanelRef?.current.addEventListener("wheel", handleScroll, { passive: false });

    //     return () => {
    //         if (selectionPanelRef?.current) {
    //             selectionPanelRef?.current.removeEventListener("wheel", handleScroll);
    //         }
    //     };
    // }, [handleScroll, selectionPanelRef]);

    useEffect(() => {
        if (selectionLevel === 1) {
            setSelectionLevelProps([FRAMESET_PROP])
        }
        if (selectionLevel === 2) {
            setSelectionLevelProps([FRONTWHEELSET_PROP, BACKWHEELSET_PROP, TIRE_PROP])
        }
        if (selectionLevel === 3) {
            if ((handleBarStemConditions || frameSetDimensions.hasStem) && !linkedComponentDimensions.hasHandleBar) {
                setSelectionLevelProps([STEM_PROP, HANDLE_BAR_PROP])
            } else {
                setSelectionLevelProps([STEM_PROP])
            }
        }
        if (selectionLevel === 4) {
            setSelectionLevelProps([GROUPSET_DRIVETRAIN_PROP, GROUPSET_SHIFTER_PROP])
        }
        if (selectionLevel === 5) {
            setSelectionLevelProps([SADDLE_PROP])
        }
    }, [setSelectionLevelProps, selectionLevel, handleBarStemConditions, frameSetDimensions, linkedComponentDimensions])

    useEffect(() => {
        dispatch(builderActions.updateloadingScreen(false));
    }, []);

    return (
        <div className={`${buildProcessState !== "build" ? "hidden" : ""} bg-back-color-1 h-screen max-h-screen fade-in-animation`}>
            <div className="text-black">
                <Header />
            </div>
            <div className="flex flex-col justify-evenly mr-[22rem] 2xl:mr-[28rem] h-[calc(100%-4rem)] max-h-[calc(100%-4rem)] pl-6 overflow-auto">
                <div className="flex items-center max-h-[calc(100%-10rem)]">
                    <div className="flex flex-col min-h-full max-h-full py-5 px-2">
                        <Presets parentProps={parentProps} setFrameSetDimensions={setFrameSetDimensions} builds={builds} modelsPresets={modelsPresets} />
                        {/* <Link href="/" className="block mt-2">
                            <Button size="small" variant="outlined">Exit Builder</Button>
                        </Link> */}
                    </div>
                    <div className="relative flex-grow">
                        <div className="relative h-[calc(100vh-9rem)] min-h-[560px] max-h-[620px] w-[calc(((100vh-9rem)*900)/620)] min-w-[810px] max-w-[900px] overflow-hidden flex justify-center items-center ml-auto mr-auto">
                            <canvas id="canvas" style={{ transform: `scale(${CANVAS_SCALE})` }} onMouseMove={handleCanvasHover} onClick={handleCanvasClick} width={950} height={680} />
                            {/* <CanvasIcons /> */} {/* TODO: Enable when it is ready to be implemented */}
                        </div>
                        {
                            canvasLoading &&
                            <div className="absolute inset-0 flex justify-center items-center">
                                <LoadingBicycle />
                            </div>
                        }
                    </div>
                </div>
                <Tooltips tooltips={tooltips} canvasDrawImageProps={canvasDrawImageProps} totalPrice={totalPrice} />
            </div>
            <div id="selection-back-color" className="fixed right-0 top-0 h-[calc(100vh-13rem)] w-[20rem] 2xl:w-[26rem] pb-0 z-10 mt-[6rem] mb-[2rem] mr-[2rem] bg-light-01"></div>
            <div id="selection-overflow-fading-top" className="fixed top-16 z-30 h-[2rem] bg-gradient-to-b from-back-color-1 to-back-color-1-transparent via-back-color-1-transparent right-0 w-[20rem] 2xl:w-[26rem] mr-[2rem]"></div>
            <div id="selection" ref={selectionPanelRef} className={`flex flex-col fixed right-0 top-0 h-[calc(100vh-5rem)] w-[22rem] 2xl:w-[28rem] pb-[4rem] overflow-auto z-20 pt-[4rem] mt-[2rem] mb-[2rem] ${newBuildStart ? "overflow-hidden" : "overflow-y-scroll snap-y snap-mandatory"} pr-[2rem]`}>
                {
                    newBuildStart && <BuildStart />
                }
                <div ref={(el) => (componentRefs.current[0] = el)} className="snap-center min-h-[calc(100vh-13rem)] min-w-full overflow-auto px-5 pb-20">
                    <FrameSet parentProps={parentProps} handleReset={handleReset} show={selectionLevel === 1} setFrameSetDimensions={setFrameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                </div>
                <div ref={(el) => (componentRefs.current[1] = el)} className="snap-center min-h-[calc(100vh-13rem)] min-w-full overflow-auto px-5 pb-20">
                    <WheelSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={45} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Front Wheel Set" />
                    <Tire parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 2} canvasX={540} canvasY={254} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                </div>
                <div ref={(el) => (componentRefs.current[2] = el)} className="snap-center min-h-[calc(100vh-13rem)] min-w-full overflow-auto px-5 pb-20">
                    <Stem parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3} canvasX={600} canvasY={150} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                    <HandleBar parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 3 && (handleBarStemConditions || frameSetDimensions.hasStem) && !linkedComponentDimensions.hasHandleBar} canvasX={635} canvasY={157} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} handleBarShow={(handleBarStemConditions || frameSetDimensions.hasStem) && !linkedComponentDimensions.hasHandleBar} />
                </div>
                <div ref={(el) => (componentRefs.current[3] = el)} className="snap-center min-h-[calc(100vh-13rem)] min-w-full overflow-auto px-5 pb-20">
                    <GroupSet parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 4} canvasX={550} canvasY={265} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} label="Groupset" />
                </div>
                <div ref={(el) => (componentRefs.current[4] = el)} className="snap-center min-h-[calc(100vh-13rem)] min-w-full overflow-auto px-5 pb-20">
                    <Saddle parentProps={parentProps} canvasContext={canvasContext} show={selectionLevel === 5} canvasX={240} canvasY={110} frameSetDimensions={frameSetDimensions} setCanvasDrawImageProps={setCanvasDrawImageProps} />
                </div>
            </div>
            <div id="selection-overflow-fading-bottom" className="fixed top-[calc(100vh-7rem)] z-30 h-[4rem] bg-gradient-to-b from-back-color-1-transparent to-back-color-1 via-back-color-1-transparent right-0 w-[20rem] 2xl:w-[26rem] mr-[2rem]"></div>
            {
                !newBuildStart &&
                <div className="fixed top-[calc(100vh-3rem)] right-0 flex justify-between items-center gap-5 w-[20rem] 2xl:w-[26rem] mr-[2rem]">
                    <Button fullWidth size="small" className="flex gap-2 items-center basis-1/3" variant="text" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} onClick={handleReset}>Reset <ThreeSixtyOutlined /></Button>
                    <Button fullWidth size="small" className="basis-[55%]" variant="contained" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} onClick={handleSummary}>Checkout</Button>
                </div>
            }
            {showSizeChartModal && <Modal src={sizeChartUrl} closeModal={() => { setShowSizeChartModal(false) }} />}
        </div>

    );
}
