'use client'

import { Button } from "@mui/material";
import { useState } from "react";

export default function BuildStart() {
    const [buildStartClicked, setBuildStartClicked] = useState(false);

    const handleBuildStart = () => {
        setBuildStartClicked(true);
        localStorage.removeItem("firstBuildPageOpening");
    }

    if (localStorage?.getItem("firstBuildPageOpening") !== "yes" || buildStartClicked) {
        return null;
    }

    return (
        <div className="absolute inset-0 bg-white z-50 flex items-center p-10">
            <div>
                <h1 className="text-3xl font-extrabold mb-4">Hello there,</h1>
                <p className="mb-10">Ready to Customize your <br /> bike?</p>
                <Button variant="contained" className="mb-20" onClick={handleBuildStart}>Lets get started</Button>
            </div>
        </div>
    )
}
