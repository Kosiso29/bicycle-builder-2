import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email, items, total } = await req.json(); // Get the request body

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
                <p>Total: <strong>${total}</strong></p>
                <ul>
                    ${Object.entries(items).map((entries: any) => `<li>${entries[0]} x ${entries[1].price}</li>`).join('')}
                </ul>
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
