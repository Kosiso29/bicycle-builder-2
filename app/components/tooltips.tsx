import { ArrowDownwardOutlined, ArrowUpwardOutlined, EditOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "@/app/ui/progress-bar";
import { Button, TextField } from "@mui/material";

export default function Tooltips({ tooltips, canvasDrawImageProps }: { tooltips: any, canvasDrawImageProps: any }) {
    const [openFullTooltips, setOpenFullToolTips] = useState(false);
    const [buildName, setBuildName] = useState("Unnamed build");
    const [showBuildNameTextField, setShowBuildNameTextField] = useState(false);
    const tooltipsRef = useRef<HTMLDivElement>(null);

    const renderProgressBar = (tooltip: number | string) => {
        return tooltip === "---" ? " " + tooltip : <ProgressBar value={Number(tooltip) * 20} />
    }

    const handleArrowClick = () => {
        setOpenFullToolTips(prevState => !prevState);
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowBuildNameTextField(false);
        }
    }

    useEffect(() => {
        if (openFullTooltips) {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [openFullTooltips])

    return (
        <div ref={tooltipsRef} className="py-3 pl-40 pr-5 pb-5 flex-grow">
            <div className="flex justify-between relative">
                <div className="flex gap-5 items-center max-w-[65%]">
                    {
                        showBuildNameTextField ?
                        <TextField size="small" className="text-2xl font-extrabold" value={buildName} onChange={(e) => setBuildName(e.target.value)} onKeyDown={handleTextFieldKeyDown} /> :
                        <h1 className="flex items-center gap-2 text-2xl font-extrabold">{ buildName }</h1>
                    }
                    {
                        showBuildNameTextField ?
                            <Button variant="contained" onClick={() => setShowBuildNameTextField(false)}>Set</Button> :
                            <EditOutlined className="cursor-pointer" fontSize="small" onClick={() => setShowBuildNameTextField(true)} />
                    }
                    {/* <p>{tooltips.model && tooltips.model + " -"}</p> */}
                    {/* <p className="whitespace-pre-wrap">{openFullTooltips ? tooltips.key_metrics || "---" : tooltips.key_metrics?.split("\n")?.[0] || "---"}</p> */}
                </div>
                {/* <div>
                    <p>Gearing @ 90rpm​</p>
                    <p>Max Speed – 53-11 = xyz​</p>
                    <p>Min Speed  - 39-34 = abc</p>
                </div> */}
                {/* {openFullTooltips ? <ArrowUpwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" /> :
                    <ArrowDownwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" />} */}
                <div className="text-right [&>p]:h-6">
                    <div className="flex justify-end gap-3">
                        <p>Aerodynamics</p>
                        {tooltips.aerodynamics ? renderProgressBar(tooltips.aerodynamics) : "---"}
                    </div>
                    <div className="flex justify-end gap-3">
                        <p>Lightweight</p>
                        {tooltips.weight ? renderProgressBar(tooltips.weight) : "---"}
                    </div>
                    <div className="flex justify-end gap-3">
                        <p>Overall</p>
                        {tooltips.overall ? renderProgressBar(tooltips.overall) : "---"}
                    </div>
                </div>
            </div>
        </div>
    )
}
