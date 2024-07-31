import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/header/app.header";
import NavbarMobile from "@/components/header/navbar.mobile";
import AppFooter from "@/components/footer/app.footer";
import Scroll from "@/components/scroll/scroll";

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
            <Scroll />
            <body className={poppins.className}>
                <AppHeader />
                {children}
                <NavbarMobile/>
                <AppFooter />
            </body>
        </html>
    );
}
