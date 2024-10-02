import ChapterHeader from "@/app/(chapter)/[...slug]/@components/chapter.header";
import IconComment from "@/components/icon/icon.comment";
import IconEye from "@/components/icon/icon.eye";
import IconHeart from "@/components/icon/icon.heart";
import IconOclock from "@/components/icon/icon.oclock";
import IconShare from "@/components/icon/icon.share";
import { Button } from "@/components/ui/button";
import { covertSlugUrl, sendRequest } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
dayjs.extend(relativeTime);

function extractIdFromSlug(slug: string): string {
    const temp = slug?.split(".html") ?? [];
    const temp1 = temp[0]?.split("-");
    return temp1[temp1.length - 1];
}

const ChapterPage = async ({ params }: { params: { slug: string[] } }) => {
    const id = parseInt(extractIdFromSlug(params.slug[1]));
    const slugChapters = params.slug[0];
    const idChapters = extractIdFromSlug(slugChapters);

    const res = await sendRequest<IChapter[]>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/chapters?comicId=${idChapters}&_sort=createdAt&_order=asc`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    const res1 = await sendRequest<IChapter>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/chapters/${id}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    const currentChapterIndex = res.findIndex((chapter) => chapter.id === id);
    const nextChapter = res[currentChapterIndex + 1];

    return (
        <section>
            <ChapterHeader titleChapter={res1.content} totalLike={res1.likes} totalComment={res1.comments} slugChapters={slugChapters}></ChapterHeader>
            <div className="">
                <div className="relative h-full w-full overflow-hidden">
                    <div className="h-full overflow-y-auto overflow-x-hidden relative mx-auto cursor-pointer">
                        {res1?.images.map((image: string, index: number) => (
                            <div key={index}>
                                <Image
                                    src={image}
                                    alt={res1?.title}
                                    width={800}
                                    height={640}
                                    className="mx-auto h-full select-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="wrapper pt-20">
                {nextChapter?.content ? (
                    <>
                        <div className="max-w-screen-md mx-auto rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="font-bold mb-4">Up Next</h3>
                            <div className="cursor-pointer mb-4">
                                <Link
                                    href={`/${params.slug[0]}/${covertSlugUrl(
                                        nextChapter.title
                                    )}-${nextChapter.id}.html`}
                                    className="flex gap-2 bg-neutral-100 rounded-md hover:bg-[#e5e5e5]"
                                >
                                    <div className="relative sm:max-w-[108px] sm:max-h-[72px] max-w-[96px] max-h-[64px]">
                                        <Image
                                            src={nextChapter?.cover}
                                            alt={nextChapter?.content}
                                            width={108}
                                            height={72}
                                            loading="eager"
                                            className="w-full aspect-[3/2] h-full object-cover bg-neutral-200 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="mt-2 font-bold gap-2.5 line-clamp-1 text-sm sm:text-base mr-1">
                                            {nextChapter?.content}
                                        </div>
                                        <div className="mt-auto flex gap-2 sm:gap-4 text-sm mx-3 mb-1.5 sm:mb-3 justify-end">
                                            <span
                                                className="flex gap-1 items-center"
                                                title={nextChapter?.views?.toString()}
                                            >
                                                <IconEye className="size-4" />
                                                <span>
                                                    {nextChapter?.views}
                                                </span>
                                            </span>
                                            <span
                                                className="flex gap-1 items-center"
                                                title={nextChapter?.likes?.toString()}
                                            >
                                                <IconHeart className="size-4" />
                                                <span>
                                                    {nextChapter?.likes}
                                                </span>
                                            </span>
                                            <span
                                                className="flex gap-1 items-center"
                                                title={nextChapter?.comments?.toString()}
                                            >
                                                <IconComment className="size-4" />
                                                <span>
                                                    {nextChapter?.comments}
                                                </span>
                                            </span>
                                            <span
                                                className="flex gap-1 items-center"
                                                title={dayjs(
                                                    nextChapter?.createdAt
                                                ).fromNow()}
                                            >
                                                <IconOclock />
                                                <span className="line-clamp-1">
                                                    {dayjs(
                                                        nextChapter?.createdAt
                                                    ).fromNow()}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <Link
                                href={`/${params.slug[0]}/${covertSlugUrl(
                                    nextChapter.title
                                )}-${nextChapter.id}.html`}
                            >
                                <Button className="w-full p-2 text-base bg-primary-color">
                                    Next Chapter
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="max-w-screen-md mx-auto">
                        <Button className="w-full p-2 text-base bg-primary-color opacity-50 cursor-default">
                            Next Chapter
                        </Button>
                    </div>
                )}
            </div>
            <div className="wrapper mt-4">
                <div className="max-w-screen-md mx-auto rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="font-bold">Share Your Love</h3>
                    <p className="mt-2">
                        If you enjoyed that chapter, be sure to let the creator
                        know how you felt!
                    </p>
                    <div className="mt-2 grid gap-4">
                        <Link href="/author"></Link>
                        <div className="flex gap-2">
                            <Button className="rounded-full bg-[#e5e5e5] text-base text-black flex gap-1 hover:bg-[#d4d4d4]">
                                <IconHeart></IconHeart>
                                <span>{res1.likes}</span>
                            </Button>
                            <Button className="rounded-full bg-[#e5e5e5] text-base text-black flex gap-1 hover:bg-[#d4d4d4]">
                                <IconShare></IconShare> <span>Share</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper mt-4">
                <div className="max-w-screen-md mx-auto rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="font-bold">Top Comments</h3>
                    <Button className="w-full mt-2 bg-white text-black hover:bg-[#e5e5e5] text-base">
                        All Comments
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ChapterPage;
