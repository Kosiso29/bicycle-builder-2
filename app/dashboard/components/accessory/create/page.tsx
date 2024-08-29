import AccessoryForm from "@/app/components/accessory-form";

export default function Page() {

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Create Accessory
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <AccessoryForm />
            </div>
        </div>
    );
}
