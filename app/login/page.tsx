'use client'

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <main className="h-screen bg-[url('/bicycle-bg.jpeg')] bg-cover bg-center">
            <div className="h-full flex justify-center items-center">
                <div className="flex flex-col w-[35%] gap-10 bg-blue-100/80 p-16 rounded-3xl">
                    <Image
                        src="/Cadex_50_Disc_Ultra_F-modified.png"
                        width={100}
                        height={100}
                        className="m-auto rounded-[50%] mb-10"
                        alt="logo"
                    />
                    <TextField id="standard-basic" label="Username" variant="standard" type="email" value={email} placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="standard-basic" label="Password" variant="standard" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Link href="/dashboard">
                        <Button variant="contained" fullWidth>Login</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outlined" fullWidth>Back to home</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
