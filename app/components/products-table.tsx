// @ts-nocheck

import Link from "next/link";
import Loading from "./loading";
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { deleteProduct, updateProductEnabled } from "../lib/actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import YesNo from "./yesno";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function AccessoriesTable({ products }) {
    const [loadingForDelete, setLoadingForDelete] = useState(false);
    const [loadingForProductEnabled, setLoadingForProductEnabled] = useState(false);
    const [answer, setAnswer] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [productEnabledId, setProductEnabledId] = useState("");
    const [isToggled, setIsToggled] = useState(products?.map((product) => product.enabled));
    const mounted = useRef(false);
    const user = useSelector(state => state.authReducer.user);

    const handleDelete = (id) => {
        setDeleteId(id);
    }

    const handleToggle = (index, product_id) => {
        setIsToggled((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return [...newState];
        });
        setProductEnabledId(product_id);
    }

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        setIsToggled(products?.map((product) => product.enabled));
    }, [products]);

    useEffect(() => {
        if (productEnabledId) {
            setLoadingForProductEnabled(true);
            updateProductEnabled(productEnabledId).then(() => {
                setProductEnabledId("");
                setLoadingForProductEnabled(false);
                toast.success("Product enabled state updated!")
            })
            .then(() => window.location.reload())
            .catch(error => {
                setProductEnabledId("");
                setLoadingForProductEnabled(false);
                toast.error(`Product failed to update product enabled state: ${error}`)
            });
        }
    }, [setLoadingForProductEnabled, productEnabledId])

    useEffect(() => {
        if (answer === "yes") {
            setLoadingForDelete(true);
            deleteProduct(deleteId).then(() => {
                setDeleteId("");
                setLoadingForDelete(false);
                setAnswer("");
                toast.success("Product deleted!")
            })
                .then(() => window.location.reload())
                .catch(error => {
                    toast.error(`Product failed to delete: ${error}`)
                });
        }
        if (answer === "no") {
            setAnswer("");
            setDeleteId("");
        }
    }, [answer, deleteId]);

    return (
        <div className="flow-root max-w-full">
            <div className="inline-block min-w-full align-middle max-w-full">
                <div className="rounded-lg bg-gray-100 p-2 max-w-full">
                    <table className="hidden min-w-full text-gray-900 lg:table max-w-full">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    SKU
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Enabled
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Vendor
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Buy Price
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Price SGD
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Price USD
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Price INR
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Price GBP
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Location
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Lead Time
                                </th>
                                <th scope="col" className="relative px-3 py-5 font-medium">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white max-w-full">
                            {products.length > 0 && products?.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="w-full max-w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {product.sku}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                <input name='enabled' type='checkbox' className='hidden' checked={isToggled[index]} />
                                                <button
                                                    onClick={() => handleToggle(index, product.id)}
                                                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                                                        isToggled[index] ? "bg-primary" : "bg-back-color"
                                                    }`}
                                                    type='button'
                                                >
                                                    <span
                                                        className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                                            isToggled[index] ? "translate-x-1" : "-translate-x-4"
                                                        }`}
                                                    ></span>
                                                </button>
                                            </div>
                                            <div className="self-center justify-self-end" style={{ visibility: loadingForProductEnabled && (product.id === productEnabledId) ? "visible" : "hidden" }}><Loading small /></div>
                                        </div>
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.vendor}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.buy_price_us ?? "0.00"}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.sell_price_sg ?? "0.00"}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.sell_price_us ?? "0.00"}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.sell_price_in ?? "0.00"}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.sell_price_gb ?? "0.00"}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.location}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {product.lead_time}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/dashboard/components/${product.id}/edit`}
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <EditOutlined className="w-5" />
                                            </Link>
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed"
                                                onClick={() => handleDelete(product.id)}
                                                disabled={user.permission > 1}
                                            >
                                                {
                                                    loadingForDelete && (product.id === deleteId) ? <div className="self-center justify-self-end"><Loading small /></div> : <DeleteOutline className="w-5" />
                                                }
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-8'>
                    {
                        !mounted.current && !products && <Loading />
                    }
                </div>
            </div>
            <YesNo setAnswer={setAnswer} show={!!deleteId && !answer} message="Delete product?" />
            <ToastContainer autoClose={3500} position="top-right" />
        </div>
    )
}
