'use client'

import Link from 'next/link';
import { CheckOutlined, TimerOutlined, PersonOutline, AddOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { createComponent } from "../../../lib/actions";
import Loading from "../../../components/loading";
import { useState } from 'react';

export default function Form() {
    const categories = useSelector((state: any) => state.componentsReducer.categories);
    const brands = useSelector((state: any) => state.componentsReducer.brands);
    const [loading, setLoading] = useState(false);

    const handleFormSubmission = (formData: any) => {
        createComponent(formData)
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                window.location.href = "/dashboard/components"
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Create Component
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <form aria-describedby="form-error" action={handleFormSubmission}>
                    <div className="rounded-md bg-gray-100 p-4 md:p-6">
                        {/* Category */}
                        <div className="mb-4">
                            <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    id="category_id"
                                    name="category_id"
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    defaultValue=""
                                    aria-describedby="category_id-error"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {
                                        Object.entries(categories).map((item: any) => (
                                            <option key={item[1]} value={item[0]}>{item[1]}</option>
                                        ))
                                    }
                                </select>
                                <TimerOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="mb-4">
                            <label htmlFor="brand_id" className="mb-2 block text-sm font-medium">
                                Brand
                            </label>
                            <div className='relative flex gap-6 justify-between'>
                                <div className="flex-grow">
                                    <select
                                        id="brand_id"
                                        name="brand_id"
                                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=""
                                        aria-describedby="brand_id-error"
                                    >
                                        <option value="" disabled>
                                            Select a brand
                                        </option>
                                        {
                                            Object.entries(brands).map((item: any) => (
                                                <option key={item[1]} value={item[0]}>{item[1]}</option>
                                            ))
                                        }
                                    </select>
                                    <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                                <Link
                                    href="/dashboard/components/create/brands"
                                    className="flex items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Add Brands
                                    <AddOutlined className="pointer-events-none" />
                                </Link>
                            </div>
                        </div>

                        {/* Model */}
                        <div className="mb-4">
                            <label htmlFor="model" className="mb-2 block text-sm font-medium">
                                Model
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="model"
                                        name="model"
                                        type="text"
                                        placeholder="Model name"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="model-error"
                                    />
                                    <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="mb-4">
                            <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
                                Image URL
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="image_url"
                                        name="image_url"
                                        type="text"
                                        placeholder="Image URL"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="image_url-error"
                                    />
                                    <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Actual width */}
                        <div className="mb-4">
                            <label htmlFor="actual_width" className="mb-2 block text-sm font-medium">
                                Actual width
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="actual_width"
                                        name="actual_width"
                                        type="number"
                                        placeholder="Actual width"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="actual_width-error"
                                    />
                                    <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/components"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <button
                            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            onClick={() => setLoading(true)}
                        >
                            <span className="hidden md:block">Create Component</span>
                        </button>
                        {
                            loading ? <div className='self-center'><Loading small /></div> : null
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
