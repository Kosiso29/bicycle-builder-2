import React from 'react';
import HeaderLink from "@/app/components/header-link";
import { PersonOutline, HelpOutline } from "@mui/icons-material";
import Link from 'next/link';

const headerData = [
    { name: "Featured builds", href: "/build"},
    { name: "About Us", href: "/"},
]

export default function Header({ textColor, padding }: { textColor?: string, padding?: string }) {
    return (
        <div className='absolute flex items-center justify-between gap-5 top-0 left-0 h-16 w-full wrapper-padding' style={{ color: textColor || "black", paddingLeft: padding, paddingRight: padding }}>
            <div className='flex items-center gap-5'>
                <div className='font-bold text-2xl'>
                    <HeaderLink href="/">
                        BIKE BUILDER
                    </HeaderLink>
                </div>
                <div className='flex'>
                    {
                        headerData.map(data => {
                            return (
                                <HeaderLink key={data.name} href={data.href}>
                                    {data.name}
                                </HeaderLink>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex gap-3 text-inherit'>
                <Link href="/login">
                    <PersonOutline />
                </Link>
                <HelpOutline />
            </div>
        </div>
    )
}
