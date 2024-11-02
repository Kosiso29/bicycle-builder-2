import ShippingForm from "@/app/components/shipping-form";
import { ArrowBackIos, EditOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import PaymentOptions from "@/app/components/payment-options";
import Header from "@/app/components/header";
import { useState } from "react";

export default function Payment({ showBilling, setShowBilling, canvasImage, totalPrice, setTotalPrice, buildProcessState, setBuildProcessStage }: { showBilling: any, setShowBilling: any, canvasImage: string, totalPrice: any, setTotalPrice: any, buildProcessState: any, setBuildProcessStage: any }) {
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [shippingInformation, setShippingInformation] = useState({
        email: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        zip: "",
        country: "",
        state: "",
        phone: ""
    });

    const handlePaymentClick = () => {
        if (!showPaymentOptions) {
            setShowPaymentOptions(true);
        }
    }

    if (buildProcessState !== "payment") {
        return null;
    }

    return (
        <div className="bg-[#F0EFEF] min-h-screen">
            <Header />
            <div className="pt-4 pb-20 wrapper">
                <div>
                    <div className='mb-4 -ml-16'>
                        <Button variant="text" onClick={() => setBuildProcessStage("summary")}> <ArrowBackIos /> Back</Button>
                    </div>
                    <h1 className='text-2xl font-bold mb-5'>{showPaymentOptions ? "Payment" : "Shipping"}</h1>
                </div>
                <div className='flex'>
                    <div className='basis-[50%] max-w-[50%]'>
                        {
                            showPaymentOptions ? <PaymentOptions setBuildProcessStage={setBuildProcessStage} /> : <ShippingForm setShowPaymentOptions={setShowPaymentOptions} shippingInformation={shippingInformation} setShippingInformation={setShippingInformation} />
                        }
                    </div>
                    <div className='basis-[50%] flex justify-end'>
                        <div className='flex flex-col gap-6'>
                            <div className="w-[20rem] p-10 bg-[#C4C4C480]">
                                <Image src={canvasImage} style={{ width: "100%", maxWidth: "100%", height: "auto" }} width={0} height={0} alt='' />
                                <div className="flex flex-col gap-3 py-3">
                                    <h2 className="text-lg font-semibold">Billing Summary</h2>
                                    <p className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span className="font-bold">${Math.round(totalPrice)}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Delivery:</span>
                                        <span className="font-bold">Free</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Total:</span>
                                        <span className="font-bold">${totalPrice}</span>
                                    </p>
                                </div>
                                {
                                    showPaymentOptions &&
                                    <div className="flex flex-col gap-3 py-3">
                                        <h2 className="flex justify-between items-center text-lg font-semibold">Shipping to <EditOutlined className="cursor-pointer" fontSize="small" onClick={() => setShowPaymentOptions(false)} /></h2>
                                        <p className="flex justify-between">
                                            {
                                                shippingInformation.street || shippingInformation.city ?
                                                    <span>{shippingInformation.street + " " + shippingInformation.city},</span> : null
                                            }
                                        </p>
                                        <p className="flex justify-between">
                                            {shippingInformation.state && <span>{shippingInformation.state},</span>}
                                        </p>
                                        <p className="flex justify-between">
                                            <span>{shippingInformation.country}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>{shippingInformation.zip}</span>
                                        </p>
                                    </div>
                                }
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
        </div>
    )
}
