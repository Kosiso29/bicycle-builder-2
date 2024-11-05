'use client'

export default function Badge({ featureKey, featureValue }: { featureKey: any, featureValue: any }) {
    if (!featureValue) {
        return null;
    }

    return (
        <span className='flex justify-center items-center border border-black min-w-6 min-h-5 text-sm px-1' style={{ backgroundColor: featureKey === "colors" ? featureValue : null }}>
            {
                featureKey !== "colors" && featureValue
            }
        </span>
    )
}
