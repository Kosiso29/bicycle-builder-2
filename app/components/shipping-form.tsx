import React from 'react';
import { TextField, Radio, Button } from "@mui/material";

export default function ShippingForm({ setShowPaymentOptions }: { setShowPaymentOptions: any }) {
    return (
        <div>
            <h2 className='text-lg font-semibold mb-5'>Shipping Address</h2>
            <form action="" className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">EMAIL ADDRESS *</label>
                    <TextField size='small' />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">FIRST NAME *</label>
                        <TextField size='small' />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">LAST NAME *</label>
                        <TextField size='small' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">STREET ADDRESS *</label>
                    <TextField size='small' />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">CITY *</label>
                        <TextField size='small' />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">ZIP/ POSTAL CODE *</label>
                        <TextField size='small' />
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">COUNTRY *</label>
                        <TextField size='small' />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">STATE/PROVINCE *</label>
                        <TextField size='small' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">PHONE NUMBER *</label>
                    <TextField size='small' />
                </div>
                <h2 className='text-lg font-semibold mt-5'>Shipping Method</h2>
                <div>
                    <Radio id='delivery' checked />
                    <label htmlFor="delivery" className='cursor-pointer'>Standard Delivery $58</label>
                </div>
                <Button variant="contained" onClick={() => setShowPaymentOptions(true)}>Proceed to Payment</Button>
            </form>

        </div>
    )
}
