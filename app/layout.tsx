import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./store/provider";
import MUITheme from "@/app/components/mui-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cyke",
    description: "At Cyke, we offer road bike enthusiasts a personalized experience to customize their bikes and explore endless possibilities. Upload your current setup, mix and match components, and watch your dream bike come to life in real-time. Whether you want high-end Italian parts or budget-friendly options, Cyke empowers you to build and visualize your perfect bike, providing an ongoing journey of discovery and customization—all at your fingertips.",
    icons: {
      icon: '/Favicon.png',
    },
};

export const viewport: Viewport = {
    width: '1024',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <MUITheme>
                        {children}
                    </MUITheme>
                </Providers>
            </body>
        </html>
    );
}
