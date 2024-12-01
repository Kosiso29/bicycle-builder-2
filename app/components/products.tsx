'use client'

// import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Table from "./products-table";
// import Search from "../../components/search";
import { MenuItem } from "@mui/material";
import SelectElement from "@/app/ui/select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IRootState } from "@/app/store";

export default function Inventory() {
    const products = useSelector((state: IRootState) => state.componentsReducer.products);
    const productTypes: Array<string> = useSelector((state: IRootState) => state.componentsReducer.productTypes);
    const [uniqueCategories, setUniqueCategories] = useState(['All']);
    const [category, setCategory] = useState('All');
    const [tableModels, setTableModels] = useState([]);

    useEffect(() => {
        if (Object.keys(productTypes).length > 0) {
            setUniqueCategories(['All', ...Object.values(productTypes)]);
        };
    }, [productTypes, products]);

    useEffect(() => {
        if (category) {
            if (category !== 'All') {
                setTableModels(products.filter((item: any) => item.product_type === category));
            } else {
                setTableModels(products);
            }
        };
    }, [category, products]);

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
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* <Search placeholder="Search schedules..." /> */}
                <Link
                    href="/dashboard/components/create"
                    className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    <span className="hidden md:block">Create Component</span>{' '}
                    {/* <PlusIcon className="h-5 md:ml-4" /> */}
                </Link>
            </div>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <Table products={tableModels} />
            </div>
        </div>
    )
}
