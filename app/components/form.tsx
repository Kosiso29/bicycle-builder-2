'use client'

import Link from 'next/link';
import { CheckOutlined, TimerOutlined, PersonOutline, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";
import { updateModel, createModel } from "@/app/lib/actions";
import Loading from "./loading";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { generateSKU } from "@/app/utils/generateSKU";
import MultipleInput from "@/app/ui/multiple-input";
import SelectField from "@/app/ui/select-field";
import 'react-toastify/dist/ReactToastify.css';

export default function Form({ product, productModels }: { product?: any, productModels?: any }) {
    const productTypes = useSelector((state: IRootState) => state.componentsReducer.productTypes);
    const categories = useSelector((state: IRootState) => state.componentsReducer.categories);
    const brands = useSelector((state: IRootState) => state.componentsReducer.brands);
    const presets = useSelector((state: IRootState) => state.componentsReducer.presets);
    const modelsPresets = useSelector((state: IRootState) => state.componentsReducer.modelsPresets);
    const colors = useSelector((state: IRootState) => state.componentsReducer.colors);
    const models = useSelector((state: IRootState) => state.componentsReducer.models);
    const user = useSelector((state: any) => state.authReducer.user);
    const model: any = product && productModels?.filter(((item: any) => item.is_primary))[0];
    const [productTypeId, setProductTypeId] = useState(product?.product_type_id || "");
    const [categoryId, setCategoryId] = useState(model?.category_id || "");
    const [brandId, setBrandId] = useState(model?.brand_id || "");
    const [modelValue, setModelValue] = useState(model?.name || "");
    const [canvasLayerLevel, setCanvasLayerLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [colorItems, setColorItems] = useState<any>([])

    const addModelColors = () => {
        setColorItems((prevState: any) => [...prevState, { name: "", value: "", image_url: "", price_sg: "", price_gb: "", price_us: "", price_in: "" }])
    }

    const removeModelColors = () => {
        setColorItems((prevState: any) => {
            const newState = [...prevState];
            newState.pop();
            return [...newState];
        })
    }

    useEffect(() => {
        if (model) {
            const newColorItems = colors.filter((color: any) => color.model_id === model.id).map((color: any) => {
                const { name, value, image_url, price_sg, price_gb, price_us, price_in } = color;
                return { name, value, image_url, price_sg, price_gb, price_us, price_in };
            });
    
            if (newColorItems.length > 0) {
                setColorItems(newColorItems);
            }
        }
    }, [colors, model]);

    const handleModelColorTextChange = (e: any, index: number, key: string) => {
        setColorItems((prevState: any) => {
            const newState = [...prevState];
            newState[index][key] = e.target.value;
            return [...newState];
        })
    }

    const getPresetCheckState = (preset_id: string) => {
        return modelsPresets.filter((item: any) => {
            return item.model_id === model?.id && item.preset_id === preset_id
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

    const getSKU = () => {
        const filterArray = (arrayData: any, id: string): any => {
            const filteredItem: any = Object.entries(arrayData).filter((item: any) => item[0] === id)[0];
            return id ? filteredItem?.[1] : ""
        }
        return generateSKU(filterArray(productTypes, productTypeId), filterArray(brands, brandId), modelValue)
    }

    const handleFormUpdate = (formData: any) => {
        updateModel(product.id, formData)
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
        createModel(formData)
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

    const handleFormSubmission = product ? handleFormUpdate : handleFormCreation;

    const showOffsets = (Object.values(categories)[0] === categories[categoryId]) || (Object.values(categories)[3] === categories[categoryId]) || Object.values(categories)[4] === categories[categoryId];
    const showFrameSetOffsets = Object.values(categories)[0] === categories[categoryId];
    const showFrameSetStemOffsets = Object.values(categories)[0] === categories[categoryId] || (Object.values(categories)[3] === categories[categoryId]);
    const showStemHandleBarOffsets = Object.values(categories)[3] === categories[categoryId] || Object.values(categories)[4] === categories[categoryId];

    return (
        <form aria-describedby="form-error" action={handleFormSubmission}>
            <div className="rounded-md bg-gray-100 p-4 md:p-6">
                <div className="flex gap-4 mb-4">
                    {/* SKU */}
                    <TextField name='sku' type='text' readOnly style={{ cursor: "not-allowed" }} label='SKU' value={productTypeId || brandId || model ? getSKU() : product?.sku || "--"} placeholder='SKU' fullWidth />
                    {/* Product Type */}
                    <div className='w-full'>
                        <div className="mb-2 flex items-center justify-between text-sm font-medium">
                            <label htmlFor="product_type_id">
                                Product Type
                            </label>
                        </div>
                        <div className="relative">
                            <select
                                id="product_type_id"
                                name="product_type_id"
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                value={productTypeId ?? product?.product_type_id ?? ""}
                                onChange={(e) => setProductTypeId(e.target.value)}
                                aria-describedby="product_type_id-error"
                            >
                                <option value="" disabled>
                                    Select a product type
                                </option>
                                {
                                    Object.entries(productTypes).map((item: any) => (
                                        <option key={item[1]} value={item[0]}>{item[1]}</option>
                                    ))
                                }
                            </select>
                            <TimerOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mb-4">
                    {/* Vendor */}
                    <TextField name='vendor' type='text' defaultValue={product?.vendor} label='Vendor' placeholder='Vendor' fullWidth />
                    {/* Buy Price US */}
                    <TextField name='buy_price_us' step={0.01} min={0.0} defaultValue={product ? product?.buy_price_us ?? 0.00 : null} label='Buy Price USD' placeholder='Buy Price USD' fullWidth />
                </div>

                <div className="flex gap-4 mb-4">
                    {/* Location */}
                    <TextField name='location' type='text' defaultValue={product?.location} label='Location' placeholder='Location' fullWidth />
                    {/* Lead Time */}
                    <TextField name='lead_time' type='text' defaultValue={product?.lead_time} label='Lead Time' placeholder='Lead Time' fullWidth />
                </div>

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
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 accent-primary"
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
                                value={brandId ?? model?.brand_id ?? ""}
                                onChange={(e) => setBrandId(e.target.value)}
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
                            className="flex items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Add Brands
                            <AddOutlined className="pointer-events-none" />
                        </Link>
                    </div>
                </div>

                <div className='flex gap-5'>
                    {/* Model */}
                    <TextField name='model' type='text' value={modelValue} onChange={(e: any) => setModelValue(e.target.value)} label='Model' placeholder='Model name' fullWidth />
                    {/* Preview Image URL */}
                    <TextField name='preview_image_url' type='text' defaultValue={model?.preview_image_url} label='Preview Image URL' fullWidth />
                </div>

                <div className='flex gap-5'>
                    {/* Actual width */}
                    <TextField name='actual_width' defaultValue={model?.actual_width} label='Actual width' fullWidth />
                    {/* Size chart URL */}
                    <TextField name='size_chart_url' type='text' defaultValue={model?.size_chart_url} label='Size chart URL' fullWidth />
                </div>

                {/* Colors */}
                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium">
                        Model colors
                    </label>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className='flex gap-2 items-center'>
                            {/* Model Color Name */}
                            <TextField name='color_name' defaultValue={model?.color_name} type='text' placeholder='Model Color Name' fullWidth />
                            {/* Model Color Value */}
                            <TextField name='color_value' defaultValue={model?.color_value} type='text' placeholder='Model Color Value' fullWidth />
                            {/* Image URL */}
                            <TextField name='image_url' type='text' defaultValue={model?.image_url} placeholder='Model Color Image URL' fullWidth />
                            <div className='flex min-w-[45%] basis-1/2 w-full gap-3'>
                                {/* Price */}
                                <TextField name='price_sg' step={0.01} min={0.0} defaultValue={model ? model?.price_sg ?? 0.00 : ""} placeholder='Price SGD' fullWidth />
                                <TextField name='price_us' step={0.01} min={0.0} defaultValue={model ? model?.price_us ?? 0.00 : ""} placeholder='Price USD' fullWidth />
                                <TextField name='price_in' step={0.01} min={0.0} defaultValue={model ? model?.price_in ?? 0.00 : ""} placeholder='Price INR' fullWidth />
                                <TextField name='price_gb' step={0.01} min={0.0} defaultValue={model ? model?.price_gb ?? 0.00 : ""} placeholder='Price GBP' fullWidth />
                                {
                                    colorItems.length === 0 &&
                                    <div className='flex gap-2 text-primary items-center mb-4 mt-2'>
                                        <AddOutlined className='cursor-pointer' fontSize='large' onClick={addModelColors} />
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            colorItems.map((colorItem: any, index: number) => (
                                <div key={index} className='flex gap-2 items-center'>
                                    {/* Model Color Name */}
                                    <TextField name='model_color_name' value={colorItem.name} onChange={(e: any) => { handleModelColorTextChange(e, index, "name") }} type='text' placeholder='Model Color Name' fullWidth />
                                    {/* Model Color Value */}
                                    <TextField name='model_color_value' value={colorItem.value} onChange={(e: any) => { handleModelColorTextChange(e, index, "value") }} type='text' placeholder='Model Color Value' fullWidth />
                                    {/* Model Color Image URL */}
                                    <TextField name='model_color_image_url' value={colorItem.image_url} onChange={(e: any) => { handleModelColorTextChange(e, index, "image_url") }} type='text' placeholder='Model Color Image URL' fullWidth />
                                    <div className='flex min-w-[45%] basis-1/2 w-full gap-3'>
                                        {/* Model Color Price */}
                                        <TextField name='model_color_price_sg' value={colorItem.price_sg} onChange={(e: any) => { handleModelColorTextChange(e, index, "price_sg") }} step={0.01} min={0.0} placeholder='Price SGD' fullWidth />
                                        <TextField name='model_color_price_us' value={colorItem.price_us} onChange={(e: any) => { handleModelColorTextChange(e, index, "price_us") }} step={0.01} min={0.0} placeholder='Price USD' fullWidth />
                                        <TextField name='model_color_price_in' value={colorItem.price_in} onChange={(e: any) => { handleModelColorTextChange(e, index, "price_in") }} step={0.01} min={0.0} placeholder='Price INR' fullWidth />
                                        <TextField name='model_color_price_gb' value={colorItem.price_gb} onChange={(e: any) => { handleModelColorTextChange(e, index, "price_gb") }} step={0.01} min={0.0} placeholder='Price GBP' fullWidth />
                                        {
                                            index === (colorItems.length - 1) &&
                                            <div className='flex gap-2 text-primary items-center mb-4 mt-2'>
                                                <AddOutlined className='cursor-pointer' fontSize='large' onClick={addModelColors} />
                                                <RemoveOutlined className='cursor-pointer' fontSize='large' onClick={removeModelColors} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <input
                            type="hidden"
                            name="color_props"
                            value={JSON.stringify(colorItems)}
                        />
                    </div>
                </div>

                {/* Length */}
                <MultipleInput initialItems={model?.lengths} title='Length values' buttonText={<>Add&nbsp;Length</>} name='lengths' placeholder='Length values' />

                {/* Size */}
                <MultipleInput initialItems={model?.sizes} title='Size values' buttonText={<>Add&nbsp;Size</>} name='sizes' placeholder='Size values' />

                {/* Ratio */}
                <MultipleInput initialItems={model?.ratios} title='Ratio values' buttonText={<>Add&nbsp;Ratio</>} name='ratios' placeholder='Ratio values' />

                <div className="flex gap-5">
                    {/* Linked Stem */}
                    <SelectField name='linked_stem' label='Linked Stem' defaultValue={model?.linked_stem || ""} placeholder='None' placeholderDisabled={false}>
                        {
                            models.filter((item: any) => item.category === "Stem" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>

                    {/* Linked Handle Bar */}
                    <SelectField name='linked_handle_bar' label='Linked Handle Bar' defaultValue={model?.linked_handle_bar || ""} placeholder='None' placeholderDisabled={false}>
                        {
                            models.filter((item: any) => item.category === "Handle Bar" && item.is_primary).map((item: any) => (
                                <option key={item.model} value={item.id}>{item.brand + " - " + item.model}</option>
                            ))
                        }
                    </SelectField>
                </div>

                {/* Steerer Size */}
                <TextField name='steerer_size' type='text' defaultValue={model?.steerer_size} label='Steerer Size' placeholder='Steerer Size' fullWidth />

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
                                                        {item[1]}
                                                    </label>
                                                    <input
                                                        id={"preset_" + item[1]}
                                                        name={"preset_" + item[1]}
                                                        type="checkbox"
                                                        value={model?.id + "_" + item[0]}
                                                        disabled={categories[categoryId] === 'Group Set - Drivetrain' ? false : checkExistingModelPreset(item[0])}
                                                        defaultChecked={getPresetCheckState(item[0])}
                                                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 accent-primary"
                                                        aria-describedby={`${"preset_" + item[1]}-error`}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <Link
                                        href="/dashboard/components/create/builds"
                                        className="flex items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-2"
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
                                    <TextField name='aerodynamics' step={0.1} min={0.0} max={5.0} defaultValue={model?.aerodynamics ?? "0.0"} label='Aerodynamics' />

                                    {/* Weight */}
                                    <TextField name='weight' step={0.1} min={0.0} max={5.0} defaultValue={model?.weight ?? "0.0"} label='Weight' />

                                    {/* Comfort */}
                                    <TextField name='comfort' step={0.1} min={0.0} max={5.0} defaultValue={model?.comfort ?? "0.0"} label='Comfort' />

                                    {/* Stiffness */}
                                    <TextField name='stiffness' step={0.1} min={0.0} max={5.0} defaultValue={model?.stiffness ?? "0.0"} label='Stiffness-to-Weight' />

                                    {/* Overall */}
                                    <TextField name='overall' step={0.1} min={0.0} max={5.0} defaultValue={model?.overall ?? "0.0"} label='Overall' />
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
                                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 accent-primary"
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
                                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 accent-primary"
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
                                                    {/* Canvas Marker Offset X */}
                                                    <TextField name='canvas_marker_x' defaultValue={model?.canvas_marker_x ?? "0"} label='Canvas Marker Offset X' />

                                                    {/* Canvas Marker Offset Y */}
                                                    <TextField name='canvas_marker_y' defaultValue={model?.canvas_marker_y ?? "0"} label='Canvas Marker Offset Y' />
                                                </div>

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
                    className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setLoading(true)}
                    disabled={user.permission > 1}
                >
                    <span className="hidden md:block">{product ? "Update Component" : "Create Component"}</span>
                </button>
                {
                    loading ? <div className='self-center'><Loading small /></div> : null
                }
            </div>
            <ToastContainer autoClose={3500} position="top-right" />
        </form >
    );
}

function TextField({ type, name, defaultValue, label, step, min, max, placeholder, value, onChange, disabled, style, readOnly, fullWidth }: { type?: string, name: string, defaultValue?: string, label?: string, step?: number, min?: number, max?: number, placeholder?: string, value?: string, onChange?: any, disabled?: boolean, style?: any, readOnly?: boolean, fullWidth?: boolean }) {
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
                        className={`peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500 disabled:cursor-not-allowed ${max ? "min-w-[200px]" : ""}`}
                        aria-describedby={`${name}-error`}
                        disabled={disabled}
                        readOnly={readOnly}
                        style={style}
                    />
                    {/* <PersonOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                </div>
            </div>
        </div>

    )
}
