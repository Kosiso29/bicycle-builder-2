/* eslint-disable react-hooks/exhaustive-deps */
import NextImage from "next/image";
import Header from "@/app/components/header";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";
import { IRootState } from "@/app/store";
import Loading from "@/app/components/loading";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";

export default function PaymentResult({ buildProcessState, setBuildProcessStage, totalPrice, canvasDrawImageProps, addonAccessories, titles, canvasImage }: { buildProcessState: any, setBuildProcessStage: any, totalPrice: any, canvasDrawImageProps: any, addonAccessories: any, titles: any, canvasImage: any }) {
    const [testState, setTestState] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const email = useSelector((state: IRootState) => state.paymentReducer.email);
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);
    const firstName = useSelector((state: IRootState) => state.paymentReducer.firstName);
    const address = useSelector((state: IRootState) => state.paymentReducer.address);
    const city = useSelector((state: IRootState) => state.paymentReducer.city);
    const state = useSelector((state: IRootState) => state.paymentReducer.state);
    const country = useSelector((state: IRootState) => state.paymentReducer.country);
    const postalCode = useSelector((state: IRootState) => state.paymentReducer.postalCode);
    const dispatch = useDispatch();

    const handleSendEmail = async () => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        const formattedCanvasDrawImageProps = Object.assign(canvasDrawImageProps, {});
        const formattedAddonAccessories = Object.assign(addonAccessories, {});
        
        Object.entries(formattedCanvasDrawImageProps).forEach((entry: any) => {
            formattedCanvasDrawImageProps[entry[0]].price = CurrencyFormatter(entry[1].price?.toString(), currencyCode, countryCode)
        });

        Object.entries(formattedAddonAccessories).forEach((entry: any) => {
            formattedAddonAccessories[entry[0]].price = CurrencyFormatter(entry[1].price?.toString(), currencyCode, countryCode)
        });

        const order = {
            email,
            totalPrice: CurrencyFormatter(totalPrice, currencyCode, countryCode),
            canvasImage,
            shippingAddress: { firstName, address, city, state, country, postalCode },
            items: {
                canvasDrawImageProps: formattedCanvasDrawImageProps,
                addonAccessories: formattedAddonAccessories,
                titles
            },
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to send email');
            }
            
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (buildProcessState === "result") {
            handleSendEmail();
        }
    }, [buildProcessState])

    if (buildProcessState !== "result") {
        return null;
    }
    
    return (
        <div className="bg-[#F0EFEF] h-screen">
            <Header />
            <div className="flex justify-center h-[calc(100%-4rem)]">
                <div className="mt-32 w-96 text-center">
                    <div className="flex justify-center mb-4">
                        {
                            testState ? 
                                <NextImage src="/Success-Tick.svg" width={76} height={76} alt='' /> :
                                <NextImage src="/Failure-Tick.svg" width={76} height={76} alt='' />
                        }
                    </div>
                    <h1 className="text-2xl font-bold mb-4">
                        {
                            testState ? "Payment Successful" : "Payment Failed"
                        }
                    </h1>
                    <p className="mb-8">
                        {
                            testState ? 
                                `Payment of $${totalPrice} was successfully completed. Your order has been received and is being processed.` :
                                `The payment of $${totalPrice} was not successfully completed. Your order has been received and is being processed.`
                        }
                    </p>

                    <div className="my-4">
                        {loading && <div className="flex justify-center items-center"><p className="flex items-center gap-2 whitespace-nowrap">Sending Order Confirmation Email <Loading small /></p></div>}
                        {success && <p>Order Confirmation Email sent successfully!</p>}
                        {error && <p style={{ color: 'red' }}>Email error: {error}</p>}
                    </div>

                    <Button fullWidth variant="contained" onClick={() => { dispatch(builderActions.updateloadingScreen(true)); window.location.reload() }}>
                        {
                            testState ? "EXPLORE MORE BIKES" : "TRY AGAIN"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}
