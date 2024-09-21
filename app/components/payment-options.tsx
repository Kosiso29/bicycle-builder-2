import React, { useState } from 'react';
import { Radio } from "@mui/material";
import PaypalPayment from '@/app/components/paypal-payment';
import Image from "next/image";
import CardPayment from '@/app/components/card-payment';

export default function PaymentOptions() {
    const [paymentOption, setPaymentOption] = useState("");
    return (
        <div>
            <h2 className='text-lg font-semibold mb-5' >Payment options</h2>
            <div>
                <Radio
                    checked={paymentOption === 'paypal'}
                    onChange={() => setPaymentOption("paypal")}
                    value="paypal"
                    id='paypal'
                    name='payment-option'
                    inputProps={{ 'aria-label': 'paypal' }}
                />
                <label htmlFor="paypal" className='cursor-pointer'>
                    <Image src="/Paypal.png" className='!inline-block mr-2' width={40} height={20} alt='' />
                    Paypal
                </label>
                {paymentOption === "paypal" && <PaypalPayment />}
            </div>
            <div>
                <Radio
                    checked={paymentOption === 'credit-card'}
                    onChange={() => setPaymentOption("credit-card")}
                    value="credit-card"
                    id='credit-card'
                    name='payment-option'
                    inputProps={{ 'aria-label': 'credit-card' }}
                />
                <label htmlFor="credit-card" className='cursor-pointer'>Credit or Debit Card</label>
                {paymentOption === "credit-card" && <CardPayment />}
            </div>
        </div>
    )
}
