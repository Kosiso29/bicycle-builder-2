import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {

    return (
        <main className="h-screen flex items-center justify-center bg-blue-100">
            <div className="flex gap-10">
                <Link href="/build">
                    <Button variant="outlined">New Build</Button>
                </Link>
                <Link href="/admin">
                    <Button variant="contained">Admin</Button>
                </Link>
            </div>
        </main>
    );
}
