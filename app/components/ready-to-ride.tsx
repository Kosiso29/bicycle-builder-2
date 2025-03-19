import CTA from "@/app/ui/call-to-action";

export default function ReadyToRide() {
    return (
        <div className="bg-[url('/Ready-To-Ride.png')] bg-[length:50%] bg-no-repeat bg-left-bottom 3xl:bg-left-top bg-[#1A1A1A]">
            <div className="flex items-center justify-end h-[25rem] md:h-[30rem] lg:h-[37rem] xl:h-[45rem] wrapper text-white">
                <div className='max-w-[45%] md:max-w-[40%]'>
                    <span className='text-5xl font-extrabold'>
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
        </div>
    )
}
