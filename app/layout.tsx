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
    title: { template: "%s", default: "Nicolae Cojuhari - Software Engineer · Finance · AI" },
    description:
        "Software engineer with a finance background. I use AI to build financial and productivity apps for web and mobile - tools that replace spreadsheets and manual workflows.",
    metadataBase: new URL("https://nicojuhari.com"),
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Nicojuhari",
        images: [
            {
                url: "/nicojuhari-og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Nicolae Cojuhari - Software Engineer · Finance · AI",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/nicojuhari-og-image.jpg"],
    },
};

const IS_PROD = process.env.NODE_ENV === "production";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}>
            <head>
                <meta name="apple-mobile-web-app-title" content="Nicojuhari" />
                {IS_PROD && <script src="https://analytics.ahrefs.com/analytics.js" data-key="oLK5Eic+ybj6R/BmfI3gUA" async></script>}
            </head>
            <body className="min-h-full flex flex-col">
                <Header />
                <main className="min-w-0 flex-1 overflow-x-hidden pt-16 sm:pt-20">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
