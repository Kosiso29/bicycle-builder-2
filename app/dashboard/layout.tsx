import React from 'react';
import Sidebar from "../components/sidebar";
import { fetchModels, fetchCategories, fetchBrands, fetchPresets } from "@/app/lib/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const models = await fetchModels();
    const categories = await fetchCategories();
    const brands = await fetchBrands();
    const presets = await fetchPresets();
    
    return (
        <div className='max-w-full h-screen'>
            <Sidebar models={models} categories={categories} brands={brands} presets={presets} />
            <div className="max-w-full sm:ml-[var(--sidebar-width)] sm:w-[calc(100%-var(--sidebar-width))] px-5 py-10 sm:p-10 bg-blue-100 min-h-screen">
                {children}
            </div>
        </div>
    )
}
