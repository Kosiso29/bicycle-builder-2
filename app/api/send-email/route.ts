import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email, items: { canvasDrawImageProps, addonAccessories, titles }, totalPrice, canvasImage } = await req.json(); // Get the request body

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const formatDeliveryDate = (date: any) => {
            const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
            const months = [
                "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];
    
            const dayOfWeek = daysOfWeek[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
    
            return `${dayOfWeek} ${day} ${month}, ${year}`;
        };

        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        const strippedBase64CanvasImage = canvasImage.replace(/^data:image\/\w+;base64,/, "");

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation`,
            html: `
                <h1>BIKE BUILDER</h1>
                <h1>Thank you for your order!</h1>
                <p>We have now received your order and will contact you again when your order has been processed. </p>
                <button>TRACK ORDER</button>
                <p>LATEST ESTIMATED DELIVERY</p>
                <h1>${formatDeliveryDate(nextWeek)}</h1>
                <p>Total: <strong>${totalPrice}</strong></p>
                <div>
                    <p>ORDER SUMMARY</p>
                    <img src="data:image/png;base64,${strippedBase64CanvasImage}" height="150" width="150" alt="bike-image" />
                    ${
                        Object.keys(titles).map((item: any, index) => (
                            canvasDrawImageProps[item].brand && titles[item] && `
                            <div>
                                <div style="display:flex;justify-content:space-between;padding-top:12px;padding-bottom:12px">
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
                                <div style="display:flex;justify-content:space-between;padding-top:12px;padding-bottom:12px">
                                    <h1>${item[0]}</h1>
                                    <p>${item[1].brand + " - " + item[1].model}</p>
                                    <p>${item[1].price}</p>
                                </div>
                                <hr class='h-[2px] bg-gray-400' />
                            </div>`
                        )) : ""
                    }
                    <div style="display:flex;justify-content:space-between;padding-top:12px;padding-bottom:12px">
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
