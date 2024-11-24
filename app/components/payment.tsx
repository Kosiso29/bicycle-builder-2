import ShippingForm from "@/app/components/shipping-form";
import { ArrowBackIos, EditOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import PaymentOptions from "@/app/components/payment-options";
import Header from "@/app/components/header";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paymentActions } from "@/app/store/payment";
import { IRootState } from "@/app/store";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import GooglePayButton from "@google-pay/button-react";
import RazorPayPayment from "@/app/components/razorypay-payment";

export default function Payment({ showBilling, setShowBilling, canvasImage, totalPrice, setTotalPrice, buildProcessState, setBuildProcessStage }: { showBilling: any, setShowBilling: any, canvasImage: string, totalPrice: any, setTotalPrice: any, buildProcessState: any, setBuildProcessStage: any }) {
    // const currencySymbol = useSelector((state: IRootState) => state.regionReducer.currencySymbol);
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);
    const dispatch = useDispatch();

    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [shippingInformation, setShippingInformation] = useState({
        "email": "",
        "first-name": "",
        "last-name": "",
        "address": "",
        "city": "",
        "postal-code": "",
        "country": "",
        "state": "",
        "phone": ""
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
                    {
                        showPaymentOptions ?
                        <h1 className='text-2xl font-bold mb-5'>Payment</h1> :
                        <h1 className='font-semibold mb-5'>EXPRESS CHECKOUT</h1>
                    }
                </div>
                <div className='flex'>
                    <div className='basis-[50%] max-w-[50%]'>
                        {
                            showPaymentOptions ?
                                <PaymentOptions setBuildProcessStage={setBuildProcessStage} totalPrice={totalPrice} /> :
                                <div>
                                    <div className="flex justify-between gap-4 items-center">
                                        {countryCode === "IN" ? 
                                            <RazorPayPayment totalPrice={totalPrice} setBuildProcessStage={setBuildProcessStage} /> :
                                            <div className="flex items-center min-w-[50%]">
                                                <GooglePayButton
                                                    environment='TEST'
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: "CARD",
                                                                parameters: {
                                                                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: "PAYMENT_GATEWAY",
                                                                    parameters: {
                                                                        gateway: "example",
                                                                        gatewayMerchantId: "exampleGatewayMerchantId"
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: "12345678901234567890",
                                                            merchantName: "Demo Merchant"
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: "FINAL",
                                                            totalPriceLabel: "Total",
                                                            totalPrice: totalPrice.toString(),
                                                            currencyCode,
                                                            countryCode
                                                        },
                                                        shippingAddressRequired: true,
                                                        emailRequired: true
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log('load payment data', paymentRequest);
                                                        dispatch(paymentActions.updateEmail(paymentRequest.email));
                                                        setBuildProcessStage("result");
                                                    }}
                                                    existingPaymentMethodRequired={false}
                                                    buttonSizeMode='fill'
                                                    style={{ width: "100%", height: "3rem" }}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <p className="my-4 font-semibold">OR</p>
                                    <ShippingForm setShowPaymentOptions={setShowPaymentOptions} shippingInformation={shippingInformation} setShippingInformation={setShippingInformation} />
                                </div>
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
                                        <span className="font-bold">{ CurrencyFormatter(totalPrice, currencyCode, countryCode) }</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Delivery:</span>
                                        <span className="font-bold">Free</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Total:</span>
                                        <span className="font-bold">{ CurrencyFormatter(totalPrice, currencyCode, countryCode) }</span>
                                    </p>
                                </div>
                                {
                                    showPaymentOptions &&
                                    <div className="flex flex-col gap-3 py-3">
                                        <h2 className="flex justify-between items-center text-lg font-semibold">Shipping to <EditOutlined className="cursor-pointer" fontSize="small" onClick={() => setShowPaymentOptions(false)} /></h2>
                                        <p className="flex justify-between">
                                            {
                                                shippingInformation['address'] || shippingInformation["city"] ?
                                                    <span>{shippingInformation['address'] + " " + shippingInformation["city"]},</span> : null
                                            }
                                        </p>
                                        <p className="flex justify-between">
                                            {shippingInformation["state"] && <span>{shippingInformation["state"]},</span>}
                                        </p>
                                        <p className="flex justify-between">
                                            <span>{shippingInformation.country}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>{shippingInformation["postal-code"]}</span>
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
