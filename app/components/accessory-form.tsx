'use client'

import Link from 'next/link';
import { TimerOutlined, PersonOutline, AddOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { updateModel, updateAccessoryModel, createAccessoryModel } from "@/app/lib/actions";
import Loading from "./loading";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import MultipleInput from "@/app/ui/multiple-input";
import 'react-toastify/dist/ReactToastify.css';

export default function AccessoryForm({ model }: { model?: any, model_id?: string }) {
    const accessories = useSelector((state: any) => state.componentsReducer.accessories);
    const brands = useSelector((state: any) => state.componentsReducer.brands);
    const user = useSelector((state: any) => state.authReducer.user);
    const [accessoryId, setAccessoryId] = useState(model?.accessory_id || "");
    const [loading, setLoading] = useState(false);

    const handleFormUpdate = (formData: any) => {
        updateAccessoryModel(model.id, formData)
            .then(() => {
                setLoading(false);
                toast.success("Accessory updated!")
            })
            .then(() => {
                window.location.href = "/dashboard/components?tab=accessory"
            })
            .catch(error => {
                toast.error(`Accessory failed to update: ${error}`)
            });
    }

    const handleFormCreation = (formData: any) => {
        createAccessoryModel(formData)
            .then(() => {
                setLoading(false);
                toast.success("Accessory created!")
            })
            .then(() => {
                window.location.href = "/dashboard/components?tab=accessory"
            })
            .catch(error => {
                toast.error(`Accessory failed to create: ${error}`)
            });
    }

    const handleFormSubmission = model ? handleFormUpdate : handleFormCreation;

    return (
        <form aria-describedby="form-error" action={handleFormSubmission}>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">

                {/* Accessory */}
                <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm font-medium">
                        <label htmlFor="accessory_id">
                            Accessory
                        </label>
                    </div>
                    <div className="relative">
                        <select
                            id="accessory_id"
                            name="accessory_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={accessoryId ?? model?.accessory_id ?? ""}
                            onChange={(e) => setAccessoryId(e.target.value)}
                            aria-describedby="accessory_id-error"
                        >
                            <option value="" disabled>
                                Select an accessory
                            </option>
                            {
                                Object.entries(accessories).map((item: any) => (
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
                                defaultValue={model?.brand_id ?? ""}
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
                <TextField name='model' type='text' defaultValue={model?.name} label='Model' placeholder='Model name' />

                {/* Price */}
                <TextField name='price' step={0.01} min={0.0} defaultValue={model?.price} label='Price' placeholder='Model price' fullWidth />

            </div >
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/components?tab=accessory"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <button
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setLoading(true)}
                    disabled={user.permission > 1}
                >
                    <span className="hidden md:block">{model ? "Update Accessory" : "Create Accessory"}</span>
                </button>
                {
                    loading ? <div className='self-center'><Loading small /></div> : null
                }
            </div>
            <ToastContainer autoClose={3500} position="top-right" />
        </form >
    );
}

function TextField({ type, name, defaultValue, label, step, min, max, placeholder, value, onChange, fullWidth }: { type?: string, name: string, defaultValue?: string, label?: string, step?: number, min?: number, max?: number, placeholder?: string, value?: string, onChange?: any, fullWidth?: boolean }) {
    return (
        <div className={`mb-4 ${fullWidth && "w-full"}`}>
            {
                label && <label htmlFor={name} className="mb-2 block text-sm font-medium">
                    {label}
                </label>
            }
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id={name}
                        name={name}
                        step={step}
                        min={min}
                        max={max}
                        type={type || "number"}
                        value={value}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        placeholder={placeholder || label}
                        className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${max ? "min-w-[200px]" : ""}`}
                        aria-describedby={`${name}-error`}
                    />
                    <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </div>

    )
}
