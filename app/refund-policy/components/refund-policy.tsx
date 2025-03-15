/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export default function RefundPolicy() {
    return (
        <div className="wrapper my-20">
            <div className='max-w-[60%]'>
            <h1 className="text-2xl font-bold mt-6">Cancellation & Refund Policy</h1>
            <p className="mt-2">
                At Cyke.life, we believe that every rider deserves a bike that’s as unique as they are. That’s why each order is custom-built with precision and care, tailored to your exact specifications. While we stand by the quality of our craftsmanship, we also want to ensure that your experience with us is seamless and worry-free.
            </p>

            <h2 className="text-lg font-bold mt-4">Order Cancellations</h2>
            <ul className="list-disc pl-6">
                <li>Every bike is built specifically for you, which means once an order is placed, it cannot be canceled or modified.</li>
                <li>We encourage you to review your selections carefully before placing your order. If you have any questions, our team is here to assist you before checkout.</li>
            </ul>

            <h2 className="text-lg font-bold mt-4">Returns & Refunds</h2>
            <ul className="list-disc pl-6">
                <li>Since each bike is crafted to your exact preferences, we do not accept returns or offer refunds unless there is a verified defect or damage upon delivery.</li>
                <li>If your bike arrives with an issue, please notify us within 48 hours of delivery, and we’ll work quickly to resolve it.</li>
                <li>To report a problem, reach out to our support team at <a href="mailto:info@cyke.life" className="underline">info@cyke.life</a> with:
                <ul className="list-disc pl-8">
                    <li>Your order details</li>
                    <li>Photos and a description of the issue</li>
                </ul>
                </li>
                <li>Once we assess your request, we’ll provide the best possible solution—whether that’s a repair, replacement, or another resolution that ensures you get the ride you envisioned.</li>
            </ul>

            <h2 className="text-lg font-bold mt-4">Your Ride, Our Commitment</h2>
            <p className="mt-2">
                We’re here to make sure your experience with Cyke.life is as smooth as your ride. If you have any concerns, need guidance, or require assistance, our support team is always ready to help. Reach out to us at <a href="mailto:info@cyke.life" className="underline">info@cyke.life</a>, and we’ll make sure you’re taken care of.
            </p>

            <p className="mt-2">By placing an order with Cyke.life, you agree to these terms.</p>
            </div>
        </div>
    );
}
