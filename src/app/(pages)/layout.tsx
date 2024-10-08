import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import AppHeader from "@/components/header/app.header";
import NavbarMobile from "@/components/header/navbar.mobile";
import AppFooter from "@/components/footer/app.footer";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "MangaNoob (Open Beta) - Read Comics and Manga Online",
    description: "MangaNoob (Open Beta) - Read Comics and Manga Online",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <AppHeader />
                {children}
                <Toaster />
                <NavbarMobile />
                <AppFooter />
            </body>
        </html>
    );
}
