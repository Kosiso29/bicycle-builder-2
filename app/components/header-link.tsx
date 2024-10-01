'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function HeaderLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={clsx(
                "rounded-md bg-transparent flex flex-col justify-between items-center gap-3 p-3",
                {
                    "bg-primary-active": pathname === href || (href === "/dashboard/components" && pathname.includes(href))
                }
            )}
        >
            {children}
        </Link>
    )
}
