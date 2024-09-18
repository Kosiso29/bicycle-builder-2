import React from 'react';
import Link from "next/link";

export default function CallToAction({ href, type, children }: { href: string, type?: any, children: React.ReactNode }) {
    return (
        <Link href={href} className='inline-block bg-white text-black rounded-none py-4 px-8' type={type}>
            {children}
        </Link>
    )
}
