'use client'

import CTA from "@/app/ui/call-to-action";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function HeroSectionLink() {
    const region = useSelector((state: IRootState) => state.regionReducer.region);

    return (
        <CTA href={`/${region}/build`}>
            START BUILDING YOUR BIKE
        </CTA>
    )
}
