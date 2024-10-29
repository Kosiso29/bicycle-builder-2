import React from 'react';
import HeaderLink from "@/app/components/header-link";
import { PersonOutline, HelpOutline } from "@mui/icons-material";
import Link from 'next/link';
import NextImage from "next/image";

const headerData = [
    { name: "Featured builds", href: "/featured-builds"},
    { name: "About Us", href: "/about-us"},
]

const headerDataConfigurator = [
    { name: "Configure", href: "/"},
    { name: "Featured builds", href: "/featured-builds"},
    { name: "Support", href: "/"},
]

export default function Header({ textColor, padding }: { textColor?: string, padding?: string }) {
    return (
        <div className={`h-16 z-50 ${textColor === "white" ? "bg-primary relative" : "border-b border-b-back-color bg-back-color-1 relative"}`}>
            <div className={`absolute flex items-center justify-between gap-5 top-0 left-1/2 transform -translate-x-1/2 h-16 w-full wrapper`} style={{ color: textColor || "black", paddingLeft: padding, paddingRight: padding }}>
                <div className='flex items-center gap-5'>
                    <div className='font-bold text-2xl [&>a]:pl-0'>
                        <HeaderLink href="/">
                            Cyke
                        </HeaderLink>
                    </div>
                    <div className='flex'>
                        {
                            (textColor === "white" ? headerData : headerDataConfigurator).map(data => {
                                return (
                                    <HeaderLink key={data.name} href={data.href}>
                                        {data.name}
                                        {data.name.includes("Featured") && textColor !== "white" && <NextImage className='absolute -right-[4px] top-[7px]' src="/Yellow-Star.png" width={18} height={18} alt='' />}
                                    </HeaderLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex gap-4 text-inherit'>
                    {
                        textColor === "white" ?
                            <>
                                <Link href="/login">
                                    <PersonOutline />
                                </Link>
                                <HelpOutline />
                            </> :
                            <>
                                <span className='flex items-center gap-1 hover:cursor-pointer'>
                                    SGD
                                    <NextImage src="/SGD-Icon.svg" width={24} height={24} alt='' />
                                </span>
                                <NextImage className='hover:cursor-pointer' src="/Profile-Icon.svg" width={30} height={30} alt='' />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
