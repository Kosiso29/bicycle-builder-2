'use client'

// import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Table from "./components-table";
// import Search from "../../components/search";
import { MenuItem } from "@mui/material";
import SelectElement from "@/app/ui/select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Types
import { Model } from "@/app/lib/definitions";

export default function Inventory() {
    const models = useSelector((state: any) => state.componentsReducer.models);
    const categories: Array<string> = useSelector((state: any) => state.componentsReducer.categories);
    const presets: Array<string> = useSelector((state: any) => state.componentsReducer.presets);
    const modelsPresets = useSelector((state: any) => state.componentsReducer.modelsPresets);
    const [uniqueCategories, setUniqueCategories] = useState(['All']);
    const [category, setCategory] = useState('All');
    const [preset, setPreset] = useState('None');
    const [tableModels, setTableModels] = useState([]);

    useEffect(() => {
        if (Object.keys(categories).length > 0) {
            setUniqueCategories(['All', ...Object.values(categories)]);
        };
    }, [categories, models]);

    useEffect(() => {
        if (category) {
            if (category !== 'All') {
                setTableModels(models.filter((item: Model) => item.category === category));
            } else {
                setTableModels(models);
            }
        };
    }, [category, models]);

    useEffect(() => {
        if (preset) {
            if (preset !== 'None') {
                const filteredModelIds = modelsPresets.filter((item: any) => item.preset_name === preset).map((item: any) => item.model_id);
                const filteredModels = models.filter((item: any) => filteredModelIds.includes(item?.id));
                setTableModels(filteredModels);
            } else {
                setTableModels(models);
            }
        };
    }, [preset, models, modelsPresets])

    return (
        <div>
            <div className="flex justify-between gap-5 mt-4 md:mt-10">
                <SelectElement value={category} onChange={(e: React.MouseEvent<HTMLButtonElement>) => { setCategory((e.target as HTMLInputElement).value) }} label="Categories">
                    {
                        uniqueCategories.map(category => (
                            <MenuItem value={category} key={category}>{category}</MenuItem>
                        ))
                    }
                </SelectElement>
                <SelectElement value={preset} onChange={(e: React.MouseEvent<HTMLButtonElement>) => { setPreset((e.target as HTMLInputElement).value) }} label="Builds">
                    {
                        Object.values(presets).map((preset: any) => (
                            <MenuItem value={preset} key={preset}>{preset}</MenuItem>
                        ))
                    }
                </SelectElement>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* <Search placeholder="Search schedules..." /> */}
                <Link
                    href="/dashboard/components/create"
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Create Component</span>{' '}
                    {/* <PlusIcon className="h-5 md:ml-4" /> */}
                </Link>
            </div>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <Table models={tableModels} preset={preset} />
            </div>
        </div>
    )
}
