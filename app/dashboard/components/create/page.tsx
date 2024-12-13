import FormContainer from "@/app/components/form-container";

export default function Page() {

    return (
        <div>
            <h1 className='text-4xl text-primary'>
                Create Component
            </h1>
            <div className='bg-white w-full mt-8 rounded-lg md:p-8 py-8 px-2 h-auto'>
                <FormContainer />
            </div>
        </div>
    );
}
