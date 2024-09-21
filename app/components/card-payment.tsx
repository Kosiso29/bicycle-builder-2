import React from 'react';
import { TextField, Button } from "@mui/material";

export default function CardPayment() {
    return (
        <div className='pt-4'>
            <form action="" className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2 font-medium text-md'>
                    <label htmlFor="">CARD NUMBER *</label>
                    <TextField size='small' placeholder='XXXX - XXXX - XXXX - XXXX' />
                </div>
                <div className="flex justify-between gap-5">
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">EXPIRATION DATE *</label>
                        <TextField size='small' placeholder='MM/YY' />
                    </div>
                    <div className='flex flex-col gap-2 font-medium text-md flex-grow'>
                        <label htmlFor="">SECURITY CODE *</label>
                        <TextField size='small' placeholder='CVC' />
                    </div>
                </div>
                <Button variant="contained">Proceed to Payment</Button>
            </form>
        </div>
    )
}
