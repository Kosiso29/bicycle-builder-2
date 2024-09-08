'use client'

import Link from "next/link";
import BuildsTable from "@/app/components/builds-table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AdminBuilds() {
    const builds = useSelector((state: any) => state.componentsReducer.presets);
    const modelsPresets = useSelector((state: any) => state.componentsReducer.modelsPresets);
    const models = useSelector((state: any) => state.componentsReducer.models);
    const [tableBuilds, setTableBuilds] = useState(builds);

    useEffect(() => {
        const newTableBuilds = Object.entries(builds).filter((build: any) => build[1] !== "None").map((build: any) => {
            const filteredModelsPresets = modelsPresets.filter((modelPreset: any) => modelPreset.preset_id === build[0]);
            return [ build[0], build[1], filteredModelsPresets.map((filteredModelsPreset: any) => {
                    const filteredModel = models.filter((model: any) => model.id === filteredModelsPreset.model_id);
                    return { brand: filteredModel[0].brand, model: filteredModel[0].model, category: filteredModel[0].category }
                })
            ]
        });
        setTableBuilds(newTableBuilds);
    }, [builds, models, modelsPresets]);

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
                <BuildsTable builds={tableBuilds} />
            </div>
        </div>
    )
}
