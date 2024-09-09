'use client'

import Link from "next/link";
import BuildsTable from "@/app/components/builds-table";
import { useSelector } from "react-redux";

export default function AdminBuilds() {
    const buildsAndModelsBuilds = useSelector((state: any) => state.componentsReducer.buildsAndModelsBuilds);

    return (
        <div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* <Search placeholder="Search schedules..." /> */}
                <Link
                    href="/dashboard/components/builds/create"
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Create Build</span>{' '}
                    {/* <PlusIcon className="h-5 md:ml-4" /> */}
                </Link>
            </div>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <BuildsTable builds={buildsAndModelsBuilds} />
            </div>
        </div>
    )
}
