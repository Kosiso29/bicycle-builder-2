import Builder from "../components/builder";
import { fetchModels } from "@/app/lib/data";

// Types
import { Models } from "@/app/lib/definitions";

export default async function Build() {
 
    const models: Models = await fetchModels();

    return (
        <main>
            <Builder models={models} />
        </main>

    );
}
