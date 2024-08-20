'use client'

import Link from 'next/link';
import { CheckOutlined, TimerOutlined, PersonOutline, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { updateModel, createComponent } from "@/app/lib/actions";
import Loading from "./loading";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import MultipleInput from "@/app/ui/multiple-input";
import 'react-toastify/dist/ReactToastify.css';

export default function Form({ model, model_id }: { model?: any, model_id?: string }) {
    const categories = useSelector((state: any) => state.componentsReducer.categories);
    const brands = useSelector((state: any) => state.componentsReducer.brands);
    const presets = useSelector((state: any) => state.componentsReducer.presets);
    const modelsPresets = useSelector((state: any) => state.componentsReducer.modelsPresets);
    const models = useSelector((state: any) => state.componentsReducer.models);
    const user = useSelector((state: any) => state.authReducer.user);
    const [categoryId, setCategoryId] = useState(model?.category_id || "");
    const [canvasLayerLevel, setCanvasLayerLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [colorItems, setColorItems] = useState([{ name: "", image_url: "" }])

    const addModelColors = () => {
        setColorItems((prevState: any) => [ ...prevState, { name: "", image_url: "" } ])
    }

    const removeModelColors = () => {
        setColorItems((prevState: any) => {
            const newState = [...prevState];
            newState.pop();
            return [ ...newState ];
        })
    }

    const handleModelColorTextChange = (e: any, index: number, key: string) => {
        setColorItems((prevState: any) => {
            const newState = [...prevState];
            newState[index][key] = e.target.value;
            return [...newState];
        })
    }

    const getPresetCheckState = (preset_id: string) => {
        return modelsPresets.filter((item: any) => {
            return item.model_id === model_id && item.preset_id === preset_id
        }).length > 0
    }

    const checkExistingModelPreset: any = (preset_id: string) => {
        if (model) {
            const modelsInTheSameCategory = models.filter((item: any) => {
                return item.category === categories[categoryId]
            }).map((item: any) => item.id);
            
            const existingPreset = modelsPresets.filter((item: any) => {
                return modelsInTheSameCategory.includes(item.model_id) && item.preset_id === preset_id && item.model_id !== model.id
            })
            if ((existingPreset.length > 0 || !categoryId) && !getPresetCheckState(preset_id)) {
                return true;
            }
        }
        return false;
    }

    const handleFormUpdate = (formData: any) => {
        updateModel(model.id, formData)
            .then(() => {
                setLoading(false);
                toast.success("Component updated!")
            })
            .then(() => {
                window.location.href = "/dashboard/components"
            })
            .catch(error => {
                toast.error(`Component failed to update: ${error}`)
            });
    }

    const handleFormCreation = (formData: any) => {
        createComponent(formData)
            .then(() => {
                setLoading(false);
                toast.success("Component created!")
            })
            .then(() => {
                window.location.href = "/dashboard/components"
            })
            .catch(error => {
                toast.error(`Component failed to create: ${error}`)
            });
    }

    const handleFormSubmission = model ? handleFormUpdate : handleFormCreation;

    const showOffsets = (Object.values(categories)[0] === categories[categoryId]) || (Object.values(categories)[3] === categories[categoryId]) || Object.values(categories)[4] === categories[categoryId];
    const showFrameSetOffsets = Object.values(categories)[0] === categories[categoryId];
    const showFrameSetStemOffsets = Object.values(categories)[0] === categories[categoryId] || (Object.values(categories)[3] === categories[categoryId]);
    const showStemHandleBarOffsets = Object.values(categories)[3] === categories[categoryId] || Object.values(categories)[4] === categories[categoryId];

    return (
        <form aria-describedby="form-error" action={handleFormSubmission}>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">
                
                {/* Category */}
                <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm font-medium">
                        <label htmlFor="category_id">
                            Category
                        </label>
                        {/* Primary */}
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="is_primary"
                                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Primary
                            </label>
                            <input
                                id="is_primary"
                                name="is_primary"
                                type="checkbox"
                                defaultChecked={model?.is_primary ?? true}
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                aria-describedby={`is_primary-error`}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            id="category_id"
                            name="category_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={categoryId ?? model?.category_id ?? ""}
                            onChange={(e) => setCategoryId(e.target.value)}
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

                <div className='flex gap-5'>
                    {/* Image URL */}
                    <TextField name='image_url' type='text' defaultValue={model?.image_url} label='Image URL' fullWidth />
                    {/* Size chart URL */}
                    <TextField name='size_chart_url' type='text' defaultValue={model?.size_chart_url} label='Size chart URL' fullWidth />
                </div>

                <div className='flex gap-5'>
                    {/* Actual width */}
                    <TextField name='actual_width' defaultValue={model?.actual_width} label='Actual width' fullWidth />
                    {/* Price */}
                    <TextField name='price' step={0.01} min={0.0} defaultValue={model?.price} label='Price' fullWidth />
                </div>

                {/* Colors */}
                <div>
                    <label className="block text-sm font-medium">
                        Model colors
                    </label>
                    {
                        colorItems.map((colorItem: any, index: number) => (
                            <div key={index} className='flex gap-5 items-center'>
                                {/* Model Image Color */}
                                <TextField name='color_name' value={colorItem.name} onChange={(e: any) => { handleModelColorTextChange(e, index, "name") }} type='text' placeholder='Model Image Color' fullWidth />
                                {/* Model Image URL */}
                                <div className='flex w-full gap-3'>
                                    <TextField name='color_image_url' value={colorItem.image_url} onChange={(e: any) => { handleModelColorTextChange(e, index, "image_url") }} type='text' placeholder='Model Image URL' fullWidth />
                                    {
                                        index === (colorItems.length - 1) &&
                                        <div className='flex gap-2 text-blue-600 items-center mb-4 mt-2'>
                                            <AddOutlined className='cursor-pointer' fontSize='large' onClick={addModelColors} />
                                            <RemoveOutlined className='cursor-pointer' fontSize='large' onClick={removeModelColors} />
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Length */}
                <MultipleInput initialItems={model?.lengths} title='Length values' buttonText={<>Add&nbsp;Length</>} name='lengths' />
                
                {/* Size */}
                <MultipleInput initialItems={model?.sizes} title='Size values' buttonText={<>Add&nbsp;Size</>} name='sizes' />

                {/* Ratio */}
                <MultipleInput initialItems={model?.ratios} title='Ratio values' buttonText={<>Add&nbsp;Ratio</>} name='ratios' />

                {/* Key Metrics */}
                <div className="mb-4">
                    <label htmlFor="key_metrics" className="mb-2 block text-sm font-medium">
                        Key Metrics
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="key_metrics"
                                name="key_metrics"
                                defaultValue={model?.key_metrics}
                                placeholder="Key Metrics"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="key_metrics-error"
                            />
                            <PersonOutline className="pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                {
                    categoryId ?
                        <fieldset className='mb-4'>
                            <legend className="mb-2 block text-sm font-medium">
                                Specifications
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-4 py-5">
                                        {
                                            Object.entries(presets).filter((item: any) => item[1] !== "None").map((item: any) => (
                                                <div key={item[0]} className="flex items-center gap-2">
                                                    <label
                                                        htmlFor={"preset_" + item[1]}
                                                        className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                                    >
                                                        { item[1] }
                                                    </label>
                                                    <input
                                                        id={"preset_" + item[1]}
                                                        name={"preset_" + item[1]}
                                                        type="checkbox"
                                                        value={model_id + "_" + item[0]}
                                                        disabled={categories[categoryId] === 'Group Set - Drivetrain' ? false : checkExistingModelPreset(item[0])}
                                                        defaultChecked={getPresetCheckState(item[0])}
                                                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                                        aria-describedby={`${"preset_" + item[1]}-error`}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <Link
                                        href="/dashboard/components/create/builds"
                                        className="flex items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 p-2"
                                    >
                                        Add Builds
                                        <AddOutlined className="pointer-events-none" />
                                    </Link>
                                </div>
                                <div className='my-2'>
                                    <div className='flex items-center gap-5'>
                                        <span className='font-bold'>Component should appear</span>
                                        <div className='w-36'>
                                            <select
                                                id="global_composite_operation"
                                                name="global_composite_operation"
                                                className="peer font-bold block w-full cursor-pointer rounded-md border border-gray-200 py-2 outline-2 placeholder:text-gray-500"
                                                defaultValue={model?.global_composite_operation ?? ""}
                                                aria-describedby="global_composite_operation-error"
                                            >
                                                <option value="" disabled>
                                                    Select position
                                                </option>
                                                <option value="source-over">in front of</option>
                                                <option value="destination-over">behind</option>
                                            </select>
                                            <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                        </div>
                                        <span className='font-bold'>the</span>
                                        <div className="w-48">
                                            <select
                                                id="canvas_layer_level"
                                                name="canvas_layer_level"
                                                className="peer font-bold block w-full cursor-pointer rounded-md border border-gray-200 py-2 outline-2 placeholder:text-gray-500"
                                                value={(canvasLayerLevel || model?.canvas_layer_level) ?? ""}
                                                onChange={(e) => { setCanvasLayerLevel(e.target.value) }}
                                                aria-describedby="canvas_layer_level-error"
                                            >
                                                <option value="" disabled>
                                                    Select a component
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
                                </div>
                                < div className="flex flex-wrap gap-4 pt-5">
                                    {/* Aerodynamics */}
                                    <TextField name='aerodynamics' step={0.5} min={0.0} max={5.0} defaultValue={model?.aerodynamics ?? "0.0"} label='Aerodynamics' />

                                    {/* Weight */}
                                    <TextField name='weight' step={0.5} min={0.0} max={5.0} defaultValue={model?.weight ?? "0.0"} label='Weight' />

                                    {/* Comfort */}
                                    <TextField name='comfort' step={0.5} min={0.0} max={5.0} defaultValue={model?.comfort ?? "0.0"} label='Comfort' />

                                    {/* Stiffness */}
                                    <TextField name='stiffness' step={0.5} min={0.0} max={5.0} defaultValue={model?.stiffness ?? "0.0"} label='Stiffness-to-Weight' />

                                    {/* Overall */}
                                    <TextField name='overall' step={0.5} min={0.0} max={5.0} defaultValue={model?.overall ?? "0.0"} label='Overall' />
                                </div>
                            </div>
                        </fieldset>
                        : null
                }

                {/* Offsets */}
                {
                    showOffsets ?
                        <fieldset className='mb-4'>
                            <legend className="mb-2 block text-sm font-medium">
                                Offsets
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                {
                                    showFrameSetStemOffsets ?
                                        <div className="flex gap-4 py-5">

                                            {/* Stem */}
                                            {
                                                showFrameSetOffsets ?
                                                    <div className="flex items-center gap-2">
                                                        <label
                                                            htmlFor="has_stem"
                                                            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                                        >
                                                            Stem
                                                        </label>
                                                        <input
                                                            id="has_stem"
                                                            name="has_stem"
                                                            type="checkbox"
                                                            defaultChecked={model?.has_stem}
                                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                                            aria-describedby="has_stem-error"
                                                        />
                                                    </div> : null
                                            }

                                            {/* Handle Bar */}
                                            <div className="flex items-center gap-2">
                                                <label
                                                    htmlFor="has_handle_bar"
                                                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                                >
                                                    Handle Bar
                                                </label>
                                                <input
                                                    id="has_handle_bar"
                                                    name="has_handle_bar"
                                                    type="checkbox"
                                                    defaultChecked={model?.has_handle_bar}
                                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                                    aria-describedby="has_handle_bar-error"
                                                />
                                            </div>
                                        </div>
                                        : null
                                }
                                {showFrameSetOffsets ? <hr className='h-[2px] bg-gray-300' /> : null}
                                < div className="flex justify-between flex-wrap gap-4 pt-5">
                                    {
                                        showFrameSetOffsets ?
                                            <>
                                                <div className="flex gap-4">
                                                    {/* Stem Offset X */}
                                                    <TextField name='stem_x' defaultValue={model?.stem_x ?? "600"} label='Stem Offset X' />

                                                    {/* Stem Offset Y */}
                                                    <TextField name='stem_y' defaultValue={model?.stem_y ?? "150"} label='Stem Offset Y' />
                                                </div>

                                                <div className="flex gap-4">
                                                    {/* Saddle Offset X */}
                                                    <TextField name='saddle_x' defaultValue={model?.saddle_x ?? "240"} label='Saddle Offset X' />

                                                    {/* Saddle Offset Y */}
                                                    <TextField name='saddle_y' defaultValue={model?.saddle_y ?? "110"} label='Saddle Offset Y' />
                                                </div>

                                                <div className="flex gap-4">
                                                    {/* Front Wheel Offset X */}
                                                    <TextField name='front_wheel_x' defaultValue={model?.front_wheel_x ?? "550"} label='Front Wheel Offset X' />

                                                    {/* Front Wheel Offset Y */}
                                                    <TextField name='front_wheel_y' defaultValue={model?.front_wheel_y ?? "265"} label='Front Wheel Offset Y' />
                                                </div>

                                                <div className="flex gap-4">
                                                    {/* Back Wheel Offset X */}
                                                    <TextField name='back_wheel_x' defaultValue={model?.back_wheel_x ?? "45"} label='Back Wheel Offset X' />

                                                    {/* Back Wheel Offset Y */}
                                                    <TextField name='back_wheel_y' defaultValue={model?.back_wheel_y ?? "265"} label='Back Wheel Offset Y' />
                                                </div>

                                                <div className="flex gap-4">
                                                    {/* Group Set Drivetrain Offset X */}
                                                    <TextField name='groupset_drivetrain_x' defaultValue={model?.groupset_drivetrain_x ?? "185"} label='Groupset Drivetrain Offset X' />

                                                    {/* Group Set Drivetrain Offset Y */}
                                                    <TextField name='groupset_drivetrain_y' defaultValue={model?.groupset_drivetrain_y ?? "380"} label='Groupset Drivetrain Offset Y' />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        showFrameSetOffsets || showStemHandleBarOffsets ?
                                            <>
                                                <div className="flex gap-4">
                                                    {/* Group Set Shifter Offset X */}
                                                    <TextField name='groupset_shifter_x' defaultValue={model?.groupset_shifter_x ?? "704"} label='Groupset Shifter Offset X' />

                                                    {/* Group Set Shifter Offset Y */}
                                                    <TextField name='groupset_shifter_y' defaultValue={model?.groupset_shifter_y ?? "121"} label='Groupset Shifter Offset Y' />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        showFrameSetStemOffsets ?
                                            <>
                                                <div className="flex gap-4">
                                                    {/* Handle Bar Offset X */}
                                                    <TextField name='handle_bar_x' defaultValue={model?.handle_bar_x ?? "600"} label='Handle Bar Offset X' />

                                                    {/* Handle Bar Offset Y */}
                                                    <TextField name='handle_bar_y' defaultValue={model?.handle_bar_y ?? "150"} label='Handle Bar Offset Y' />
                                                </div>
                                            </>
                                            : null
                                    }


                                </div>
                            </div>
                        </fieldset> : null
                }
            </div >
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/components"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <button
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setLoading(true)}
                    disabled={user.permission > 1}
                >
                    <span className="hidden md:block">{model ? "Update Component" : "Create Component"}</span>
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
