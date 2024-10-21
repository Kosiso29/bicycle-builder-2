import CTA from "@/app/ui/call-to-action";

export default function ReadyToRideSection() {
    return (
        <div className="flex items-center justify-center py-40 text-white bg-[#1A1A1A] wrapper-padding">
            <div className='flex flex-col items-center'>
                <span className='text-5xl font-extrabold'>
                    READY TO RIDE?
                </span>
                <div className='mt-10'>
                    <CTA href='/build'>
                        START BUILDING YOUR BIKE
                    </CTA>
                </div>
            </div>
        </div>
    )
}
