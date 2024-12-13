'use client'

import Form from "@/app/components/form";
import { useEffect, useState } from "react";

export default function FormContainer() {
    const [showFormForLinkedComponents, setShowFormForLinkedComponents] = useState("");
    const [linkedStemFormData, setLinkedStemFormData] = useState(null);
    const [linkedHandleBarFormData, setLinkedHandleBarFormData] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [showFormForLinkedComponents])

    return (
        <div>
            <div style={{ display: !showFormForLinkedComponents ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    Create Component
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form1" linkedStemFormData={linkedStemFormData} linkedHandleBarFormData={linkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} /> :
                </div>
            </div>
            <div style={{ display: showFormForLinkedComponents === "Stem" ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    Create Linked Stem
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form2" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} />
                </div>
            </div>
            <div style={{ display: showFormForLinkedComponents === "Handle Bar" ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    Create Linked Handle Bar
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form3" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} />
                </div>
            </div>
        </div>
    );
}
