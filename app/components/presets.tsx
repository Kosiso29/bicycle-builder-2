import { Button } from "@mui/material";

export default function Presets({ models, imageSources }: { models: any, imageSources: any }) {
    const getPresetComponents = (preset: string) => {
        const filteredPresets = models.filter((item: any) => item?.[preset]);
    }

    const presets = () => {
        return [
            { title: "Aerodynamics", buttonText: "build preset", onClick: () => { getPresetComponents("best_aerodynamics") } },
            { title: "Lightweight", buttonText: "build preset", onClick: () => { getPresetComponents("best_lightweight") } },
        ]
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">Presets</h1>
            {
                presets()?.map((item: any) => (
                    <div key={item.title}>
                        <h2 className="mb-2">{item.title}</h2>
                        <Button size="small" variant="contained" onClick={item.onClick}>{item.buttonText}</Button>
                    </div>
                ))
            }
        </div>
    )
}
