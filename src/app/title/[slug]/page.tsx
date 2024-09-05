import ChapterTab from "@/app/@chapter/chapter";
import BtnShare from "@/app/title/@component/btn.share";
import BtnToggleFollow from "@/app/title/@component/btn.toggle.follow";
import BtnWriteAReview from "@/app/title/@component/btn.write.a.review";
import TabContent from "@/app/title/@component/tab.content.wrapper";
import CommentsTab from "@/app/title/[slug]/comments/page";
import RatingReadOnly from "@/app/title/[slug]/reviews/@components/rating.read.only";
import ReviewsTab from "@/app/title/[slug]/reviews/page";
import IconAuthor from "@/components/icon/icon.author";
import IconComment from "@/components/icon/icon.comment";
import IconEye from "@/components/icon/icon.eye";
import IconHeart from "@/components/icon/icon.heart";
import IconSave from "@/components/icon/icon.save";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendRequest } from "@/utils/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: { slug: string };
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = extractIdFromSlug(params.slug);

    // fetch data
    const res = await sendRequest<ITopComics>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/all-comics/${id}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return {
        title: `${res?.title} Chapter ${res?.chapters?.length + 1} - MangaNoob (Open Beta)`,
        description: `${res?.title} Chapter ${res?.chapters?.length + 1} - ${res?.desc} - MangaNoob (Open Beta)`,
    };
}
const TitlePage = async ({ params }: Props) => {

    const id = params.slug ? extractIdFromSlug(params.slug) : "";

    const currentIdUser = 8;

    const data = await sendRequest<ITopComics>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/all-comics/${id}`,
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
                        className="w-full object-cover sm:h-full object-center aspect-[3.5/1] min-h-40"
                    ></Image>
                    <div className="absolute inset-0 banner-overlay--title aspect-[3.5/1] min-h-40"></div>
                </div>
                <div className="relative h-auto sm:h-80 -mt-24 sm:-mt-40">
                    <div className="wrapper relative left-0 flex flex-col sm:flex-row justify-center sm:justify-start space-x-0 sm:space-x-4">
                        <Image
                            src={data?.cover}
                            alt={data?.title}
                            width={230}
                            height={320}
                            loading="eager"
                            className="object-cover min-h-0 h-48 sm:h-80 rounded-md aspect-[5/7] ring-4 ring-black w-[137px] sm:w-auto mx-auto sm:mx-0"
                        ></Image>

                        <div className="sm:grid grid-rows-[10rem_1fr_auto]">
                            <div></div>
                            <div className="px-2">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-2 xl:mt-4 sm:line-clamp-3 md:line-clamp-2 xl:line-clamp-1 text-center sm:text-start">
                                    {data?.title}
                                </h2>
                            </div>
                            <ul className="flex text-base space-x-4 justify-start sm:flex-row flex-col items-center">
                                <li className="flex gap-2 sm:gap-0 whitespace-nowrap items-center sm:shadow rounded-full py-0.5 px-2 sm:border sm:border-[#a3a3a3] sm:hover:border-[#737373] transition-[border] text-center mx-auto sm:mx-0 mt-3 sm:mt-0">
                                    <IconAuthor className="flex-shrink-0 primary-color sm:hidden lg:block"></IconAuthor>
                                    <Link
                                        href="/author"
                                        className="lg:ml-2 sm:w-16 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap lg:w-auto lg:overflow-auto xl:whitespace-normal font-medium text-sm sm:text-base sm:font-normal"
                                    >
                                        {data?.author?.name}
                                    </Link>
                                </li>
                                <li className="flex sm:flex-row flex-col-reverse items-center sm:gap-4 gap-2 mt-3 sm:mt-0">
                                    <div className="flex items-center gap-4 justify-center sm:justify-normal">
                                        <span
                                            className="flex gap-2 items-center text-sm sm:text-base"
                                            title={data?.follow?.toString()}
                                        >
                                            <IconSave className="primary-color size-5 sm:size-6"></IconSave>
                                            <span>
                                                {formatNumber(data?.follow)}
                                            </span>
                                        </span>
                                        <span
                                            className="flex gap-2 items-center text-sm sm:text-base"
                                            title={data?.likes?.toString()}
                                        >
                                            <IconHeart className="primary-color size-5 sm:size-6"></IconHeart>
                                            <span>
                                                {formatNumber(data?.likes)}
                                            </span>
                                        </span>
                                        <span
                                            className="flex gap-2 items-center text-sm sm:text-base"
                                            title={data?.views?.toString()}
                                        >
                                            <IconEye className="primary-color size-5 sm:size-6"></IconEye>
                                            <span>
                                                {formatNumber(data?.views)}
                                            </span>
                                        </span>
                                        <span
                                            className="flex gap-2 items-center text-sm sm:text-base"
                                            title={data?.totalComment?.toString()}
                                        >
                                            <IconComment className="primary-color size-5 sm:size-6"></IconComment>
                                            <span>
                                                {formatNumber(
                                                    data?.totalComment
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="sm:-mt-[3px] flex items-center gap-2 sm:hidden lg:flex">
                                        <RatingReadOnly
                                            stars={data?.rating}
                                            half={true}
                                        ></RatingReadOnly>
                                        <span className="mt-0.5 text-sm opacity-70">
                                            (
                                            {data?.rating
                                                ? `${data.rating.toFixed(1)}`
                                                : "0.00"}
                                            )
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="mt-5 sm:mt-4 flex gap-2 sm:gap-4 justify-center sm:justify-normal">
                        <BtnToggleFollow
                            id={Number(id)}
                            totalFollow={data?.follow}
                            followBy={data?.followBy}
                        ></BtnToggleFollow>
                        <Button className="flex bg-primary-color hover:opacity-90 p-2 font-medium sm:text-base">
                            <IconHeart></IconHeart>
                            <span className="ml-1">Support</span>
                        </Button>
                        <BtnShare
                            title={data.title}
                            cover={data.cover}
                            totalFollow={data.follow}
                            totalLike={data.likes}
                            totalView={data.views}
                            totalComment={data.totalComment}
                            author={data.author.name}
                            params={params}
                        ></BtnShare>
                        <BtnWriteAReview></BtnWriteAReview>
                    </div>
                    <ul className="flex mt-4 gap-1 flex-wrap">
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

            <Tabs defaultValue="chapters">
                <section className="bg-white">
                    <TabsList className="wrapper flex justify-start">
                        <TabsTrigger
                            value="chapters"
                            className="px-3 sm:px-4 py-2 block min-w-[6rem] text-center flex-shrink-0 hover:opacity-90 transition-opacity data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60 rounded-none text-base"
                        >
                            Chapters
                        </TabsTrigger>
                        <TabsTrigger
                            value="comments"
                            className="px-3 sm:px-4 py-2 block min-w-[6rem] text-center flex-shrink-0 hover:opacity-90 transition-opacity data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60 rounded-none text-base"
                        >
                            Comments
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="px-3 sm:px-4 py-2 block min-w-[6rem] text-center flex-shrink-0 hover:opacity-90 transition-opacity data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60 rounded-none text-base"
                        >
                            Reviews
                        </TabsTrigger>
                    </TabsList>
                </section>
                <TabsContent value="chapters">
                    <TabContent>
                        <ChapterTab
                            id={id}
                            currentIdUser={currentIdUser}
                        ></ChapterTab>
                    </TabContent>
                </TabsContent>
                <TabsContent value="comments">
                    <TabContent>
                        <CommentsTab
                            id={id}
                            currentIdUser={currentIdUser}
                        ></CommentsTab>
                    </TabContent>
                </TabsContent>
                <TabsContent value="reviews">
                    <TabContent>
                        <ReviewsTab
                            id={id}
                            currentIdUser={currentIdUser}
                        ></ReviewsTab>
                    </TabContent>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default TitlePage;
