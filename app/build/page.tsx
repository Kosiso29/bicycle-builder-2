import Builder from "../components/builder";
import { fetchModels } from "@/app/lib/data";

export default async function Build() {
 
    const models = await fetchModels();

    return (
        <main>
            <Builder models={models} />
        </main>

    );
}
