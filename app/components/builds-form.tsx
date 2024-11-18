'use client'

import Link from 'next/link';
import { TimerOutlined, PersonOutline, AddOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { updateBuildsAndModelsBuilds, createBuildsAndModelsBuilds } from "@/app/lib/actions";
import Loading from "./loading";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import SelectField from "@/app/ui/select-field";
import 'react-toastify/dist/ReactToastify.css';

export default function BuildForm({ build_id }: { build_id?: string }) {
    const buildsAndModelsBuilds = useSelector((state: any) => state.componentsReducer.buildsAndModelsBuilds);
    const models = useSelector((state: any) => state.componentsReducer.models);
    const colors = useSelector((state: any) => state.componentsReducer.colors);
    const colorsPresets = useSelector((state: any) => state.componentsReducer.colorsPresets);
    const user = useSelector((state: any) => state.authReducer.user);
    const [loading, setLoading] = useState(false);
    const builds = buildsAndModelsBuilds?.filter((buildsAndModelsBuild: any) => buildsAndModelsBuild[0].id === build_id)[0];
    const buildsName = builds?.[0].name
    const buildsImage = builds?.[0].image_url
    const buildsModel = builds?.[1].reduce((acc: any, item: any) => {
        acc[item.category] = item.id;
        return acc;
    }, {});
    const [frameSetValueId, setFrameSetValueId] = useState(buildsModel?.["Frame Set"] || "");

    const getColorDefaultValue = (componentValueId: string) => {
        let existingColorPreset = "";
        colors.filter((color: any) => color.model_id === componentValueId).forEach((color: any) => {
            colorsPresets.forEach((colorPreset: any) => {
                if (color.id === colorPreset.color_id && build_id === colorPreset.preset_id) {
                    existingColorPreset = color.id
                }
            })
        });
        return existingColorPreset;
    }

    const handleFormUpdate = (formData: any) => {
        build_id && updateBuildsAndModelsBuilds(build_id, formData)
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

    const handleFormSubmission = build_id ? handleFormUpdate : handleFormCreation;

    return (
        <form aria-describedby="form-error" action={handleFormSubmission}>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">

                <div className="flex gap-5">
                    {/* build name */}
                    <TextField fullWidth name='name' type='text' defaultValue={buildsName} label='Build name' placeholder='Build name' />

                    {/* build name */}
                    <TextField fullWidth name='image_url' type='text' defaultValue={buildsImage} label='Build image' placeholder='Build image' />
                </div>

                <div className="flex gap-5">
                    {/* Frame Set */}
                    <SelectField name='model[]' label='Frame Set' value={frameSetValueId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFrameSetValueId(e.target.value)} placeholder='None' placeholderDisabled={false}>
                        {
                            models.filter((item: any) => item.category === "Frame Set" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Frame Set Color */}
                    <SelectField name='color[]' label='Frame Set Color' defaultValue={getColorDefaultValue(frameSetValueId)} placeholder={frameSetValueId ? models.filter((model: any) => model.id === frameSetValueId)[0]?.color_name : "None"} placeholderDisabled={false}>
                        {
                            colors.filter((item: any) => item.model_id === frameSetValueId).map((item: any) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </SelectField>
                </div>


                <div className='flex gap-5'>
                    {/* Wheel Set */}
                    <SelectField name='model[]' label='Wheel Set' defaultValue={buildsModel?.["Front Wheel Set"] || ""} placeholder='Select a Wheel Set'>
                        {
                            models.filter((item: any) => item.category === "Front Wheel Set" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Group Set */}
                    <SelectField name='model[]' label='Group Set' defaultValue={buildsModel?.["Group Set - Drivetrain"] || ""} placeholder='Select a Group Set'>
                        {
                            models.filter((item: any) => item.category === "Group Set - Drivetrain" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

                <div className='flex gap-5'>
                    {/* Stem */}
                    <SelectField name='model[]' label='Stem' defaultValue={buildsModel?.["Stem"] || ""} placeholder='Select a Stem'>
                        {
                            models.filter((item: any) => item.category === "Stem" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Handle Bar */}
                    <SelectField name='model[]' label='Handle Bar' defaultValue={buildsModel?.["Handle Bar"] || ""} placeholder='Select a Handle Bar'>
                        {
                            models.filter((item: any) => item.category === "Handle Bar" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

                <div className='flex gap-5'>
                    {/* Saddle */}
                    <SelectField name='model[]' label='Saddle' defaultValue={buildsModel?.["Saddle"] || ""} placeholder='Select a Saddle'>
                        {
                            models.filter((item: any) => item.category === "Saddle" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Tyre */}
                    <SelectField name='model[]' label='Tyre' defaultValue={buildsModel?.["Tyre"] || ""} placeholder='Select a Tyre'>
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
                    className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setLoading(true)}
                    disabled={user.permission > 1}
                >
                    <span className="hidden md:block">{build_id ? "Update Build" : "Create Build"}</span>
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
