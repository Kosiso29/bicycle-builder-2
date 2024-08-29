import Form from "@/app/components/accessory-form";
import { fetchAccessoryModelById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {

    const model = await fetchAccessoryModelById(params.id);

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Edit Accessory
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <Form model={model} />
            </div>
        </div>
    );
}
