import { CancelOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";

export default function KeyMetrics({ modelInfo, setModalInfo }: { modelInfo: string, setModalInfo: React.Dispatch<React.SetStateAction<string | null>> }) {
    const keyMetricsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (keyMetricsRef.current && !keyMetricsRef.current.contains(e.target)) {
                setModalInfo(null);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [keyMetricsRef, setModalInfo])

    return (
        <div ref={keyMetricsRef} className="fixed right-96 top-[15vh] w-[40rem] h-[60vh] bg-white pl-5 pr-12 pt-5 py-10 rounded-lg fade-in-animation">
            <div className="w-full h-full pr-5 overflow-auto scrollbar-always-visible">
                <p className="whitespace-pre-wrap">{modelInfo}</p>
            </div>
            <CancelOutlined onClick={() => setModalInfo(null)} className="absolute top-5 right-5 cursor-pointer text-primary hover:opacity-50 active:text-primary-active" />
        </div>
    )
}
