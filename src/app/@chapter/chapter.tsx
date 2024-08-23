"use client";

import IconComment from "@/components/icon/icon.comment";
import IconEye from "@/components/icon/icon.eye";
import IconFilter2 from "@/components/icon/icon.filter2";
import IconHeart from "@/components/icon/icon.heart";
import IconLock from "@/components/icon/icon.lock";
import IconOclock from "@/components/icon/icon.oclock";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { sendRequest } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AlertImage from "@/../public/images/okay.png";
import IconAscending from "@/components/icon/icon.ascending";
dayjs.extend(relativeTime);

const ChapterTab = (props: any) => {
    const { currentUser, id } = props;
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [toggleFilter, setToggleFilter] = useState(true);
    useEffect(() => {
        const getChapterDesc = async () => {
            const order = toggleFilter ? "desc" : "asc";
            const data = await sendRequest<IChapter[]>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/chapters?comicId=${id}&_sort=createdAt&_order=${order}`,
                method: "GET",
                nextOption: {
                    cache: "no-store",
                },
            });
            setChapters(data);
        };
        getChapterDesc();
    }, [id, toggleFilter]);

    return (
        <>
            {chapters?.length > 1 && (
                <>
                    {toggleFilter ? (
                        <Button
                            className="flex justify-between hover:bg-[#f7f7f7] bg-white text-black gap-2 text-sm sm:text-base rounded-md mb-4 lg:-mt-2 p-2"
                            onClick={() => setToggleFilter(false)}
                        >
                            <IconFilter2></IconFilter2>
                            <span>Descending</span>
                        </Button>
                    ) : (
                        <Button
                            className="flex justify-between hover:bg-[#f7f7f7] bg-white text-black gap-2 text-sm sm:text-base rounded-md mb-4 lg:-mt-2 p-2"
                            onClick={() => setToggleFilter(true)}
                        >
                            <IconAscending></IconAscending>
                            <span>Ascending</span>
                        </Button>
                    )}
                </>
            )}
            <section className="flex flex-col gap-y-4">
                <div>
                    {chapters?.length === 0 ? (
                        <p className="text-center">
                            There are no published chapters
                        </p>
                    ) : (
                        <ul className="grid auto-rows-fr sm:gap-4 gap-2">
                            {chapters?.map((chapter) => (
                                <React.Fragment key={chapter?.id}>
                                    {chapter?.vip === currentUser?.vip ||
                                    !chapter.vip ? (
                                        <li className="cursor-pointer">
                                            <Link
                                                href="/"
                                                className="flex w-full justify-between bg-neutral-100 rounded-md hover:bg-[#e5e5e5]"
                                            >
                                                <figure className="flex gap-4">
                                                    <div className="rounded-md overflow-hidden h-20 relative">
                                                        <Image
                                                            src={chapter?.cover}
                                                            alt={
                                                                chapter?.content
                                                            }
                                                            width={108}
                                                            height={72}
                                                            loading="eager"
                                                            className="w-full aspect-[3/2] object-cover h-full bg-neutral-200"
                                                        />
                                                    </div>
                                                    <figcaption className="mt-2 font-bold gap-2.5 flex">
                                                        {chapter?.content}
                                                    </figcaption>
                                                </figure>
                                                <div className="mt-auto flex gap-4 text-sm mx-3 mb-3">
                                                    <span
                                                        className="flex gap-1 items-center"
                                                        title={chapter?.views?.toString()}
                                                    >
                                                        <IconEye className="size-4" />
                                                        <span>
                                                            {chapter?.views}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className="flex gap-1 items-center"
                                                        title={chapter?.likes?.toString()}
                                                    >
                                                        <IconHeart className="size-4" />
                                                        <span>
                                                            {chapter?.likes}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className="flex gap-1 items-center"
                                                        title={chapter?.comments?.toString()}
                                                    >
                                                        <IconComment className="size-4" />
                                                        <span>
                                                            {chapter?.comments}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className="flex gap-1 items-center"
                                                        title={dayjs(
                                                            chapter?.createdAt
                                                        ).fromNow()}
                                                    >
                                                        <IconOclock />
                                                        <span>
                                                            {dayjs(
                                                                chapter?.createdAt
                                                            ).fromNow()}
                                                        </span>
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    ) : (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <li className="cursor-pointer">
                                                    <div className="flex w-full justify-between bg-neutral-100 rounded-md hover:bg-[#e5e5e5]">
                                                        <figure className="flex gap-4">
                                                            <div className="rounded-md overflow-hidden h-20 relative">
                                                                <Image
                                                                    src={
                                                                        chapter?.cover
                                                                    }
                                                                    alt={
                                                                        chapter?.content
                                                                    }
                                                                    width={108}
                                                                    height={72}
                                                                    loading="eager"
                                                                    className="w-full aspect-[3/2] object-cover h-full bg-neutral-200"
                                                                />
                                                                {chapter?.vip !==
                                                                    currentUser?.vip && chapter?.vip && (
                                                                    <div>
                                                                        <div className="p-1.5 bg-white/80 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                                                                            <IconLock />
                                                                        </div>
                                                                        <div className="absolute w-full h-full inset-0 bg-black/50" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <figcaption className="mt-2 font-bold gap-2.5 flex">
                                                                {
                                                                    chapter?.content
                                                                }
                                                                {chapter?.vip !==
                                                                    currentUser?.vip &&
                                                                    chapter?.vip && (
                                                                        <div className="flex gap-1 rounded-full items-center primary-color border sm:py-[0.125rem] h-4 sm:h-6 sm:px-2 justify-center border-primary-color">
                                                                            <IconLock className="size-4" />
                                                                            <span className="font-medium text-sm">
                                                                                Vip
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                            </figcaption>
                                                        </figure>
                                                        <div className="mt-auto flex gap-4 text-sm mx-3 mb-3">
                                                            <span
                                                                className="flex gap-1 items-center"
                                                                title={chapter?.views?.toString()}
                                                            >
                                                                <IconEye className="size-4" />
                                                                <span>
                                                                    {
                                                                        chapter?.views
                                                                    }
                                                                </span>
                                                            </span>
                                                            <span
                                                                className="flex gap-1 items-center"
                                                                title={chapter?.likes?.toString()}
                                                            >
                                                                <IconHeart className="size-4" />
                                                                <span>
                                                                    {
                                                                        chapter?.likes
                                                                    }
                                                                </span>
                                                            </span>
                                                            <span
                                                                className="flex gap-1 items-center"
                                                                title={chapter?.comments?.toString()}
                                                            >
                                                                <IconComment className="size-4" />
                                                                <span>
                                                                    {
                                                                        chapter?.comments
                                                                    }
                                                                </span>
                                                            </span>
                                                            <span
                                                                className="flex gap-1 items-center"
                                                                title={dayjs(
                                                                    chapter?.createdAt
                                                                ).fromNow()}
                                                            >
                                                                <IconOclock />
                                                                <span>
                                                                    {dayjs(
                                                                        chapter?.createdAt
                                                                    ).fromNow()}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <Image
                                                        src={AlertImage}
                                                        alt="alert image"
                                                        width={192}
                                                        height={192}
                                                        className="w-48 h-48 mx-auto"
                                                    ></Image>
                                                    <AlertDialogTitle className="text-center mt-4 font-medium text-lg sm:text-xl">
                                                        You need to be a VIP to
                                                        access this chapter.
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Back to title
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        <Link href="/">
                                                            Go to VIP
                                                        </Link>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    )}
                </div>
                {chapters?.length > 0 && (
                    <div className="flex justify-center items-center gap-y-4">
                        <p className="text-sm sm:text-base">
                            {chapters?.length} results
                        </p>
                    </div>
                )}
            </section>
        </>
    );
};

export default ChapterTab;
