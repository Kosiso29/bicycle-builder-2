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
            <div className="" style={{ display: !showFormForLinkedComponents ? "block" : "none" }}>
                <Form key="Form1" linkedStemFormData={linkedStemFormData} linkedHandleBarFormData={linkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} /> :
            </div>
            <div style={{ display: showFormForLinkedComponents === "Stem" ? "block" : "none" }}>
                <Form key="Form2" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} />
            </div>
            <div style={{ display: showFormForLinkedComponents === "Handle Bar" ? "block" : "none" }}>
                <Form key="Form3" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} />
            </div>
        </div>
    );
}
