'use client'

import Link from 'next/link';
import { CheckOutlined, TimerOutlined, PersonOutline, AddOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { updateModel, createComponent } from "@/app/lib/actions";
import Loading from "./loading";
import { useState } from 'react';

export default function Form({ model }: { model: any }) {
    const categories = useSelector((state: any) => state.componentsReducer.categories);
    const brands = useSelector((state: any) => state.componentsReducer.brands);
    const [loading, setLoading] = useState(false);

    const handleFormUpdate = (formData: any) => {
        updateModel(model.id, formData)
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                window.location.href = "/dashboard/components"
            })
            .catch(error => console.log(error));
    }

    const handleFormCreation = (formData: any) => {
        createComponent(formData)
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                window.location.href = "/dashboard/components"
            })
            .catch(error => console.log(error));
    }

    const handleFormSubmission = model ? handleFormUpdate : handleFormCreation;

    return (
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
                            defaultValue={model.category_id}
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
                                defaultValue={model.brand_id}
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
                                defaultValue={model.name}
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
                                defaultValue={model.image_url}
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
                                defaultValue={model.actual_width}
                                placeholder="Actual width"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="actual_width-error"
                            />
                            <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Offsets */}
                <fieldset className='mb-4'>
                    <legend className="mb-2 block text-sm font-medium">
                        Offsets
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4 py-5">

                            {/* Has Stem */}
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="has_stem"
                                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Has Stem?
                                </label>
                                <input
                                    id="has_stem"
                                    name="has_stem"
                                    type="checkbox"
                                    defaultChecked={model.has_stem}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="has_stem-error"
                                />
                            </div>

                            {/* Has Handle Bar */}
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="has_handle_bar"
                                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Has Handle Bar?
                                </label>
                                <input
                                    id="has_handle_bar"
                                    name="has_handle_bar"
                                    type="checkbox"
                                    defaultChecked={model.has_handle_bar}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="has_handle_bar-error"
                                />
                            </div>
                        </div>
                        <hr className='h-[2px] bg-gray-300' />
                        <div className="flex gap-4 pt-5">

                            {/* StemX */}
                            <div className="mb-4">
                                <label htmlFor="stem_x" className="mb-2 block text-sm font-medium">
                                    Stem Offset X
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            id="stem_x"
                                            name="stem_x"
                                            type="number"
                                            defaultValue={model.stem_x || 600}
                                            placeholder="Stem X"
                                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            aria-describedby="stem_x-error"
                                        />
                                        <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            {/* StemY */}
                            <div className="mb-4">
                                <label htmlFor="stem_y" className="mb-2 block text-sm font-medium">
                                    Stem Offset Y
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            id="stem_y"
                                            name="stem_y"
                                            type="number"
                                            defaultValue={model.stem_y || 150}
                                            placeholder="Stem Y"
                                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            aria-describedby="stem_y-error"
                                        />
                                        <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
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
                    <span className="hidden md:block">{model ? "Update Component" : "Create Component"}</span>
                </button>
                {
                    loading ? <div className='self-center'><Loading small /></div> : null
                }
            </div>
        </form>
    );
}
