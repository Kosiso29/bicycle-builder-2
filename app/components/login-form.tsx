/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Loading from "@/app/components/loading";

export default function Login() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setLoading(false);
        }
    }, [errorMessage])

    const handleClick = () => {
        if (email && password) {
            setLoading(true);
        }
    }

    return (
        <form action={dispatch} className="flex flex-col w-[35%] gap-10 bg-blue-100/80 p-16 rounded-3xl">
            <Image
                src="/Cadex_50_Disc_Ultra_F-modified.png"
                width={100}
                height={100}
                className="m-auto rounded-[50%] mb-10"
                alt="logo"
            />
            <TextField id="email" name="email" label="Email" variant="standard" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField id="password" name="password" label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errorMessage && (
                <div
                    className="flex items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <ErrorOutline className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
            )}
            <Button type="submit" onClick={handleClick} aria-disabled={pending} variant="contained" fullWidth>
                Login
                {
                    loading ?
                        <div className="ml-5">
                            <Loading small white />
                        </div>
                        : null
                }
            </Button>
            <Link href="/">
                <Button variant="outlined" fullWidth>Back to home</Button>
            </Link>
        </form>
    );
}
