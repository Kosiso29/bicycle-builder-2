// @ts-nocheck

import Link from "next/link";
import Loading from "./loading";
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import Image from "next/image";

export default function Table({ models }) {
    return (
        <div className="flow-root max-w-full">
            <div className="inline-block min-w-full align-middle max-w-full">
                <div className="rounded-lg bg-gray-100 p-2 max-w-full">
                    <div className="lg:hidden">
                    {models?.map((model) => (
                        <div
                            key={model.id}
                            className="mb-2 w-full rounded-md bg-white p-4"
                        >
                            <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-4">
                                <div>
                                    <div className="mb-2 flex items-center">
                                        {model.schedule_name}
                                    </div>
                                    <div className='flex justify-between gap-2'>
                                        <span>{model.schedule_type}</span>
                                        <span>
                                            {
                                                model.status === 'active' ?
                                                    <span
                                                        className="w-fit flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                                                    >
                                                        {model.status}
                                                    </span> :
                                                    <span
                                                        className="w-fit flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-400 px-3 py-1.5 text-xs font-medium text-white"
                                                    >
                                                        {model.status}
                                                    </span>
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center">
                                        {/* {model.switches.toString().replace(/[|]/g, "").replace(/,/g, ' ')} */}
                                    </div>
                                    <div>
                                        {/* {
                                            Object.entries(daysMap).map((entry, index) => {
                                                if (model.days.includes(entry[0])) {
                                                    return <span key={entry[1] + index} className='mr-1 text-primary font-bold'>{entry[1]}</span>
                                                }
                                                return <span key={entry[1] + index} className='mr-1 text-gray-400'>{entry[1]}</span>
                                            })
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full items-center justify-between pt-4">
                                <div>
                                    <p className="text-xl font-medium">
                                        {model.from} / {model.start_date}
                                    </p>
                                    <p>{model.to} / {model.end_date}</p>
                                </div>
                                <div className="flex justify-end gap-2">
                                    {/* <Link
                                        href={`/dashboard/model`}
                                        className="rounded-md border p-2 hover:bg-gray-100"
                                    >
                                        <PencilIcon className="w-5" />
                                    </Link>
                                    <Link
                                        href={`/dashboard/model`}
                                        className="rounded-md border p-2 hover:bg-gray-100"
                                    >
                                        <TrashIcon className="w-5" />
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    <table className="hidden min-w-full text-gray-900 lg:table max-w-full">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Model name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Brand name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    <span className="inline-flex justify-center w-full">Image</span>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    <span className="inline-flex justify-center w-full">Actual width</span>
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
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {model.model}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {model.brand}
                                    </td>
                                    <td className="relative">
                                        <div className="relative my-[1px] w-auto h-12">
                                            <Image src={model.src} layout="fill" objectFit="contain" alt={model.model} />
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className="inline-flex justify-center w-full">{model.actualWidth}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/dashboard/edit`}
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <EditOutlined className="w-5" />
                                            </Link>
                                            <Link
                                                href={`/dashboard/delete`}
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <DeleteOutline className="w-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-8'>
                    {
                        models.length === 0 && <Loading />
                    }
                </div>
            </div>
        </div>
    )
}
