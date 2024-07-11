"use client"

import { Button } from "@mui/material";
import { useState } from "react";
import FileInput from "../ui/file-input";
import { getChatCompletion } from "../openai/openai";
import Loading from "@/app/components/loading";

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
        console.log('newChatCompletion', JSON.stringify(newChatCompletion));

    }

    return (
        <div>
            <div className="flex flex-col gap-10 fixed right-0 top-0 h-screen w-[22rem] border-l-8 bg-gray-100 border-gray-400 p-5 pb-0 overflow-auto">
                <p>{ chatCompletion?.choices[0].message.content }</p>
            </div>
            <div className="flex flex-col justify-evenly mr-[22rem] h-screen bg-blue-100 w-[calc(100% - 22rem)] overflow-auto p-10">
                <h1 className="text-5xl font-[600] text-center">Upload your bicycle image</h1>
                <FileInput files={files} setFiles={setFiles} setImage={setImage} />
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        <Button variant="outlined" onClick={handleClick}>Get Component Parts</Button>
                        {
                            loading ?
                                <div className="ml-5">
                                    <Loading small />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
