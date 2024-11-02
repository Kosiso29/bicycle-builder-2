import React from 'react';
import { Button } from "@mui/material";

export default function PaypalPayment({ setBuildProcessStage }: { setBuildProcessStage: any }) {
    return (
        <div className='my-2'>
            <Button fullWidth variant="contained" onClick={() => setBuildProcessStage("result")}>Proceed to Paypal</Button>
        </div>
    )
}
