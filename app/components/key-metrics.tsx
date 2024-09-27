import { CancelOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";

export default function KeyMetrics({ modelInfo, setModalInfo }: { modelInfo: { model: string, key_metrics: string }, setModalInfo: React.Dispatch<React.SetStateAction<string | null>> }) {
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
        <div ref={keyMetricsRef} className="fixed right-96 2xl:right-[28rem] top-[15vh] w-[40rem] h-[60vh] bg-white pl-5 pr-12 pt-6 py-10 rounded-lg fade-in-animation">
            <span className="absolute -right-2 top-[50%] w-0 h-0 border-l-[15px] border-t-[10px] border-b-[10px] border-transparent border-l-white"></span>
            <div className="w-full h-full pr-5 overflow-auto scrollbar-always-visible">
                <h1 className="text-xl font-bold mb-2">{ modelInfo.model }</h1>
                <p className="whitespace-pre-wrap">{modelInfo.key_metrics}</p>
            </div>
            <CancelOutlined onClick={() => setModalInfo(null)} className="absolute top-5 right-3 cursor-pointer text-primary hover:opacity-50 active:text-primary-active" />
        </div>
    )
}
