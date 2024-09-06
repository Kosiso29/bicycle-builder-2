const getToolTipValue = (wheelValue: number, frameValue: number, originalValue: number) => {
    if (wheelValue && frameValue) return (wheelValue + frameValue) / 2;

    if (wheelValue) return wheelValue;

    if (frameValue) return frameValue;

    return originalValue
}

export const updateTooltips = (modelData: any, identifier: string, setTooltips: any) => {
    const { model, key_metrics, aerodynamics: aerodynamicsString, weight: weightString, comfort, stiffness, overall: overallString } = modelData;
    const aerodynamics = Number(aerodynamicsString);
    const weight = Number(weightString);
    const overall = Number(overallString);
    if (identifier.includes("Wheel")) {
        setTooltips((prevState: any) => ({ ...prevState, model, key_metrics, aerodynamics: getToolTipValue(aerodynamics, prevState.aerodynamicsFrame, prevState.aerodynamics), weight: getToolTipValue(weight, prevState.weightFrame, prevState.weight), comfort, stiffness, overall: getToolTipValue(overall, prevState.overallFrame, prevState.overall), aerodynamicsWheel: aerodynamics, weightWheel: weight, overallWheel: overall }));
    } else if (identifier === "frameSet") {
        setTooltips((prevState: any) => ({ ...prevState, model, key_metrics, aerodynamics: getToolTipValue(prevState.aerodynamicsWheel, aerodynamics, prevState.aerodynamics), weight: getToolTipValue(prevState.weightWheel, weight, prevState.weight), comfort, stiffness, overall: getToolTipValue(prevState.overallWheel, overall, prevState.overall), aerodynamicsFrame: aerodynamics, weightFrame: weight, overallFrame: overall }));
    } else {
        setTooltips((prevState: any) => ({ ...prevState, model, key_metrics, aerodynamics: prevState.aerodynamics, weight: prevState.weight, comfort, stiffness, overall: prevState.overall }));
    }
    setTooltips((prevState: any) => ({ ...prevState, aerodynamics: prevState.aerodynamics, weight: prevState.weight, overall: prevState.overall }))
}