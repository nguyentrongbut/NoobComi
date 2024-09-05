"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import IconArrowPrev from "@/components/icon/icon.arrow.prev";
import IconArrowNext from "@/components/icon/icon.arrow.next";
import IconArrowPrev2 from "@/components/icon/icon.arrow.prev2";
import { covertSlugUrl, sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
const TopSlider = (props: any) => {
    const { data, title, linkPage, showLinkPage } = props;
    const swiperRef = useRef<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const router = useRouter();

    async function incrementViews(comic: ITopComics) {
        const userId = 9;
        if (!userId) {
            return;
        }
        const viewsBy = comic.viewsBy || [];
        if (!viewsBy.includes(userId)) {
            const updateViews = await sendRequest({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comics/${comic.id}`,
                method: "PATCH",
                body: {
                    views: comic?.views + 1,
                    viewsBy: [...viewsBy, userId],
                },
            });
            if (updateViews) {
                router.refresh();
            }
        }
    }
    return (
        <section className="wrapper my-6 sm:my-8 lg:my-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold flex-grow">
                    <Link href="/search">{title}</Link>
                </h2>
                {showLinkPage && (
                    <Link
                        href={linkPage}
                        className="rounded-full p-2 hover:bg-neutral-200/40"
                        title={`go to ${title} page`}
                    >
                        <IconArrowPrev2></IconArrowPrev2>
                    </Link>
                )}
            </div>
            <Swiper
                // install Swiper modules
                modules={[Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={2.5}
                slidesPerGroup={2}
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                centeredSlides={true}
                centeredSlidesBounds={true}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    1280: {
                        slidesPerView: 6,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    640: {
                        slidesPerView: 4.5,
                    },
                    500: {
                        slidesPerView: 3.5,
                    },
                }}
                onReachBeginning={() => {
                    setIsBeginning(true);
                }}
                onReachEnd={() => {
                    setIsEnd(true);
                }}
                onFromEdge={() => {
                    setIsBeginning(false);
                    setIsEnd(false);
                }}
            >
                {data.map((data: ITopComics, index: number) => {
                    return (
                        <SwiperSlide key={`${data.id}-top-tier`}>
                            <figure className="group">
                                <Link
                                    href={`/title/${covertSlugUrl(
                                        data.title
                                    )}-${data.id}`}
                                    className="aspect-[5/7] block h-full group-hover:opacity-85 transition-opacity"
                                    onClick={() => incrementViews(data)}
                                >
                                    <Image
                                        src={data.cover}
                                        alt={data.title}
                                        className="object-cover mb-auto rounded shadow-md select-none w-full h-full"
                                        priority={[0, 1, 2, 3, 4, 5].includes(
                                            index
                                        )}
                                        width={300}
                                        height={300}
                                    ></Image>
                                </Link>
                                <Link
                                    href={`/title/${covertSlugUrl(
                                        data.title
                                    )}-${data.id}.html`}
                                >
                                    <figcaption className="line-clamp-fix mt-2 text-sm group-hover:opacity-85 transition-opacity duration-300 delay-200">
                                        {data.title}
                                    </figcaption>
                                </Link>
                            </figure>
                        </SwiperSlide>
                    );
                })}
                <div className="absolute inset-0 flex justify-between">
                    <button
                        className={`invisible w-16 select-none hover:bg-black/25 ${
                            isBeginning ? "" : "lg:visible"
                        } flex items-center justify-center h-full z-50 group`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        title="previous slider"
                    >
                        <IconArrowPrev className="text-white w-8 h-8 group-hover:scale-125 transition-[opacity,transform]"></IconArrowPrev>
                    </button>
                    <button
                        className={`invisible w-16 select-none hover:bg-black/25 ${
                            isEnd ? "" : "lg:visible"
                        } flex items-center justify-center h-full z-50 group`}
                        onClick={() => swiperRef.current?.slideNext()}
                        title="next slider"
                    >
                        <IconArrowNext className="text-white w-8 h-8 group-hover:scale-125 transition-[opacity,transform]"></IconArrowNext>
                    </button>
                </div>
            </Swiper>
        </section>
    );
};

export default TopSlider;
