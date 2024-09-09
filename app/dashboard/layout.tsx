import React from 'react';
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { fetchModels, fetchCategories, fetchBrands, fetchPresets, fetchModelsPresets, fetchUsers, fetchColors, fetchAccessories, fetchAccessoryModels } from "@/app/lib/data";
import { signOut } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const models = await fetchModels();
    const categories = await fetchCategories();
    const brands = await fetchBrands();
    const presets = await fetchPresets();
    const modelsPresets = await fetchModelsPresets();
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
                <Sidebar models={models} categories={categories} brands={brands} presets={presets} modelsPresets={modelsPresets} colors={colors} accessories={accessories} accessoryModels={accessoryModels} buildsAndModelsBuilds={buildsAndModelsBuilds} />
            </form>
            <div className="max-w-full sm:ml-[var(--sidebar-width)] sm:w-[calc(100%-var(--sidebar-width))] px-5 pb-10 sm:pb-10 sm:px-10 bg-blue-100 min-h-screen">
                <Topbar users={users} />
                {children}
            </div>
        </div>
    )
}

export async function fetchBuildsAndModelsBuilds(builds: any, modelsPresets: any, models: any) {
    try {
        return Object.entries(builds).filter((build: any) => build[1] !== "None").map((build: any) => {
            const filteredModelsPresets = modelsPresets.filter((modelPreset: any) => modelPreset.preset_id === build[0]);
            return [ build[0], build[1], filteredModelsPresets.map((filteredModelsPreset: any) => {
                    const filteredModel = models.filter((model: any) => model.id === filteredModelsPreset.model_id);
                    return { brand: filteredModel[0].brand, model: filteredModel[0].model, category: filteredModel[0].category, id: filteredModel[0].id }
                })
            ]
        });
    } catch (error) {
        console.error('Evaluation Error:', error);
        throw new Error('Failed to evaluate the builds and modelsbuilds data');
    }
}
