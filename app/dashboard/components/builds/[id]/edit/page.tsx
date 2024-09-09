import BuildsForm from "@/app/components/builds-form";
import { fetchModelById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Edit Build
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <BuildsForm build_id={params.id} />
            </div>
        </div>
    );
}
