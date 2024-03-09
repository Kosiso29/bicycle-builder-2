import React from 'react';
import Sidebar from "../components/sidebar";
import { fetchModels, fetchCategories } from "@/app/lib/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const models = await fetchModels();
    const data = await fetchCategories();

    console.log('data', data);
    
    return (
        <div className='max-w-full h-screen'>
            <Sidebar models={models} />
            <div className="max-w-full sm:ml-[length:var(--sidebar-width)] sm:w-[calc(100%-var(--sidebar-width))] px-5 py-10 sm:p-10 bg-blue-100 min-h-screen">
                {children}
            </div>
        </div>
    )
}
