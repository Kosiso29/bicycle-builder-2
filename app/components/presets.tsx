import { Button } from "@mui/material";

export default function Presets({ models }: { models: any }) {
    const presets = () => {
        return [
            { title: "Aerodynamics", buttonText: "build preset" },
            { title: "Lightweight", buttonText: "build preset" },
        ]
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">Presets</h1>
            {
                presets()?.map((item: any) => (
                    <div key={item.title}>
                        <h2 className="mb-2">{item.title}</h2>
                        <Button size="small" variant="contained" onClick={() => { }}>{item.buttonText}</Button>
                    </div>
                ))
            }
        </div>
    )
}
