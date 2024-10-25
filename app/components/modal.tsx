import Image from "next/image";
import { CloseOutlined } from "@mui/icons-material";
import Loading from "@/app/components/loading";
import { useState } from "react";

export default function Modal({ src, closeModal }: { src: string, closeModal: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
        <div className="fixed inset-0 flex justify-center items-center z-[100]">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)] z-0" onClick={closeModal}></div>
            <div className="max-h-[80vh] max-w-[80vw] z-10">
                {!imageLoaded && <div className="absolute inset-0 flex justify-center items-center w-full h-full"><Loading white /></div>}
                <Image className='!block !static !min-h-[50vh] !w-auto !h-full !max-h-[80vh] !max-w-[80vw]' src={src} fill style={{ objectFit: "cover" }} alt="size chart" onLoad={() => setImageLoaded(true)} />
            </div>
            <div className="absolute right-28 top-7 text-white">
                <CloseOutlined onClick={closeModal} className="cursor-pointer text-5xl hover:text-back-color active:text-primary" />
            </div>
        </div>
    )
}
