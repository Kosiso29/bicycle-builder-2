'use client'

// import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AccessoryTable from "./accessories-table";
// import Search from "../../components/search";
import { MenuItem } from "@mui/material";
import SelectElement from "@/app/ui/select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Types
import { Model } from "@/app/lib/definitions";

export default function Accessory() {
    const accessoryModels = useSelector((state: any) => state.componentsReducer.accessoryModels);
    const [tableModels, setTableModels] = useState(accessoryModels);

    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* <Search placeholder="Search schedules..." /> */}
                <Link
                    href="/dashboard/components/accessory/create"
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Create Accessory</span>{' '}
                    {/* <PlusIcon className="h-5 md:ml-4" /> */}
                </Link>
            </div>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <AccessoryTable models={tableModels} />
            </div>
        </div>
    )
}
