import Link from 'next/link'
import React from 'react'

const quickLinks = [
    { name: "Home", href: "/"},
    { name: "About Us", href: "/about-us"},
    { name: "Terms of Service", href: "/terms-of-service"},
    { name: "Cancellation & Refund Policy", href: "/refund-policy"},
    { name: "Privacy Policy", href: "/privacy-policy"},
]

// Not currently required.
const supports = [
    { name: "Bike sizing and fit guide", href: "/"},
    { name: "Delivery", href: "/"},
    { name: "Returns", href: "/"},
    { name: "Manuals and user guide", href: "/"},
]

const contacts = [
    { name: "Email: info@cyke.life", href: "mailto:info@cyke.life"},
    { name: "Phone: +91-9444160090", href: "tel:+919444160090"},
    { name: <>Address: No 39/15 Balakrishna Naicken St Extn <br /> West Mambalam, Chennai - 600033 <br /> Tamil Nadu, India</>, href: "#"},
]

export default function Footer() {
    return (
        <div className='py-20 wrapper'>
            <div className='flex justify-evenly gap-[30%]'>
                <div className='flex gap-36'>
                    <div>
                        <h2 className='text-xl font-[500]'>Quick Links</h2>
                        {
                            quickLinks.map((quickLink: any) => (
                                <p key={quickLink.name}>
                                    <Link href={quickLink.href}>{ quickLink.name }</Link>
                                </p>
                            ))
                        }
                    </div>
                    {/* <div>
                        <h2 className='text-xl font-[500]'>Support</h2>
                        {
                            supports.map((support: any) => (
                                <p key={support.name}>
                                    <Link href={support.href}>{ support.name }</Link>
                                </p>
                            ))
                        }
                    </div> */}
                </div>
                <div>
                    <h2 className='text-xl font-[500] w-[25rem]'>Contact Information</h2>
                    {
                        contacts.map((contact: any) => (
                            <p key={contact.name}>
                                <Link href={contact.href}>{ contact.name }</Link>
                            </p>
                        ))
                    }
                    <form className='flex justify-between gap-5 py-5'>
                        <input className='focus:outline-none focus:border-black flex-grow border border-gray-400 rounded-none px-3' type="text" placeholder='Your email address' />
                        <button type='submit' className='border-none text-white p-3 bg-[#1A1A1A]'>SUBMIT</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
