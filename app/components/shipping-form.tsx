import React from 'react';
import { TextField, Radio, Button } from "@mui/material";

export default function ShippingForm({ setShowPaymentOptions, shippingInformation, setShippingInformation }: { setShowPaymentOptions: any, shippingInformation: any, setShippingInformation: any }) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInformation((prevState: any) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    return (
        <div>
            <h2 className='text-lg font-semibold mb-5'>Shipping Address</h2>
            <form action="" className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">EMAIL ADDRESS *</label>
                    <TextField size='small' name='email' value={shippingInformation.email} onChange={handleInputChange} />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">FIRST NAME *</label>
                        <TextField size='small' name='firstName' value={shippingInformation.firstName} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">LAST NAME *</label>
                        <TextField size='small' name='lastName' value={shippingInformation.lastName} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">STREET ADDRESS *</label>
                    <TextField size='small' name='street' value={shippingInformation.street} onChange={handleInputChange} />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">CITY *</label>
                        <TextField size='small' name='city' value={shippingInformation.city} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">ZIP/ POSTAL CODE *</label>
                        <TextField size='small' name='zip' value={shippingInformation.zip} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">COUNTRY *</label>
                        <TextField size='small' name='country' value={shippingInformation.country} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">STATE/PROVINCE *</label>
                        <TextField size='small' name='state' value={shippingInformation.state} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">PHONE NUMBER *</label>
                    <TextField size='small' name='phone' value={shippingInformation.phone} onChange={handleInputChange} />
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
