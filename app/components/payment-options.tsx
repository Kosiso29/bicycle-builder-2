import React, { useState } from 'react';
import { Radio } from "@mui/material";
import CardPayment from '@/app/components/card-payment';

export default function PaymentOptions({ setBuildProcessStage, totalPrice }: { setBuildProcessStage: any, totalPrice: number }) {

    const [paymentOption, setPaymentOption] = useState("credit-card");
    return (
        <div>
            <h2 className='text-lg font-semibold mb-5' >Payment options</h2>
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
