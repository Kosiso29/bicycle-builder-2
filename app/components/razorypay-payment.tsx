// @ts-nocheck
'use client'

import React from 'react';
import NextImage from "next/image";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

const RazorpayCheckout = ({ totalPrice, setBuildProcessStage }: { totalPrice: number, setBuildProcessStage: any }) => {
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);

    const loadRazorpay = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: totalPrice * 100,
                currency: currencyCode,
                name: 'Cyke',
                description: 'Test Transaction',
                image: 'https://www.cyke.life/Bike-Loading.svg',
                handler: (response: any) => {
                    console.log('Payment successful!', response);
                    setBuildProcessStage("result");
                },
                prefill: {
                    name: 'Your Name',
                    email: 'your-email@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Corporate Office Address',
                },
                theme: {
                    color: '#1A1A1A',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };
    };

    return (
        <div className="min-w-[48%] min-h-[3rem]">
            <button
                onClick={loadRazorpay}
                className="flex justify-center items-center bg-razorpay-orange min-h-[3rem] w-full h-full text-white px-6 py-3 rounded-md font-semibold shadow-md bg-blue-600 hover:bg-blue-500 transition duration-300 space-x-2"
            >
                <NextImage
                    src="/Razorpay-White.png"
                    alt="Razorpay"
                    width={96}
                    height={96}
                />
            </button>
        </div>
    );
};

export default RazorpayCheckout;
