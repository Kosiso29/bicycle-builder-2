import Form from "@/app/components/form";
import { fetchProductById, fetchModelsByProductId } from "@/app/lib/data";
import FormContainer from "@/app/components/form-container";

export default async function Page({ params }: { params: { id: string } }) {

    const product = await fetchProductById(params.id);
    const productModels = await fetchModelsByProductId(params.id);

    return (
        <div>
            <FormContainer product={product} productModels={productModels} />
        </div>
    );
}
