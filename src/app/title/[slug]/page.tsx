import TabContent from "@/app/title/@component/tab.content";
import IconFilter2 from "@/components/icon/icon.filter2";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import IconEye from "@/components/icon/icon.eye";
import IconHeart from "@/components/icon/icon.heart";
import IconComment from "@/components/icon/icon.comment";
import IconOclock from "@/components/icon/icon.oclock";
import { sendRequest } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChaptersTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const data = await sendRequest<IChapter[]>({
        url: `http://localhost:3009/api/chapters?comicId=${id}&_sort=createdAt&_order=asc`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <TabContent>
            {data.length === 0 ? (
                ""
            ) : (
                <Button className="flex justify-between hover:bg-[#f7f7f7] bg-white text-black gap-2 text-base rounded-md mb-4 lg:-mt-2">
                    <IconFilter2></IconFilter2>
                    <span>Descending</span>
                </Button>
            )}
            <section className="flex flex-col gap-y-4">
                <div>
                    {data.length === 0 ? (
                        <p className="text-center">
                            There are no published chapters
                        </p>
                    ) : (
                        <ul className="grid auto-rows-fr sm:gap-4 gap-2">
                            {data?.map((chapter: IChapter) => {
                                return (
                                    <li key={chapter?.id}>
                                        <Link
                                            href="/"
                                            className="flex w-full justify-between bg-neutral-100 rounded-md hover:bg-[#e5e5e5]"
                                        >
                                            <figure className="flex gap-4">
                                                <div className="rounded-md overflow-hidden h-20">
                                                    <Image
                                                        src={chapter?.cover}
                                                        alt={chapter?.content}
                                                        width={108}
                                                        height={72}
                                                        loading="eager"
                                                        className="w-full aspect-[3/2] object-cover h-full bg-neutral-200"
                                                    ></Image>
                                                </div>

                                                <figcaption className="mt-2 font-bold">
                                                    {chapter?.content}
                                                </figcaption>
                                            </figure>
                                            <div className="mt-auto flex gap-4 text-sm mx-3 mb-3">
                                                <span
                                                    className="flex gap-1 items-center"
                                                    title={chapter?.views?.toString()}
                                                >
                                                    <IconEye className="size-4"></IconEye>
                                                    <span>
                                                        {chapter?.views}
                                                    </span>
                                                </span>
                                                <span
                                                    className="flex gap-1 items-center"
                                                    title={chapter?.likes?.toString()}
                                                >
                                                    <IconHeart className="size-4"></IconHeart>
                                                    <span>
                                                        {chapter?.likes}
                                                    </span>
                                                </span>
                                                <span
                                                    className="flex gap-1 items-center"
                                                    title={chapter?.comments?.toString()}
                                                >
                                                    <IconComment className="size-4"></IconComment>
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
                                                    <IconOclock></IconOclock>
                                                    <span>
                                                        {dayjs(
                                                            chapter?.createdAt
                                                        ).fromNow()}
                                                    </span>
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                {data.length === 0 ? (
                    ""
                ) : (
                    <div className="flex justify-center items-center gap-y-4">
                        <p className="text-sm sm:text-base"> results</p>
                    </div>
                )}
            </section>
        </TabContent>
    );
};

export default ChaptersTab;
