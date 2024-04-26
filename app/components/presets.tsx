import { Button } from "@mui/material";

export default function Presets({ parentProps }: { parentProps: any }) {
    const { models, setCanvasDrawImageProps, setFrameSetDimensions, setRerender, frameSetDimensions } = parentProps;

    const getPresetComponents = (preset: string) => {
        const filteredPresets = models.filter((item: any) => item?.[preset]);
        console.log('filteredPresets', filteredPresets);
        let loadedCount = 0;

        // Frame Set
        const frameSetImage = new Image();

        const frameSetData = filteredPresets.filter((item: any) => item.category === 'Frame Set')?.[0];
        frameSetImage.src = frameSetData.src;
        frameSetImage.onload = function () {
            const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY, hasStem, hasHandleBar, actualWidth, brand, model, price } = frameSetData;

            const offsets = { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY };
            const height = (frameSetImage?.naturalHeight * (528 / frameSetImage?.naturalWidth));

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                frameSet: { ...prevState.frameSet, image: frameSetImage, height, brand, model, price },
                frontWheelSet: { ...prevState.frontWheelSet, x: frontWheelSetX, y: frontWheelSetY },
                backWheelSet: { ...prevState.backWheelSet, x: backWheelSetX, y: backWheelSetY },
                stem: { ...prevState.stem, x: stemX, y: stemY },
                handleBar: { ...prevState.handleBar, x: stemX + 30, y: stemY + 2 },
                saddle: { ...prevState.saddle, x: saddleX, y: saddleY - prevState.saddle.height },
                tire: { ...prevState.tire, x: frontWheelSetX - 11, y: frontWheelSetY - 11, x2: backWheelSetX - 11, y2: backWheelSetY - 11 }
            }));

            loadedCount++;
            setFrameSetDimensions({ width: 528, height, actualWidth, ...offsets, hasStem, hasHandleBar, brand, model, price });
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        // Front Wheel Set
        const frontWheelImage = new Image();

        const frontWheelData = filteredPresets.filter((item: any) => item.category === 'Front Wheel Set')?.[0];
        frontWheelImage.src = frontWheelData.src;

        frontWheelImage.onload = function () {
            const { actualWidth, brand, model, price } = frontWheelData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = frontWheelImage?.naturalHeight * (width / frontWheelImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                frontWheelSet: { ...prevState.frontWheelSet, image: frontWheelImage, width, height, brand, model, price, globalCompositeOperation: 'destination-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        // Back Wheel Set
        const backWheelImage = new Image();

        const backWheelData = filteredPresets.filter((item: any) => item.category === 'Back Wheel Set')?.[0];
        backWheelImage.src = backWheelData.src;

        backWheelImage.onload = function () {
            const { actualWidth, brand, model, price } = backWheelData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = backWheelImage?.naturalHeight * (width / backWheelImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                backWheelSet: { ...prevState.backWheelSet, image: backWheelImage, width, height, brand, model, globalCompositeOperation: 'destination-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        // STEM
        const stemImage = new Image();

        const stemData = filteredPresets.filter((item: any) => item.category === 'Stem')?.[0];
        stemImage.src = stemData.src;

        stemImage.onload = function () {
            const { actualWidth, brand, model, price } = stemData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = stemImage?.naturalHeight * (width / stemImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                stem: { ...prevState.stem, image: stemImage, width, height, brand, model, price, globalCompositeOperation: 'source-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        // HANDLE BAR
        const handleBarImage = new Image();

        const handleBarData = filteredPresets.filter((item: any) => item.category === 'Handle Bar')?.[0];
        handleBarImage.src = handleBarData.src;

        handleBarImage.onload = function () {
            const { actualWidth, brand, model, price } = handleBarData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = handleBarImage?.naturalHeight * (width / handleBarImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                handleBar: { ...prevState.handleBar, image: handleBarImage, width, height, brand, model, price, globalCompositeOperation: 'source-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        // SADDLE
        const saddleImage = new Image();

        const saddleData = filteredPresets.filter((item: any) => item.category === 'Saddle')?.[0];
        saddleImage.src = saddleData.src;

        saddleImage.onload = function () {
            const { actualWidth, brand, model, price } = saddleData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = saddleImage?.naturalHeight * (width / saddleImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                saddle: { ...prevState.saddle, image: saddleImage, width, height, brand, model, price, globalCompositeOperation: 'source-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };

        filteredPresets.filter((item: any) => item.category !== 'Frame Set').forEach((item: any) => {
            const saddleImage = new Image();

            saddleImage.src = item.src;

            const canvasProp = item.category.split(" ").map((item: any, index: number) => index === 0 ? item.toLowerCase() : item).join("").replace("y", "i");
            // console.log('canvasProp', canvasProp);

            saddleImage.onload = function () {
                const { actualWidth, brand, model, price } = saddleData;
                const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
                const height = saddleImage?.naturalHeight * (width / saddleImage?.naturalWidth);

                setCanvasDrawImageProps((prevState: any) => ({
                    ...prevState,
                    [canvasProp]: { ...prevState.saddle, image: saddleImage, image2: canvasProp === 'tire' ? saddleImage : undefined, width, height, brand, model, price, globalCompositeOperation: /tire|wheel/i.test(canvasProp) ? 'destination-over' : 'source-over' },
                }));

                loadedCount++;
                // setRerender((prevState: any) => !prevState);

                if (loadedCount === filteredPresets.length) {
                    setRerender((prevState: any) => !prevState);
                }
            };

        })

        // TYRES
        const tireImage = new Image();

        const tireData = filteredPresets.filter((item: any) => item.category === 'Tyre')?.[0];
        tireImage.src = tireData.src;

        tireImage.onload = function () {
            const { actualWidth, brand, model, price } = tireData;
            const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
            const height = tireImage?.naturalHeight * (width / tireImage?.naturalWidth);

            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                tire: { ...prevState.tire, image: tireImage, image2: tireImage, width, height, brand, model, price, globalCompositeOperation: 'destination-over' },
            }));

            loadedCount++;
            // setRerender((prevState: any) => !prevState);

            if (loadedCount === filteredPresets.length) {
                setRerender((prevState: any) => !prevState);
            }
        };
    }

    const presets = () => {
        return [
            { title: "Aerodynamics", buttonText: "build preset", onClick: () => { getPresetComponents("best_aerodynamics"); } },
            { title: "Lightweight", buttonText: "build preset", onClick: () => { getPresetComponents("best_lightweight"); } },
        ]
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">Presets</h1>
            {
                presets()?.map((item: any) => (
                    <div key={item.title}>
                        <h2 className="mb-2">{item.title}</h2>
                        <Button size="small" variant="contained" onClick={item.onClick}>{item.buttonText}</Button>
                    </div>
                ))
            }
        </div>
    )
}
