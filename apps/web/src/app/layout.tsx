import { AppProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { Metadata } from "next";

const siteConfig = {
    name: "Kairo",
    description: "Build and manage your stories with AI-powered tools.",
    url: "https://kairo-web.vercel.app",
    ogImage: "https://kairo.com/og.png",
};

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Storytelling",
        "AI",
        "Content Creation",
        "Writing Assistant",
    ],
    authors: [
        {
            name: "Tushar Banik",
            url: "https://vibe-portfolio.vercel.app",
        },
    ],
    creator: "Tushar Banik",

    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@cool_debugger"
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scrollbar" suppressHydrationWarning>
            <body
                className="min-h-screen bg-background text-foreground antialiased font-default! overflow-x-hidden" suppressHydrationWarning
            >
                <AppProvider>
                    {children}
                </AppProvider>
                <Toaster richColors theme="dark" position="top-center" />
            </body>
        </html>
    );
};