import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { sendRequest } from "@/utils/api";
import React from "react";
import IconAuthor from "@/components/icon/icon.author";
import IconSave from "@/components/icon/icon.save";
import IconHeart from "@/components/icon/icon.heart";
import IconEye from "@/components/icon/icon.eye";
import IconComment from "@/components/icon/icon.comment";
import { Button } from "@/components/ui/button";
import IconShare from "@/components/icon/icon.share";
import Tab from "@/app/title/@component/tab";
import RatingReadOnly from "@/app/title/[slug]/reviews/@component/rating.read.only";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = extractIdFromSlug(params.slug);

    // fetch data
    const res = await sendRequest<ITopComics>({
        url: `${process.env.WEB_COMIC_API}/api/all-comics/${id}`,
        method: "GET",
    });

    return {
        title: `${res?.title} - MangaNoob (Open Beta)`,
        description: `${res?.title} - ${res?.desc} - MangaNoob (Open Beta)`,
    };
}

function extractIdFromSlug(slug: string): string {
    const temp = slug?.split(".html") ?? [];
    const temp1 = temp[0]?.split("-");
    return temp1[temp1.length - 1];
}

function formatNumber(number: number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(0) + "K";
    } else {
        return number?.toString();
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let params: string | undefined;
    if (React.isValidElement(children) && children.props.segmentPath) {
        params = children.props.segmentPath[3][1];
    }

    const id = params ? extractIdFromSlug(params) : "";

    const data = await sendRequest<ITopComics>({
        url: `${process.env.WEB_COMIC_API}/api/all-comics/${id}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <main className="pb-8 min-h-[100dvh]">
            <header className="bg-white pb-4">
                <div className="max-h-[448px] h-full min-h-[150px] overflow-hidden relative">
                    <Image
                        src={data.banner}
                        width={1000}
                        height={448}
                        alt={data.title}
                        loading="eager"
                        priority={true}
                        className="w-full object-cover h-full object-center"
                    ></Image>
                    <div className="absolute inset-0 banner-overlay--title"></div>
                </div>
                <div className="relative h-52 sm:h-80 -mt-24 sm:-mt-40">
                    <div className="wrapper relative left-0 flex justify-center sm:justify-start space-x-4">
                        <Image
                            src={data?.cover}
                            alt={data?.title}
                            width={230}
                            height={320}
                            loading="eager"
                            className="object-cover min-h-0 h-48 sm:h-80 rounded-md aspect-[5/7] ring-4 ring-black"
                        ></Image>
                        <div className="hidden sm:grid grid-rows-[10rem_1fr_auto]">
                            <div></div>
                            <h2
                                className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold whitespace-nowrap overflow-hidden text-ellipsis mt-2 xl:mt-4"
                                title={data?.title}
                            >
                                {data?.title}
                            </h2>
                            <ul className="flex text-base space-x-4 justify-start">
                                <li className="flex whitespace-nowrap items-center shadow rounded-full py-0.5 px-2 border border-[#a3a3a3] hover:border-[#737373] transition-[border]">
                                    <IconAuthor className="flex-shrink-0 primary-color"></IconAuthor>
                                    <Link href="/author" className="ml-2">
                                        {data?.author?.name}
                                    </Link>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span
                                        className="flex gap-2 items-center"
                                        title={data?.follow?.toString()}
                                    >
                                        <IconSave className="primary-color"></IconSave>
                                        <span>
                                            {formatNumber(data?.follow)}
                                        </span>
                                    </span>
                                    <span
                                        className="flex gap-2 items-center"
                                        title={data?.likes?.toString()}
                                    >
                                        <IconHeart className="primary-color"></IconHeart>
                                        <span>{formatNumber(data?.likes)}</span>
                                    </span>
                                    <span
                                        className="flex gap-2 items-center"
                                        title={data?.views?.toString()}
                                    >
                                        <IconEye className="primary-color"></IconEye>
                                        <span>{formatNumber(data?.views)}</span>
                                    </span>
                                    <span
                                        className="flex gap-2 items-center"
                                        title={data?.totalComment?.toString()}
                                    >
                                        <IconComment className="primary-color"></IconComment>
                                        <span>
                                            {formatNumber(data?.totalComment)}
                                        </span>
                                    </span>
                                    <span className="-mt-0.5 flex items-center gap-2">
                                        <RatingReadOnly
                                            stars={data?.rating}
                                            half={true}
                                        ></RatingReadOnly>
                                        <span className="mt-0.5 text-sm opacity-70">
                                            (
                                            {data?.rating
                                                ? `${data.rating}`
                                                : "0.0"}
                                            )
                                        </span>
                                    </span>
                                </li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="mt-2 sm:mt-4 flex gap-4">
                        <Button className="flex bg-primary-color hover:opacity-90 w-[228.5625px] font-medium text-base">
                            <IconSave></IconSave>
                            <span className="ml-1">Follow</span>
                        </Button>
                        <Button className="flex bg-primary-color hover:opacity-90 p-2 font-medium text-base">
                            <IconHeart></IconHeart>
                            <span className="ml-1">Support</span>
                        </Button>
                        <Button className="flex primary-color hover:bg-blue-100 bg-white p-2 font-medium text-base">
                            <IconShare></IconShare>
                            <span className="ml-1">Share</span>
                        </Button>
                        <Button className="flex primary-color hover:bg-blue-100 bg-white font-medium p-0 text-base">
                            <Link
                                href={`/title/${params}/reviews`}
                                className="p-2"
                            >
                                Write a review
                            </Link>
                        </Button>
                    </div>
                    <ul className="flex mt-4 gap-1">
                        {data?.genres?.map((genres) => {
                            return (
                                <li
                                    key={`${data?.id}-genres`}
                                    className="uppercase text-xs rounded-md py-1 px-2 bg-[#e5e5e5] font-medium"
                                >
                                    {genres}
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-sm sm:text-base mt-4">{data?.desc}</p>
                </div>
            </header>
            <Tab params={params}></Tab>
            {children}
        </main>
    );
}
