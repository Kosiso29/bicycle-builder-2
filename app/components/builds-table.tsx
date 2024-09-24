// @ts-nocheck

import Link from "next/link";
import Loading from "./loading";
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { deleteBuild } from "../lib/actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import YesNo from "./yesno";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function AccessoriesTable({ builds }) {
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
            deleteBuild(deleteId).then(() => {
                setDeleteId("");
                setLoadingForDelete(false);
                setAnswer("");
                toast.success("Build deleted!")
            })
                .then(() => window.location.reload())
                .catch(error => {
                    toast.error(`Build failed to delete: ${error}`)
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
                                    Build name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Frame Set
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Wheel Set
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Stem
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Handle Bar
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Group Set
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Saddle
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white max-w-full">
                            {builds?.length > 0 && builds?.map((build) => (
                                <tr
                                    key={build[0].id}
                                    className="w-full max-w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="px-3 py-3">
                                        {build[0].name}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Frame Set") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Front Wheel Set") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Stem") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Handle Bar") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Group Set - Drivetrain") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        {build[1].reduce((acc, item) => {
                                            if (item.category === "Saddle") {
                                                return item.brand + " - " + item.model;
                                            };
                                            return acc;
                                        }, "") || "---"}
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="relative my-[1px] w-auto h-12">
                                            {build[0].image_url ? <Image src={build[0].image_url} sizes="100%" fill style={{ objectFit: "contain" }} alt={build[0].name} /> : <div className="flex items-center h-full">---</div>}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/dashboard/components/builds/${build[0].id}/edit`}
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <EditOutlined className="w-5" />
                                            </Link>
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed"
                                                onClick={() => handleDelete(build[0].id)}
                                                disabled={user.permission > 1}
                                            >
                                                {
                                                    loadingForDelete && (build[0].id === deleteId) ? <div className="self-center justify-self-end"><Loading small /></div> : <DeleteOutline className="w-5" />
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
                        !mounted.current && !builds && <Loading />
                    }
                </div>
            </div>
            <YesNo setAnswer={setAnswer} show={!!deleteId && !answer} message="Delete build?" />
            <ToastContainer autoClose={3500} position="top-right" />
        </div>
    )
}
