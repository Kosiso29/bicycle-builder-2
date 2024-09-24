// import { OpenInNew } from "@mui/icons-material";
import Modal from "@/app/components/modal";
import { useState } from "react";

export default function SizeChart({ size_chart_url }: { size_chart_url: string }) {
    const [showModal, setShowModal] = useState(false);

    if (!size_chart_url) {
        return null;
    }

    return (
        <div>
            <button onClick={() => { setShowModal(true) }} className="flex gap-1 underline items-center text-primary">
                what is my size?
                {/* <OpenInNew fontSize="inherit" /> */}
            </button>
            {showModal && <Modal src={size_chart_url} setShowModal={setShowModal} />}
        </div>
    )
}
