import Form from "@/app/components/form";
import { fetchProductById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {

    const product = await fetchProductById(params.id);

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Edit Component
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <Form product={product} />
            </div>
        </div>
    );
}
