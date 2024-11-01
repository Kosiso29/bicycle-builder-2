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
            <form action={() => setShowPaymentOptions(true)} className='flex flex-col gap-5' autoComplete='on'>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">EMAIL ADDRESS *</label>
                    <TextField size='small' name='email' type='email' autoComplete='email' value={shippingInformation.email} onChange={handleInputChange} />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">FIRST NAME *</label>
                        <TextField size='small' name='first-name' type='text' autoComplete='given-name' value={shippingInformation['first-name']} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">LAST NAME *</label>
                        <TextField size='small' name='last-name' type='text' autoComplete='family-name' value={shippingInformation['last-name']} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">STREET ADDRESS *</label>
                    <TextField size='small' name='address' type='text' autoComplete='address-line1' value={shippingInformation.address} onChange={handleInputChange} />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">CITY *</label>
                        <TextField size='small' name='city' type='text' autoComplete='address-level2' value={shippingInformation.city} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">ZIP/ POSTAL CODE *</label>
                        <TextField size='small' name='postal-code' type='text' autoComplete='postal-code' value={shippingInformation['postal-code']} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">COUNTRY *</label>
                        <TextField size='small' name='country' type='text' autoComplete='country' value={shippingInformation.country} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">STATE/PROVINCE *</label>
                        <TextField size='small' name='state' type='text' autoComplete='address-level1' value={shippingInformation.state} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">PHONE NUMBER *</label>
                    <TextField size='small' name='phone' type='tel' autoComplete='tel' value={shippingInformation.phone} onChange={handleInputChange} />
                </div>
                <h2 className='text-lg font-semibold mt-5'>Shipping Method</h2>
                <div>
                    <Radio id='delivery' checked />
                    <label htmlFor="delivery" className='cursor-pointer'>Free Delivery</label>
                </div>
                <Button type='submit' variant="contained">Proceed to Payment</Button>
            </form>

        </div>
    )
}
