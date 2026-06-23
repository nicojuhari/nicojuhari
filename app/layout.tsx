import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";

const dmSans = DM_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: { template: "%s", default: "Web Developer for Business Growth | Nicolae Cojuhari" },
    description:
        "Web developer building local business websites, Shopify stores, and custom web apps - designed to get found, convert visitors, and grow revenue.",
    metadataBase: new URL("https://nicojuhari.com"),
    openGraph: { type: "website", locale: "en_US", siteName: "Nicojuhari" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}>
            <head>
                <meta name="apple-mobile-web-app-title" content="Nicojuhari" />
            </head>
            <body className="min-h-full flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
