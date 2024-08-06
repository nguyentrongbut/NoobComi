import TabContent from "@/app/title/@component/tab.content.wrapper";
import Rating from "@/app/title/[slug]/reviews/@component/rating";
import IconSend from "@/components/icon/icon.send";
import IconStarBorder from "@/components/icon/icon.star.border";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/utils/api";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RatingReadOnly from "@/app/title/[slug]/reviews/@component/rating.read.only";

dayjs.extend(relativeTime);

const ReviewsTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const data = await sendRequest<IReviews[]>({
        url: `${process.env.WEB_COMIC_API}/api/reviews?comicId=${id}&_expand=author`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <TabContent>
            <Rating></Rating>
            <div className="relative">
                <Textarea className="min-h-[7rem] mt-4 bg-neutral-100 border border-[#a3a3a3] focus:border-[var(--primary-color)] focus:outline-none transition-all peer"></Textarea>
                <label className="absolute top-2 left-4 text-neutral-700 transition-all rounded text-base pointer-events-none peer-focus-within:text-xs peer-focus-within:-top-2 peer-focus-within:bg-white px-1 -mx-1 max-w-[calc(100% - 2rem)]">
                    <span className="relative z-[2] overflow-hidden whitespace-nowrap">
                        Write a review
                    </span>
                    <div className="absolute left-0 bottom-0 w-full h-1/2 z-[1] bg-neutral-100"></div>
                </label>
            </div>
            <div className="flex justify-end mt-6">
                <Button className="flex gap-1 items-center bg-primary-color p-1.5">
                    <IconSend></IconSend>
                    <span>Submit</span>
                </Button>
            </div>
            <Separator className="mt-4 bg-neutral-300"></Separator>
            <section>
                {data.length >= 1 ? (
                    <ul>
                        {data?.map((reviews) => {
                            return (
                                <li
                                    className="flex gap-4 mt-4"
                                    key={reviews?.id}
                                >
                                    <Link href="/author">
                                        <Avatar className="size-12 mb-auto">
                                            <AvatarImage
                                                src={reviews?.author?.avatar}
                                                alt={reviews?.author?.name}
                                            />
                                            <AvatarFallback>
                                                {reviews?.author?.name}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className="flex flex-col gap-1">
                                        <Link href="/author">
                                            <h3 className="font-medium line-clamp-1 break-all">
                                                {reviews?.author?.name}
                                                <span className="text-sm opacity-70 ml-1">
                                                    @{reviews?.author?.name}
                                                </span>
                                            </h3>
                                        </Link>
                                        <div className="flex -ml-0.5">
                                            <RatingReadOnly
                                                stars={reviews?.rated}
                                            ></RatingReadOnly>
                                            <div className="text-neutral-500 whitespace-nowrap text-sm mt-1 ml-2">
                                                {dayjs(
                                                    reviews?.createdAt
                                                ).fromNow()}
                                            </div>
                                        </div>
                                        <p className="mt-2">
                                            {reviews?.content}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="mt-4">No Reviews</div>
                )}
            </section>
        </TabContent>
    );
};

export default ReviewsTab;
