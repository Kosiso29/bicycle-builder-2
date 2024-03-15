// @ts-nocheck
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Loading from "../../../../components/loading";
import { CancelOutlined } from '@mui/icons-material';
import { createBrands } from "@/app/lib/actions";
import { ToastContainer } from 'react-toastify';

const MultiItemTextField = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const addItem = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setItems(prevItems => [...prevItems, inputValue]);
            setInputValue('');
        }
    };

    const removeItem = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleFormSubmission = () => {
        const brands = items.length > 0 ? items : [inputValue];
        createBrands(brands)
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                window.location.href = "/dashboard/components/create"
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
                        <div className="">
                            <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                                Brand names
                            </label>
                            <div className="flex items-center w-full">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Add brand"
                                    className="p-2 border border-gray-200 rounded-l w-full text-sm focus:outline-none"
                                />
                                <button
                                    onClick={addItem}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r hover:bg-blue-600 focus:outline-none"
                                >
                                    Add&nbsp;Brand
                                </button>
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {items.map((item, index) => (
                                    <li key={index} className="inline-flex gap-2 w-fit items-center justify-between p-2 bg-gray-300 rounded">
                                        <span>{item}</span>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="hover:text-red-700 focus:outline-none"
                                        >
                                            <CancelOutlined fontSize='small' />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/components/create"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <button
                            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            onClick={() => setLoading(true)}
                        >
                            <span className="hidden md:block">Create Brands</span>
                        </button>
                        {
                            loading ? <div className='self-center'><Loading small /></div> : null
                        }
                    </div>
                </form>
            </div>
            <ToastContainer autoClose={3500} position="bottom-left" />
        </div>
    );
};

export default MultiItemTextField;
