'use client'

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

export default function BuildStart() {
    const dispatch = useDispatch();

    const handleBuildStart = () => {
        dispatch(builderActions.updatebuildStart(false));
    }

    return (
        <div className="absolute inset-0 bg-light-01 z-50 flex h-full items-center p-10 mr-[2rem] 2xl:px-20">
            <div>
                <h1 className="text-3xl font-extrabold mb-4">Hello there,</h1>
                <p className="mb-10">Ready to Customize your <br /> bike?</p>
                <Button variant="contained" className="mb-20" onClick={handleBuildStart}>Lets get started</Button>
            </div>
        </div>
    )
}
