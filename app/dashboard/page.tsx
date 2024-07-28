import { Button } from "@mui/material";
import Link from "next/link";
import { signOut } from '@/auth';

export default function Dashboard() {
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex gap-10">
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <Button type="submit" variant="outlined">Logout</Button>
                </form>
                <Link href="/dashboard">
                    <Button variant="contained">Dashboard</Button>
                </Link>
            </div>
        </main>
    );
}
