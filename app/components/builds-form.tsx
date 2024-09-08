'use client'

import Link from 'next/link';
import { TimerOutlined, PersonOutline, AddOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { updateAccessoryModel, createBuildsAndModelsBuilds } from "@/app/lib/actions";
import Loading from "./loading";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import MultipleInput from "@/app/ui/multiple-input";
import 'react-toastify/dist/ReactToastify.css';

export default function BuildForm({ model }: { model?: any, model_id?: string }) {
    const models = useSelector((state: any) => state.componentsReducer.models);
    const brands = useSelector((state: any) => state.componentsReducer.brands);
    const user = useSelector((state: any) => state.authReducer.user);
    const [accessoryId, setAccessoryId] = useState(model?.accessory_id || "");
    const [loading, setLoading] = useState(false);

    const handleFormUpdate = (formData: any) => {
        updateAccessoryModel(model.id, formData)
            .then(() => {
                setLoading(false);
                toast.success("Build updated!")
            })
            .then(() => {
                window.location.href = "/dashboard/components?tab=builds"
            })
            .catch(error => {
                toast.error(`Build failed to update: ${error}`)
            });
    }

    const handleFormCreation = (formData: any) => {
        createBuildsAndModelsBuilds(formData)
            .then(() => {
                setLoading(false);
                toast.success("Build created!")
            })
            .then(() => {
                window.location.href = "/dashboard/components?tab=builds"
            })
            .catch(error => {
                toast.error(`Build failed to create: ${error}`)
            });
    }

    const handleFormSubmission = model ? handleFormUpdate : handleFormCreation;

    return (
        <form aria-describedby="form-error" action={handleFormSubmission}>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">

                {/* build name */}
                <TextField name='name' type='text' defaultValue={model?.name} label='Build name' placeholder='Build name' />

                {/* Frame Set */}
                <SelectField name='model[]' label='Frame Set' defaultValue={""} placeholder='Select a Frame Set'>
                    {
                        models.filter((item: any) => item.category === "Frame Set" && item.is_primary).map((item: any) => (
                            <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                        ))
                    }
                </SelectField>

                <div className='flex gap-5'>
                    {/* Wheel Set */}
                    <SelectField name='model[]' label='Wheel Set' defaultValue={""} placeholder='Select a Wheel Set'>
                        {
                            models.filter((item: any) => item.category === "Front Wheel Set" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Group Set */}
                    <SelectField name='model[]' label='Group Set' defaultValue={""} placeholder='Select a Group Set'>
                        {
                            models.filter((item: any) => item.category === "Group Set - Drivetrain" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

                <div className='flex gap-5'>
                    {/* Stem */}
                    <SelectField name='model[]' label='Stem' defaultValue={""} placeholder='Select a Stem'>
                        {
                            models.filter((item: any) => item.category === "Stem" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Handle Bar */}
                    <SelectField name='model[]' label='Handle Bar' defaultValue={""} placeholder='Select a Handle Bar'>
                        {
                            models.filter((item: any) => item.category === "Handle Bar" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

                <div className='flex gap-5'>
                    {/* Saddle */}
                    <SelectField name='model[]' label='Saddle' defaultValue={""} placeholder='Select a Saddle'>
                        {
                            models.filter((item: any) => item.category === "Saddle" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Tyre */}
                    <SelectField name='model[]' label='Tyre' defaultValue={""} placeholder='Select a Tyre'>
                        {
                            models.filter((item: any) => item.category === "Tyre" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

            </div >
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/components?tab=builds"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <button
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setLoading(true)}
                    disabled={user.permission > 1}
                >
                    <span className="hidden md:block">{model ? "Update Build" : "Create Build"}</span>
                </button>
                {
                    loading ? <div className='self-center'><Loading small /></div> : null
                }
            </div>
            <ToastContainer autoClose={3500} position="top-right" />
        </form >
    );
}

function SelectField({ name, defaultValue, label, placeholder, value, onChange, children }: { name: string, defaultValue?: string, label?: string, placeholder?: string, value?: string, onChange?: any, children: React.ReactNode }) {
    return (
        <div className={`mb-4 w-full`}>
            <div className="mb-2 flex items-center justify-between text-sm font-medium">
                {
                    label &&
                    <label htmlFor={`${name}`}>
                        {label}
                    </label>
                }
            </div>
            <div className="relative">
                <select
                    id={`${name}`}
                    name={`${name}`}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    aria-describedby={`${name}-error`}
                >
                    {
                        placeholder &&
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    }
                    { children }
                </select>
                <TimerOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    )
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
