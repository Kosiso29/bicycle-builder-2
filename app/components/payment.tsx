import ShippingForm from "@/app/components/shipping-form";
import { ArrowBackIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import PaymentOptions from "@/app/components/payment-options";
import { useState } from "react";

export default function Payment({ showBilling, setShowBilling, canvasImage, totalPrice, setTotalPrice }: { showBilling: any, setShowBilling: any, canvasImage: string, totalPrice: any, setTotalPrice: any }) {
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    const handlePaymentClick = () => {
        if (!showPaymentOptions) {
            setShowPaymentOptions(true);
        }
    }

    if (!showBilling) {
        return null;
    }

    return (
        <div className="bg-[#F0EFEF] min-h-screen pt-4 pb-20">
            <div>
                <div className='mb-4 pl-10'>
                    <Button variant="text" onClick={() => setShowBilling(false)}> <ArrowBackIos /> Back</Button>
                </div>
                <h1 className='text-2xl font-bold pl-32 mb-5'>{ showPaymentOptions ? "Payment" : "Shipping" }</h1>
            </div>
            <div className='flex'>
                <div className='basis-[50%] max-w-[50%] pl-32'>
                    {
                        showPaymentOptions ? <PaymentOptions /> : <ShippingForm setShowPaymentOptions={setShowPaymentOptions} />
                    }
                </div>
                <div className='basis-[50%] flex justify-center'>
                    <div className='flex flex-col gap-6'>
                        <div className="w-[20rem] p-10 bg-[#C4C4C480]">
                            <Image src={canvasImage} style={{ width: "100%", maxWidth: "100%", height: "auto" }} width={0} height={0} alt='' />
                            <div className="flex flex-col gap-3 py-3 px-8">
                                <h2 className="text-lg font-semibold">Billing Summary</h2>
                                <p className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-bold">${ Math.round(totalPrice) }</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Delivery:</span>
                                    <span className="font-bold">$100</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Total:</span>
                                    <span className="font-bold">${ Math.round(totalPrice) + 100 }</span>
                                </p>
                            </div>
                        </div>
                        {
                            !showPaymentOptions &&
                            <div className="flex justify-center mt-5">
                                <Button variant="contained" onClick={handlePaymentClick}>Proceed to Payment</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
