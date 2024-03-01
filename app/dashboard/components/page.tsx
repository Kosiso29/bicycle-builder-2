import { Button } from "@mui/material";
import Link from "next/link";

export default function Dashboard() {

    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex gap-10">
                <Link href="/login">
                    <Button variant="outlined">Logout</Button>
                </Link>
                <Link href="/dashboard/components">
                    <Button variant="contained">Components</Button>
                </Link>
            </div>
        </main>
    );
}
