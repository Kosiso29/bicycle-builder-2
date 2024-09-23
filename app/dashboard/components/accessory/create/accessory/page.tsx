'use client'

import MultipleInput from "@/app/ui/multiple-input";
import { createAccessories } from "@/app/lib/actions";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import Loading from "@/app/components/loading";

export default function Page() {
    const user = useSelector((state: any) => state.authReducer.user);
    const [loading, setLoading] = useState(false);

    const handleFormSubmission = (formData: any) => {
        createAccessories(formData)
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                window.location.href = "/dashboard/components/accessory/create"
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Create Accessory
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <form aria-describedby="form-error" action={handleFormSubmission}>
                    <MultipleInput initialItems={[]} title='Accessory' buttonText={<>Add&nbsp;Accessory</>} name='accessories' />
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/components/accessory/create"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <button
                            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setLoading(true)}
                            disabled={user.permission > 1}
                        >
                            <span className="hidden md:block">Create Accessory</span>
                        </button>
                        {
                            loading ? <div className='self-center'><Loading small /></div> : null
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
