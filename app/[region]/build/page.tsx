import Builder from "@/app/components/builder";
import { fetchModels, fetchBuilds, fetchModelsPresets, fetchColors, fetchAccessoryModels, fetchColorsPresets } from "@/app/lib/data";

// Types
import { Models } from "@/app/lib/definitions";

export default async function Build() {

    const models: Models = await fetchModels();
    const builds = await fetchBuilds();
    const modelsPresets = await fetchModelsPresets(models);
    const colorsPresets = await fetchColorsPresets();
    const colors = await fetchColors();
    const accessoryModels = await fetchAccessoryModels();

    return (
        <main>
            <Builder models={models} builds={builds} modelsPresets={modelsPresets} colorsPresets={colorsPresets} colors={colors} accessoryModels={accessoryModels} />
        </main>
    );
}
