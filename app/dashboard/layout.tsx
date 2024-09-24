import React from 'react';
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { fetchModels, fetchCategories, fetchBrands, fetchPresets, fetchModelsPresets, fetchColorsPresets, fetchUsers, fetchColors, fetchAccessories, fetchAccessoryModels, fetchBuildsAndModelsBuilds } from "@/app/lib/data";
import { signOut } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const models = await fetchModels();
    const categories = await fetchCategories();
    const brands = await fetchBrands();
    const presets = await fetchPresets();
    const modelsPresets = await fetchModelsPresets();
    const colorsPresets = await fetchColorsPresets();
    const users = await fetchUsers();
    const colors = await fetchColors();
    const accessories = await fetchAccessories();
    const accessoryModels = await fetchAccessoryModels();
    const buildsAndModelsBuilds = await fetchBuildsAndModelsBuilds(presets, modelsPresets, models);
    
    return (
        <div className='max-w-full h-screen'>
            <form action={async () => {
                'use server';
                await signOut();
            }} className='hidden sm:block w-[var(--sidebar-width)] fixed z-10 h-screen max-h-screen bg-primary'>
                <Sidebar models={models} categories={categories} brands={brands} presets={presets} modelsPresets={modelsPresets} colorsPresets={colorsPresets} colors={colors} accessories={accessories} accessoryModels={accessoryModels} buildsAndModelsBuilds={buildsAndModelsBuilds} />
            </form>
            <div className="max-w-full sm:ml-[var(--sidebar-width)] sm:w-[calc(100%-var(--sidebar-width))] px-5 pb-10 sm:pb-10 sm:px-10 bg-back-color min-h-screen">
                <Topbar users={users} />
                {children}
            </div>
        </div>
    )
}
