// import { OpenInNew } from "@mui/icons-material";
import Modal from "@/app/components/modal";
import { useState } from "react";

export default function SizeChart({ sizeChartUrl, setSizeChartUrl, setShowSizeChartModal }: { sizeChartUrl: string, setSizeChartUrl: Function, setShowSizeChartModal: Function }) {

    if (!sizeChartUrl) {
        return null;
    }

    return (
        <div>
            <button onClick={() => { setSizeChartUrl(sizeChartUrl), setShowSizeChartModal(true) }} className="flex gap-1 underline items-center text-primary">
                What is my size?
                {/* <OpenInNew fontSize="inherit" /> */}
            </button>
        </div>
    )
}
