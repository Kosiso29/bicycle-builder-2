'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";
import clsx from "clsx";

export default function HeaderLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
        if (pathname.includes(href)) {
            e.preventDefault();
            window.location.reload();
        }
        if (link === "/featured-builds" || link === "/build") {
            dispatch(builderActions.updateloadingScreen(true));
        }
    }

    return (
        <Link
            href={href}
            className={clsx(
                "relative rounded-md bg-transparent flex flex-col justify-between items-center gap-3 p-3",
                {
                    "bg-primary-active": pathname === href || (href === "/dashboard/components" && pathname.includes(href))
                }
            )}
            onClick={(e) => handleLinkClick(e, href)}
        >
            {children}
        </Link>
    )
}
