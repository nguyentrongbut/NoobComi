import "@/app/globals.css";
import { sendRequest } from "@/utils/api";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

function extractIdFromSlug(slug: string): string {
    const temp = slug?.split(".html") ?? [];
    const temp1 = temp[0]?.split("-");
    return temp1[temp1.length - 1];
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string[] };
}): Promise<Metadata> {
    const id = extractIdFromSlug(params.slug[0]);
    const id1 = extractIdFromSlug(params.slug[1]);

    const res = await sendRequest<ITopComics>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/all-comics/${id}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    // fetch data
    const res1 = await sendRequest<IChapter>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/chapters/${id1}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return {
        title: `${res?.title} ${res1?.title} | MangaNoob (Open Beta)`,
        description: `${res?.title} ${res1?.title} | MangaNoob (Open Beta)`,
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string[] };
}) {
    const id = extractIdFromSlug(params.slug[1]);
    
    const res1 = await sendRequest<IChapter>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/chapters/${id}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });
    return (
        <html lang="en">
            <body className={`disabled-scroll ${poppins.className}`}>{children}</body>
        </html>
    );
}
