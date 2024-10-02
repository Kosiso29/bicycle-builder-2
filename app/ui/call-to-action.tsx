'use client'

import React, { useState } from 'react';
import Link from "next/link";
import Loading from "@/app/components/loading";

export default function CallToAction({ href, type, children }: { href: string, type?: any, children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        localStorage.setItem("firstBuildPageOpening", "yes");
    }
    
    return (
        <Link href={href} onClick={handleClick} className='inline-flex gap-2 bg-white text-black rounded-none py-4 px-8' type={type}>
            {children}
            {loading && <span className='self-center'><Loading small /></span>}
        </Link>
    )
}
