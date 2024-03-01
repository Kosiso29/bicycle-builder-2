// @ts-nocheck
import React from 'react';
import NavLink from "./nav-link";
import Image from "next/image";
// import { HomeModernIcon, ClockIcon, TableCellsIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { DashboardOutlined, ExtensionOutlined, GroupOutlined, GroupAddOutlined, LogoutOutlined } from '@mui/icons-material';

const sideBarData = [
    { name: "DASHBOARD", href: "/dashboard", icon: DashboardOutlined },
    { name: "COMPONENTS", href: "/dashboard/components", icon: ExtensionOutlined },
    { name: "USERS", href: "/dashboard/users", icon: GroupAddOutlined },
    { name: "CUSTOMERS", href: "/dashboard/customers", icon: GroupOutlined },
]

export default function Sidebar() {
    return (
        <div className='hidden sm:flex w-[length:var(--sidebar-width)] fixed z-10 h-screen max-h-screen bg-primary flex-col justify-between py-12'>
            <Image
                src="/Cadex_50_Disc_Ultra_F-modified.png"
                width={60}
                height={60}
                className="ml-auto mr-auto rounded-[50%] mb-10 bg-white"
                alt="logo"
            />
            <div className='flex flex-col gap-8 items-center'>
                {
                    sideBarData.map(data => {
                        const Icon = data.icon;
                        return (
                            <NavLink key={data.name} href={data.href}>
                                <Icon width={20} height={20} />
                                {data.name}
                            </NavLink>
                        )
                    })
                }
            </div>
            <div className="flex w-full justify-center items-center">
                <NavLink href="/login">
                    <LogoutOutlined width={60} height={60} />
                    LOGOUT
                </NavLink>
            </div>
        </div>
    )
}
