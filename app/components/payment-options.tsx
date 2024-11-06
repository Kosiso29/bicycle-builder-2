import React, { useState } from 'react';
import { Radio } from "@mui/material";
import PaypalPayment from '@/app/components/paypal-payment';
import Image from "next/image";
import CardPayment from '@/app/components/card-payment';
import GooglePayButton from "@google-pay/button-react";

export default function PaymentOptions({ setBuildProcessStage, totalPrice }: { setBuildProcessStage: any, totalPrice: number }) {
    const [paymentOption, setPaymentOption] = useState("gpay");
    return (
        <div>
            <h2 className='text-lg font-semibold mb-5' >Payment options</h2>
            <div>
                <Radio
                    checked={paymentOption === 'gpay'}
                    onChange={() => setPaymentOption("gpay")}
                    value="gpay"
                    id='gpay'
                    name='payment-option'
                    inputProps={{ 'aria-label': 'gpay' }}
                />
                <label htmlFor="gpay" className='cursor-pointer'>
                    <Image src="/G-Pay.svg" className='!inline-block mr-2' width={50} height={20} alt='' />
                </label>
                {paymentOption === "gpay" &&
                    <div>
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
                                    currencyCode: "SGD",
                                    countryCode: "SG"
                                },
                                shippingAddressRequired: true,
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                                setBuildProcessStage("result");
                            }}
                            existingPaymentMethodRequired={false}
                            buttonSizeMode='fill'
                            style={{ width: "100%" }}
                        />
                    </div>
                }
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
