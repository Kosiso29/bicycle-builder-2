'use client'

import Link from "next/link";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

export default function CallToAction({ href, type, children }: { href: string, type?: any, children: React.ReactNode }) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(builderActions.updatebuildStart(true));
        dispatch(builderActions.updateloadingScreen(true));
    }
    
    return (
        <Link href={href} onClick={handleClick} className='inline-flex gap-2 bg-white text-black rounded-none py-4 px-4 md:px-8' type={type}>
            {children}
        </Link>
    )
}
