import type { Metadata } from "next";
import { Open_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "./store/provider";
import MUITheme from "@/app/components/mui-theme";
import LoadingScreen from "@/app/components/loading-screen";

const openSans = Open_Sans({ subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cyke",
    description: "At Cyke, we offer road bike enthusiasts a personalized experience to customize their bikes and explore endless possibilities. Upload your current setup, mix and match components, and watch your dream bike come to life in real-time. Whether you want high-end Italian parts or budget-friendly options, Cyke empowers you to build and visualize your perfect bike, providing an ongoing journey of discovery and customization—all at your fingertips.",
    icons: {
      icon: '/Favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={sourceSans3.className}>
                <Providers>
                    <MUITheme>
                        {children}
                        <LoadingScreen />
                    </MUITheme>
                </Providers>
            </body>
        </html>
    );
}
