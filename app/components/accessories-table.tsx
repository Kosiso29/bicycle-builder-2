// @ts-nocheck

import Link from "next/link";
import Loading from "./loading";
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { deleteModel } from "../lib/actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import YesNo from "./yesno";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function AccessoriesTable({ models }) {
    const [loadingForDelete, setLoadingForDelete] = useState(false);
    const [answer, setAnswer] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const mounted = useRef(false);
    const user = useSelector(state => state.authReducer.user);

    const handleDelete = (id) => {
        setDeleteId(id);
    }

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (answer === "yes") {
            setLoadingForDelete(true);
            deleteModel(deleteId).then(() => {
                setDeleteId("");
                setLoadingForDelete(false);
                setAnswer("");
                toast.success("Component deleted!")
            })
                .then(() => window.location.reload())
                .catch(error => {
                    toast.error(`Component failed to delete: ${error}`)
                });
        }
        if (answer === "no") {
            setAnswer("");
            setDeleteId("");
        }
    }, [answer, deleteId])

    return (
        <div className="flow-root max-w-full">
            <div className="inline-block min-w-full align-middle max-w-full">
                <div className="rounded-lg bg-gray-100 p-2 max-w-full">
                    <table className="hidden min-w-full text-gray-900 lg:table max-w-full">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Accessory name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Brand name
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Model name
                                </th>
                                <th scope="col" className="relative px-3 py-5 font-medium">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white max-w-full">
                            {models.length > 0 && models?.map((model) => (
                                <tr
                                    key={model.id}
                                    className="w-full max-w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {model.accessory}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {model.brand}
                                    </td>
                                    <td className="py-3 pl-6 pr-3 max-w-48">
                                        {model.model}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/dashboard/components/${model.id}/edit`}
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <EditOutlined className="w-5" />
                                            </Link>
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed"
                                                onClick={() => handleDelete(model.id)}
                                                disabled={user.permission > 1}
                                            >
                                                {
                                                    loadingForDelete && (model.id === deleteId) ? <div className="self-center justify-self-end"><Loading small /></div> : <DeleteOutline className="w-5" />
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
                        !mounted.current && !models && <Loading />
                    }
                </div>
            </div>
            <YesNo setAnswer={setAnswer} show={!!deleteId && !answer} message="Delete component?" />
            <ToastContainer autoClose={3500} position="top-right" />
        </div>
    )
}
