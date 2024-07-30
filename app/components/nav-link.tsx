'use client'

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({ href, onClick, type, children }: { href: string, onClick: any, type: any, children: React.ReactNode }) {
    const pathname = usePathname();
    if (type) {
        return (
            <button
                className={clsx(
                    "text-white rounded-md hover:bg-primary-hover flex flex-col justify-between items-center h-16 w-20 gap-1 p-3 text-[.55rem]",
                    {
                        "bg-primary-active": pathname === href || (href === "/dashboard/components" && pathname.includes(href))
                    }
                )}
                type={type}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

    return (
        <Link
            href={href}
            className={clsx(
                "text-white rounded-md hover:bg-primary-hover flex flex-col justify-between items-center h-16 w-20 gap-1 p-3 text-[.55rem]",
                {
                    "bg-primary-active": pathname === href || (href === "/dashboard/components" && pathname.includes(href))
                }
            )}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}
