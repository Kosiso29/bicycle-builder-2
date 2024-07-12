// @ts-nocheck
"use client"

import { Button } from "@mui/material";
import { useState, useRef } from 'react';
import Image from "next/image";
import PropTypes from "prop-types";

export default function FileInput({ files, setFiles, setImage }: { files: string[], setFiles: Function, setImage: Function }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const imageRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        const reader = new FileReader();
        reader.onload = function (e) {
            imageRef.current.setAttribute("src", e.target.result);
            setImage(e.target?.result);
        };
        reader.readAsDataURL(droppedFiles[0])
        setFiles(droppedFiles);
    };

    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const reader = new FileReader();
        reader.onload = function (e) {
            imageRef.current.setAttribute("src", e.target.result);
            setImage(e.target?.result);
        };
        reader.readAsDataURL(selectedFiles[0])
        setFiles(selectedFiles);
    };

    const handleRemoveFile = (index) => {
        setFiles(prevState => {
            prevState[index] = null;
            return prevState.filter(item => item);
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-3">
                <div
                    className={`p-5 text-center cursor-pointer rounded-lg border-2 border-primary ${ isDragging ? 'opacity-50' : '' } border-dashed`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        className='hidden'
                        ref={fileInputRef}
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        multiple
                    />
                    <div>
                        <div>
                            <p>Drag and drop your files here, or click to select</p>
                            <p>.jpg, .jpeg, .webp, .png + more!</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="outlined" onClick={() => fileInputRef.current.click()}>Upload</Button>
                </div>
            </div>
            {files.length > 0 && (
                <div>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <div>
                                    <div className='relative w-full flex justify-center h-[400px] p-5'>
                                        <Image className='!block !static !w-auto !h-full !max-w-full' ref={imageRef} src="" fill style={{ objectFit: "cover" }} alt="bicycle" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

FileInput.propTypes = {
    files: PropTypes.array,
    setFiles: PropTypes.func
}
