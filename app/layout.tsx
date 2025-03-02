import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import Navbar from "./Navbar";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <meta
                    name="google-site-verification"
                    content="rwX1Qrd0op33GUncZyN-dBxM41A0BxmO7XryoMuViEY"
                />
            </head>
            <body className="antialiased">
                <QueryClientProvider>
                    <AuthProvider>
                        <Theme
                            accentColor="violet"
                            grayColor="mauve"
                            hasBackground={false}
                        >
                            <Navbar />
                            <main className="p-5">
                                <Container>{children}</Container>
                            </main>
                        </Theme>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
