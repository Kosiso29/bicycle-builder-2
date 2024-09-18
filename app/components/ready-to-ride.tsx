import CTA from "@/app/ui/call-to-action";

export default function ReadyToRide() {
    return (
        <div className="flex items-center justify-end h-[45rem] wrapper-padding bg-[url('/Ready-To-Ride.png')] bg-no-repeat bg-left-bottom text-white bg-[#1A1A1A]">
            <div className='max-w-[40%]'>
                <span className='text-4xl font-extrabold'>
                    READY TO RIDE?
                </span>
                <p>Start building your custom bike today and experience the difference</p>
                <div className='mt-10'>
                    <CTA href='/build'>
                        START BUILDING YOUR BIKE
                    </CTA>
                </div>
            </div>
        </div>
    )
}
