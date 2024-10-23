import React from 'react';
import Image from "next/image";

export default function PartnerSection() {
    return (
        <div className='bg-[#1A1A1A]'>
            <div className='flex justify-between items-center h-20 wrapper'>
                <Image src="/partners/Trek_Bicycle_Corporation-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Giant_Bicycles-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Cube_Bikes-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Cinelli-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Canyon_Bicycles-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Specialized_Bicycle_Components-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Cannondale_Bicycle_Corporation-Logo.png" width={100} height={5} alt='' />
                <Image src="/partners/Pinarello-Logo.png" width={20} height={5} alt='' />
            </div>
        </div>
    )
}
