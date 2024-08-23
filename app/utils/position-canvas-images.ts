// @ts-nocheck

export const positionCanvasImages = (values, identifier, canvasDrawImageProps, setCanvasDrawImageProps, frameSetDimensions, stemDimensions) => {

    const componentsWithOffsets = ["frameSet", "stem", "handleBar"];

    const getGroupsetOffsets = (groupSetOffset, hasHandleBar) => {
        if (identifier === "frameSet" && (hasHandleBar || frameSetDimensions.hasHandleBar)) {
            return groupSetOffset;
        }
        if (identifier === "stem" && (hasHandleBar || stemDimensions.hasHandleBar)) {
            return groupSetOffset;
        }
        if (identifier === "handleBar") {
            return groupSetOffset;
        }
    };

    const getHandleBarCalculation = (handleBar, prevState, axisLength, stemAxis, hasStem, hasHandleBar) => {
        if (identifier === "frameSet" && hasStem && !hasHandleBar) {
            return handleBar;
        }
        // frameset without stem selected, and canvas has stem already selected
        if (identifier === "frameSet" && !hasStem && canvasDrawImageProps.stem.model) {
            return stemAxis + (prevState.handleBar['stemHandleBar' + axisLength.toUpperCase()] ?? 0);
        }
        // if (identifier === "frameSet" && !hasStem) {
        //     return stemAxis + handleBar;
        // }
        if (identifier === "stem" && !hasHandleBar) {
            return prevState.stem[axisLength] + handleBar;
        }
        return prevState.handleBar[axisLength]
    }

    const getShifterCalculation = (groupSet_shifter, prevState, axisLength, stemAxis, handleBarAxis, hasHandleBar, hasStem) => {
        const handleBarShifter = prevState.groupSet_shifter['handleBarShifter' + axisLength.toUpperCase()];
        const handleBarShifterShifted = handleBarShifter ? handleBarShifter - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0) : 0;
        if (identifier === 'frameSet') {
            if (!hasHandleBar && canvasDrawImageProps.stem.model && hasStem) {
                if (stemDimensions.hasHandleBar) {
                    return (stemAxis ?? prevState.stem[axisLength]) + prevState.groupSet_shifter['stemShifter' + axisLength.toUpperCase()] - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0);
                }
                return prevState.stem[axisLength] + axisLength === 'x' ? 38 : 2 + handleBarShifterShifted;
            }
            if (!hasStem && !stemDimensions.hasHandleBar) {
                return (stemAxis ?? prevState.stem[axisLength]) + (prevState.handleBar['stemHandleBar' + axisLength.toUpperCase()] ?? 0) + handleBarShifterShifted;
            }
            if (!hasStem && stemDimensions.hasHandleBar) {
                return (stemAxis ?? prevState.stem[axisLength]) + prevState.groupSet_shifter['stemShifter' + axisLength.toUpperCase()] - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0);
            }
            if (hasStem && !hasHandleBar) {
                return handleBarAxis + handleBarShifterShifted;
            }
            return groupSet_shifter - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0)
        }
        if ((identifier === 'stem' && hasHandleBar && !frameSetDimensions.hasStem) || (identifier === 'handleBar' && !frameSetDimensions.hasHandleBar && !stemDimensions.hasHandleBar)) {
            return prevState[identifier][axisLength] + (groupSet_shifter ?? 0) - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0);
        }
        if (identifier === 'stem' && !hasHandleBar) {
            return prevState[identifier][axisLength] + handleBarAxis + handleBarShifterShifted;
        }
        if (identifier.includes('groupSet')) {
            if (!frameSetDimensions.hasHandleBar && !stemDimensions.hasHandleBar) {
                return prevState.handleBar[axisLength] + handleBarShifterShifted;
            } else if (!frameSetDimensions.hasStem && !frameSetDimensions.hasHandleBar && stemDimensions.hasHandleBar) {
                return prevState.stem[axisLength] + prevState.groupSet_shifter['stemShifter' + axisLength.toUpperCase()] - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0);
            } else if (frameSetDimensions.hasHandleBar) {
                return prevState.frameSet['groupSet_shifter' + axisLength.toUpperCase()] - (axisLength === 'y' ? prevState.groupSet_shifter.height : 0);
            }
        }

        return prevState.groupSet_shifter[axisLength]
    }

    const hasHandleBar = values?.hasHandleBar;
    const hasStem = values?.hasStem;
    const stemX = values?.stemX;
    const stemY = values?.stemY;
    const handleBarX = values?.handleBarX;
    const handleBarY = values?.handleBarY;
    const saddleX = values?.saddleX;
    const saddleY = values?.saddleY;
    const frontWheelSetX = values?.frontWheelSetX;
    const frontWheelSetY = values?.frontWheelSetY;
    const backWheelSetX = values?.backWheelSetX;
    const backWheelSetY = values?.backWheelSetY;
    const groupSet_drivetrainX = values?.groupSet_drivetrainX;
    const groupSet_drivetrainY = values?.groupSet_drivetrainY;
    const groupSet_shifterX = getGroupsetOffsets(values?.groupSet_shifterX, hasHandleBar);
    const groupSet_shifterY = getGroupsetOffsets(values?.groupSet_shifterY, hasHandleBar);

    // console.log('offsets', identifier, hasHandleBar, hasStem, stemX, stemY, handleBarX, handleBarY, saddleX, saddleY,
    //     frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY, groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY)

    setCanvasDrawImageProps(prevState => {
        return {
            ...prevState,
            stem: {
                ...prevState.stem,
                x: stemX ? stemX : prevState.stem.x,
                y: stemY ? stemY : prevState.stem.y
            },
            handleBar: {
                ...prevState.handleBar,
                x: getHandleBarCalculation(handleBarX, prevState, 'x', stemX, hasStem, hasHandleBar),
                y: getHandleBarCalculation(handleBarY, prevState, 'y', stemY, hasStem, hasHandleBar),
                stemHandleBarX: identifier === "stem" && handleBarX ? handleBarX : prevState.handleBar.stemHandleBarX,
                stemHandleBarY: identifier === "stem" && handleBarY ? handleBarY : prevState.handleBar.stemHandleBarY,
            },
            saddle: {
                ...prevState.saddle,
                x: saddleX ? saddleX : prevState.saddle.x,
                y: saddleY ? saddleY - prevState.saddle.height : prevState.saddle.y
            },
            frontWheelSet: {
                ...prevState.frontWheelSet,
                x: frontWheelSetX ? frontWheelSetX : prevState.frontWheelSet.x,
                y: frontWheelSetY ? frontWheelSetY : prevState.frontWheelSet.y
            },
            backWheelSet: {
                ...prevState.backWheelSet,
                x: backWheelSetX ? backWheelSetX : prevState.backWheelSet.x,
                y: backWheelSetY ? backWheelSetY : prevState.backWheelSet.y
            },
            tire: {
                ...prevState.tire,
                x: frontWheelSetX ? frontWheelSetX - 10 : prevState.tire.x,
                y: frontWheelSetY ? frontWheelSetY - 11 : prevState.tire.y,
                x2: backWheelSetX ? backWheelSetX - 10 : prevState.tire.x2,
                y2: backWheelSetY ? backWheelSetY - 11 : prevState.tire.y2
            },
            groupSet_drivetrain: {
                ...prevState.groupSet_drivetrain,
                x: groupSet_drivetrainX ? groupSet_drivetrainX : prevState.groupSet_drivetrain.x,
                y: groupSet_drivetrainY ? groupSet_drivetrainY : prevState.groupSet_drivetrain.y,
            },
            groupSet_shifter: {
                ...prevState.groupSet_shifter,
                x: getShifterCalculation(groupSet_shifterX, prevState, 'x', stemX, handleBarX, hasHandleBar, hasStem),
                y: getShifterCalculation(groupSet_shifterY, prevState, 'y', stemY, handleBarY, hasHandleBar, hasStem),
                stemShifterX: identifier === "stem" && groupSet_shifterX ? groupSet_shifterX : prevState.groupSet_shifter.stemShifterX,
                stemShifterY: identifier === "stem" && groupSet_shifterY ? groupSet_shifterY : prevState.groupSet_shifter.stemShifterY,
                handleBarShifterX: identifier === "handleBar" && groupSet_shifterX ? groupSet_shifterX : prevState.groupSet_shifter.handleBarShifterX,
                handleBarShifterY: identifier === "handleBar" && groupSet_shifterY ? groupSet_shifterY : prevState.groupSet_shifter.handleBarShifterY,
            },
        }
    });
}