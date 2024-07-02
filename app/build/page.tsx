import Builder from "../components/builder";
import { fetchModels, fetchPresets, fetchModelsPresets } from "@/app/lib/data";

// Types
import { Models } from "@/app/lib/definitions";

export default async function Build() {
 
    const models: Models = await fetchModels();
    const presets = await fetchPresets();
    const modelsPresets = await fetchModelsPresets();

    return (
        <main>
            <Builder models={models} presets={presets} modelsPresets={modelsPresets} />
        </main>

    );
}
