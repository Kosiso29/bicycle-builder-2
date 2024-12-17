'use client'

import Form from "@/app/components/form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function FormContainer(props: any) {
    const [showFormForLinkedComponents, setShowFormForLinkedComponents] = useState("");
    const [linkedStemFormData, setLinkedStemFormData] = useState(null);
    const [linkedHandleBarFormData, setLinkedHandleBarFormData] = useState(null);
    const categories = useSelector((state: IRootState) => state.componentsReducer.categories);
    const { product, productModels } = props;
    const action = product ? "Edit" : "Create";
    let linkedFrameComponentProps = null, linkedStemComponentProps = null, linkedHandleBarComponentProps = null;
    const linkedFrameProductModel = productModels?.filter((productModel: any) => categories[productModel.category_id] === "Frame Set")[0];
    if (linkedFrameProductModel) {
        const linkedStemProductModel = productModels.filter((productModel: any) => categories[productModel.category_id] === "Stem")[0];
        const linkedHandleBarProductModel = productModels.filter((productModel: any) => categories[productModel.category_id] === "Handle Bar")[0];
        linkedFrameComponentProps = { linkedComponentModel: linkedFrameProductModel };
        linkedStemComponentProps = { product: linkedStemProductModel, linkedComponentModel: linkedStemProductModel, productModels };
        linkedHandleBarComponentProps = { product: linkedHandleBarProductModel, linkedComponentModel: linkedHandleBarProductModel, productModels };
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [showFormForLinkedComponents])

    return (
        <div>
            <div style={{ display: !showFormForLinkedComponents ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    {action} Component
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form1" linkedStemFormData={linkedStemFormData} linkedHandleBarFormData={linkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} { ...props } { ...linkedFrameComponentProps } /> :
                </div>
            </div>
            <div style={{ display: showFormForLinkedComponents === "Stem" ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    {action} Linked Stem
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form2" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} { ...linkedStemComponentProps } />
                </div>
            </div>
            <div style={{ display: showFormForLinkedComponents === "Handle Bar" ? "block" : "none" }}>
                <h1 className='text-4xl text-primary'>
                    {action} Linked Handle Bar
                </h1>
                <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                    <Form key="Form3" setLinkedStemFormData={setLinkedStemFormData} setLinkedHandleBarFormData={setLinkedHandleBarFormData} showFormForLinkedComponents={showFormForLinkedComponents} setShowFormForLinkedComponents={setShowFormForLinkedComponents} { ...linkedHandleBarComponentProps } />
                </div>
            </div>
        </div>
    );
}
