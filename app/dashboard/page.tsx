'use client'

import { Button } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const models = useSelector((state: any) => state.componentsReducer.models);
    console.log('models dashboard', models);

    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex gap-10">
                <Link href="/login">
                    <Button variant="outlined">Logout</Button>
                </Link>
                <Link href="/dashboard">
                    <Button variant="contained">Dashboard</Button>
                </Link>
            </div>
        </main>
    );
}
