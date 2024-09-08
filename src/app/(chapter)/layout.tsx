import "@/app/globals.css";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

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
}: {
  children: React.ReactNode
}) {
  return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
