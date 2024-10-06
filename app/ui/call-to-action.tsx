'use client'

import React, { useState } from 'react';
import Link from "next/link";
import Loading from "@/app/components/loading";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

export default function CallToAction({ href, type, children }: { href: string, type?: any, children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => {
        setLoading(true);
        dispatch(builderActions.updatebuildStart(true));
    }
    
    return (
        <Link href={href} onClick={handleClick} className='inline-flex gap-2 bg-white text-black rounded-none py-4 px-8' type={type}>
            {children}
            {loading && <span className='self-center'><Loading small /></span>}
        </Link>
    )
}
