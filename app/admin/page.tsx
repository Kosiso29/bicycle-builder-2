import { Button } from "@mui/material";
import Link from "next/link";

export default function Admin() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
        <div className="flex gap-10">
            <Link href="/">
                <Button variant="outlined">Back</Button>
            </Link>
            <Link href="/admin">
                <Button variant="contained">Dashboard</Button>
            </Link>
        </div>
    </div>
  )
}
// background-color: #8BC6EC;
// background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
