import Builder from "../components/builder";
import { fetchModels, fetchBuilds, fetchModelsPresets, fetchColors, fetchAccessoryModels } from "@/app/lib/data";

// Types
import { Models } from "@/app/lib/definitions";

export default async function Build() {
 
    const models: Models = await fetchModels();
    const builds = await fetchBuilds();
    const modelsPresets = await fetchModelsPresets();
    const colors = await fetchColors();
    const accessoryModels = await fetchAccessoryModels();

    return (
        <main>
            <Builder models={models} builds={builds} modelsPresets={modelsPresets} colors={colors} accessoryModels={accessoryModels} />
        </main>

    );
}
