"use client"

import { Button } from "@mui/material";
import { ExtensionOutlined, Build } from "@mui/icons-material";
import { useState } from "react";
import FileInput from "../ui/file-input";
import { getChatCompletion } from "../openai/openai";
import Loading from "@/app/components/loading";
import Link from "next/link";

export default function BikeUpload() {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState("");
    const [chatCompletion, setChatCompletion] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {

        setLoading(true);
        const newChatCompletion: any = await getChatCompletion(image);
        setLoading(false);
    
        setChatCompletion(newChatCompletion);
        console.log('newChatCompletion', JSON.stringify(newChatCompletion), chatCompletion?.choices[0].message.content || "");

    }

    const chatCompletionContent = chatCompletion?.choices[0].message.content;

    return (
        <div>
            <div className="flex flex-col gap-5 fixed right-0 top-0 h-screen w-[22rem] border-l-8 bg-gray-100 border-gray-400 p-5 pb-10 overflow-auto">
                <h1 className="text-3xl font-semibold">Specifications</h1>
                {
                    chatCompletionContent && Object.entries(JSON.parse(chatCompletionContent)).map((item: any) => (
                        <p key={item[0]}>
                            <h1 className="text-xl font-semibold">{item[0].charAt(0).toUpperCase() + item[0].substring(1)}</h1>
                            <ul>
                                <li><span className="font-semibold">Brand: </span>{ item[1].brand }</li>
                                <li><span className="font-semibold">Model: </span>{ item[1].model }</li>
                            </ul>
                        </p>
                    ))
                }
            </div>
            <div className="flex flex-col justify-evenly items-center mr-[22rem] h-screen w-[calc(100% - 22rem)] overflow-auto p-10">
                <FileInput files={files} setFiles={setFiles} setImage={setImage} />
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        <Button variant="outlined" className="flex justify-between items-center gap-3" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} disabled={files.length === 0} onClick={handleClick}>
                            Get Component Parts
                            <ExtensionOutlined fontSize="small" />
                        </Button>
                        {
                            loading ?
                                <div className="ml-5">
                                    <Loading small />
                                </div>
                                : null
                        }
                    </div>
                    <Link href="/build">
                        <Button variant="contained" className="flex justify-between items-center gap-3 ml-10" sx={{ "&:disabled": { cursor: "not-allowed", pointerEvents: "all !important" } }} disabled={!chatCompletionContent}>
                            Build
                            <Build fontSize="small" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
