import { AppProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

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
                    <Toaster richColors theme="dark" position="top-right" />
                    {children}
                </AppProvider>
            </body>
        </html>
    );
};