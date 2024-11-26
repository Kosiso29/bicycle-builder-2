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
    
            return `${dayOfWeek} ${day} ${month},<br> ${year}`;
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
                <div style="width:500px;margin-left:auto;margin-right:auto">
                    <div style="text-align:center">
                        <h1>BIKE BUILDER</h1>
                        <h1>Thank you for your order!</h1>
                        <p style="padding-left:50px;padding-right:50px;">We have now received your order and will contact you again when your order has been processed. </p>
                        <button style="background-color:#1A1A1A;color:white;padding:0.8rem 4rem;margin:20px 0;cursor:pointer">TRACK ORDER</button>
                        <hr>
                        <p style="margin-top: 50px">LATEST ESTIMATED DELIVERY</p>
                        <h2 style="margin-bottom:50px">${formatDeliveryDate(nextWeek)}</h2>
                    </div>
                    <div style="background-color:#F0EFEF;padding:20px 50px">
                        <p>YOUR DELIVERY DETAILS</p>
                        <hr>
                        <p>YOUR ORDER DETAILS</p>
                        <p>ORDER NO: 0001</p>
                        <p>ORDER DATE: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}</p>
                        <hr>
                        <p>ORDER SUMMARY</p>
                        <table width="100%" style="border-spacing: 50px 0; border-collapse: collapse;">
                            ${
                                Object.keys(titles).map((item: any, index) => (
                                    canvasDrawImageProps[item].brand && titles[item] ? `
                                    <tr>
                                        <td><h3>${titles[item]}</h3></td>
                                        <td style="padding:0 10px;text-align:center">
                                            <p style="margin-botton:0;">${canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && canvasDrawImageProps.frameSet.hasStem) && !(titles[item] === 'Handle Bar' && canvasDrawImageProps.frameSet.hasHandleBar) ? canvasDrawImageProps[item].brand + " - " + canvasDrawImageProps[item].model : "---"}</p>
                                            <div>
                                                ${
                                                    Object.entries(canvasDrawImageProps[item].selectedFeatures || {})?.map(([featureKey, featureValue]: any) => 
                                                        featureKey === "colors" ?
                                                        (featureValue.name ?
                                                        `<span style="display: inline-block; border: 1px solid black; min-width: 1.5rem; min-height: 1.25rem; font-size: 0.875rem; padding: 0.25rem; margin-right: 0.25rem; margin-bottom: 0.25rem">
                                                            ${
                                                                featureValue.name
                                                            }
                                                        </span>` : "") :
                                                        (featureValue ?
                                                        `<span style="display: inline-block; border: 1px solid black; min-width: 1.5rem; min-height: 1.25rem; font-size: 0.875rem; padding: 0.25rem; margin-right: 0.25rem; margin-bottom: 0.25rem">
                                                            ${
                                                                featureValue
                                                            }
                                                        </span>` : "")
                                                    ).join('')
                                                }
                                            </div>
                                        </td>
                                        <td style="text-align:right">${canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && canvasDrawImageProps.frameSet.hasStem) && !(titles[item] === 'Handle Bar' && canvasDrawImageProps.frameSet.hasHandleBar) ? canvasDrawImageProps[item].price : "---"}</td>
                                    </tr>` : ""
                                )).join('')
                            }
                            ${
                                Object.keys(addonAccessories)?.length > 0 ? Object.entries(addonAccessories).map((item: any, index) => (
                                    `<tr>
                                        <td><h3>${item[0]}</h3></td>
                                        <td style="padding:0 10px;text-align:center">${item[1].brand + " - " + item[1].model}</td>
                                        <td style="text-align:right">${item[1].price}</td>
                                    </tr>`
                                )).join('') : ""
                            }
                            <tr>
                                <td><h2>Total</h2></td>
                                <td></td>
                                <td style="text-align:right;"><h3>${totalPrice}</h3></td>
                            </tr>
                        </table>
                    </div>
                </div>
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
