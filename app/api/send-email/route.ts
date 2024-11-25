import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email, items: { canvasDrawImageProps, addonAccessories, titles }, totalPrice } = await req.json(); // Get the request body

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation`,
            html: `
                <h1>Thank you for your purchase!</h1>
                <p>Total: <strong>${totalPrice}</strong></p>
                <div>
                    <h1> Summary</h1>
                    ${
                        Object.keys(titles).map((item: any, index) => (
                            canvasDrawImageProps[item].brand && titles[item] && `
                            <div>
                                <div class='flex justify-between py-3'>
                                    <h1>${titles[item]}</h1>
                                    <p>
                                        ${canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && canvasDrawImageProps.frameSet.hasStem) && !(titles[item] === 'Handle Bar' && canvasDrawImageProps.frameSet.hasHandleBar) ? canvasDrawImageProps[item].brand + " - " + canvasDrawImageProps[item].model : "---"}
                                        <div class="flex flex-wrap gap-2 pt-2">
                                            ${
                                                Object.entries(canvasDrawImageProps[item].selectedFeatures || {})?.map(([featureKey, featureValue]: any) => (
                                                    `<span class='flex justify-center items-center border border-black min-w-6 min-h-5 text-sm px-1'>
                                                        ${
                                                            featureKey === "colors" ? featureValue.name || "" : featureValue || ""
                                                        }
                                                    </span>`
                                                ))
                                            }
                                        </div>
                                    </p>
                                    <p>${canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && canvasDrawImageProps.frameSet.hasStem) && !(titles[item] === 'Handle Bar' && canvasDrawImageProps.frameSet.hasHandleBar) ? canvasDrawImageProps[item].price : "---"}</p>
                                </div>
                                <hr class='h-[2px] bg-gray-400' />
                            </div>`
                        ))
                    }
                    ${
                        Object.keys(addonAccessories)?.length > 0 ? Object.entries(addonAccessories).map((item: any, index) => (
                            `<div>
                                <div class='flex justify-between py-3'>
                                    <h1>${item[0]}</h1>
                                    <p>${item[1].brand + " - " + item[1].model}</p>
                                    <p>${item[1].price}</p>
                                </div>
                                <hr class='h-[2px] bg-gray-400' />
                            </div>`
                        )) : ""
                    }
                    <div class='flex justify-between py-3'>
                        <h1>Subtotal</h1>
                        <p>${totalPrice}</p>
                    </div>
                </div>
                <p>We hope you enjoy your purchase!</p>
            `,
        });

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return new Response(
            error.message || "Failed to send email",
            { status: 500 }
        );
    }
}
