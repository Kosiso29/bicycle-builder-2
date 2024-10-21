import NextImage from "next/image";

export default function OurHistory() {
    return (
        <div className='flex justify-between gap-10 pt-32 pb-20 wrapper-padding'>
            <div className="pt-5 max-w-[38%]">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold mb-5">OUR HISTORY</h1>
                    <p className="text-lg">Founded in [Year], [Your Company Name] began in a small workshop with a simple goal: to craft high-performance, custom-made bikes that balance innovative design with unmatched quality. Every bike we create is the result of meticulous attention to detail, using only the finest materials and cutting-edge technology to ensure every frame, wheel, and component meets the highest standards.</p>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">OUR VALUES</h1>
                    <div>
                        <h2 className="text-lg font-bold my-5">Craftsmanship</h2>
                        <p className="text-lg">We take pride in hand-building each bike with precision, ensuring it delivers both performance and beauty.</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold my-5">Innovation</h2>
                        <p className="text-lg">We are constantly pushing the boundaries of design, using advanced technology to create bikes that stand the test of time.</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold my-5">Community</h2>
                        <p className="text-lg">As lifelong cyclists, we’re deeply connected to the riding community. We’re not just building bikes; we’re building relationships that last a lifetime.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-5 min-w-[50%]">
                <div className="flex flex-grow flex-col items-center pt-10 gap-10">
                    <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Our-History-1.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                    <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Our-History-2.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                    <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Our-History-4.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                </div>
                <div className="flex flex-grow flex-col items-center gap-5">
                    <NextImage className='!block !static !w-full !h-auto !max-w-full pl-5' src="/Our-History-1.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                    <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Our-History-3.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                    <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Our-History-5.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                </div>
            </div>
        </div>
    )
}
