"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import IconArrowPrev from "@/components/icon/icon.arrow.prev";
import IconArrowNext from "@/components/icon/icon.arrow.next";
import { covertSlugUrl, sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
const MainSlider = (props: any) => {
    const data: any = props.data;
    const swiperRef = useRef<any>();
    const [topNumber, setTopNumber] = useState(1);
    const router = useRouter();

    const handleSlideChange = (swiper: any) => {
        const newIndex = swiper.realIndex + 1; // Swiper's realIndex is zero-based, adjust to one-based
        setTopNumber(newIndex);
    };

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
        <section>
            <Swiper
                className="h-[300px] md:h-[500px] relative"
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChangeTransitionEnd={handleSlideChange}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    type: "fraction",
                }}
            >
                {data.map((comic: ITopComics, index: number) => {
                    return (
                        <SwiperSlide key={`${comic.id}-news`}>
                            <Link
                                href={`/${covertSlugUrl(comic.title)}-${
                                    comic.id
                                }`}
                                className="flex h-full relative shadow"
                                onClick={() => incrementViews(comic)}
                            >
                                <Image
                                    src={comic.banner}
                                    alt={comic.title}
                                    width={660}
                                    height={660}
                                    priority={index === 0}
                                    loading={index !== 0 ? "lazy" : "eager"}
                                    className="absolute left-0 top-0 w-full h-[150%] object-cover select-none"
                                    style={{ objectPosition: "0px 30%" }}
                                ></Image>
                                <div className="absolute inset-0 banner-overlay"></div>
                                <article className="mb-6 pb-4 md:mb-0 md:py-4 h-[70%] md:h-[77%] sm:h-[65%] wrapper mt-auto">
                                    <figure className="flex gap-4 h-full relative w-full">
                                        <div className="aspect-[7/10] h-[10rem] sm:h-full">
                                            <Image
                                                src={comic.cover}
                                                alt={comic.title}
                                                width={512}
                                                height={512}
                                                priority={index === 0}
                                                loading={
                                                    index !== 0
                                                        ? "lazy"
                                                        : "eager"
                                                }
                                                className="rounded w-full h-full shadow-md object-cover select-none"
                                            ></Image>
                                        </div>
                                        <figcaption
                                            className="flex flex-col gap-2"
                                            style={{
                                                gridTemplateRows:
                                                    "max-content min-content auto max-content",
                                            }}
                                        >
                                            <header>
                                                <h2 className="font-bold text-xl line-clamp-4 sm:line-clamp-2 lg:text-4xl overflow-hidden lg:leading-[2.75rem] w-full sm:w-3/4 md:w-full">
                                                    {comic.title}
                                                </h2>
                                            </header>
                                            <ul className="flex gap-1 absolute bottom-0 left-0 sm:relative wrapper sm:ml-0 sm:mr-0 sm:w-[450px] overflow-hidden">
                                                {comic.genres.map((genres) => {
                                                    return (
                                                        <li
                                                            className="text-[0.625rem] font-bold uppercase rounded-sm px-[6px] bg-[rgb(240,241,242)] h-[15px]"
                                                            key={`${comic.id}-${genres}`}
                                                        >
                                                            {genres}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <div className="py-2 hidden sm:block sm:w-[25rem] lg:w-[40rem]">
                                                <p className="overflow-hidden text-[0.875rem] leading-[1.25rem] line-clamp-2 md:line-clamp-4">
                                                    {comic.desc}
                                                </p>
                                            </div>
                                            <footer className="sm:mr-36 mr-4 mt-auto mb-7 sm:mb-0">
                                                <span className="font-medium italic line-clamp-1">
                                                    {comic.author.name}
                                                </span>
                                            </footer>
                                        </figcaption>
                                    </figure>
                                </article>
                            </Link>
                        </SwiperSlide>
                    );
                })}
                <div className="absolute left-0 bottom-1 md:bottom-2 w-full">
                    <div className="flex justify-between md:justify-end wrapper gap-4 items-center">
                        <span
                            className={`uppercase text-sm font-semibold hidden md:block z-20 ${
                                topNumber === 1
                                    ? "text-red-500"
                                    : "text-current"
                            }`}
                        >
                            No. {topNumber}
                        </span>

                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-7 h-7 md:w-10 md:h-10 bg-[#666666] hover:bg-current md:hover:bg-[#ebebec] md:bg-transparent flex items-center justify-center rounded-full z-20"
                            title="previous slider"
                        >
                            <IconArrowPrev className="text-white md:text-current"></IconArrowPrev>
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-7 h-7 md:w-10 md:h-10 bg-[#666666] hover:bg-current md:hover:bg-[#ebebec] md:bg-transparent flex items-center justify-center rounded-full z-20"
                            title="next slider"
                        >
                            <IconArrowNext className="text-white md:text-current"></IconArrowNext>
                        </button>
                    </div>
                </div>
                <div className="swiper-pagination block md:hidden"></div>
            </Swiper>
        </section>
    );
};

export default MainSlider;
