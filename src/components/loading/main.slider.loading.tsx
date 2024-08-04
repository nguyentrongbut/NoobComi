import IconArrowNext from "@/components/icon/icon.arrow.next";
import IconArrowPrev from "@/components/icon/icon.arrow.prev";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MainSliderLoading = () => {
    return (
        <section>
            <Skeleton className="h-[300px] md:h-[500px] relative">
                <div>
                    <div className="flex h-full relative">
                        <div
                            className="absolute left-0 top-0 w-full h-[150%] object-cover select-none"
                            style={{ objectPosition: "0px 30%" }}
                        ></div>
                        <div className="mb-6 pb-4 md:mb-0 md:py-4 h-[70%] md:h-[77%] sm:h-[65%] wrapper mt-auto">
                            <figure className="flex gap-4 h-full relative w-full">
                                <div className="aspect-[7/10] h-[10rem] sm:h-full">
                                    <div className="rounded w-full h-full shadow-md object-cover select-none"></div>
                                </div>
                                <div
                                    className="flex flex-col gap-2"
                                    style={{
                                        gridTemplateRows:
                                            "max-content min-content auto max-content",
                                    }}
                                >
                                    <div>
                                        <div className="font-bold text-xl line-clamp-4 sm:line-clamp-2 lg:text-4xl overflow-hidden lg:leading-[2.75rem] w-full sm:w-3/4 md:w-full">
                                            aa
                                        </div>
                                    </div>
                                    <div className="flex gap-1 absolute bottom-0 left-0 sm:relative wrapper sm:ml-0 sm:mr-0 sm:w-[450px] overflow-hidden">
                                        return (
                                        <li className="text-[0.625rem] font-bold uppercase rounded-sm px-[6px] bg-[rgb(240,241,242)] h-[15px]">
                                            aa
                                        </li>
                                        );
                                    </div>
                                    <div className="py-2 hidden sm:block sm:w-[25rem] lg:w-[40rem]">
                                        <p className="overflow-hidden text-[0.875rem] leading-[1.25rem] line-clamp-2 md:line-clamp-4">
                                            aa
                                        </p>
                                    </div>
                                    <footer className="sm:mr-36 mr-4 mt-auto mb-7 sm:mb-0">
                                        <span className="font-medium italic line-clamp-1">
                                            aa
                                        </span>
                                    </footer>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="absolute left-0 bottom-1 md:bottom-2 w-full">
                    <div className="flex justify-between md:justify-end wrapper gap-4 items-center">
                        <Skeleton className="w-8 bg-[#666666]"></Skeleton>

                        <Skeleton className="w-7 h-7 md:w-10 md:h-10 bg-[#666666] rounded-full z-20">
                            <div className="size-6"></div>
                        </Skeleton>

                        <Skeleton className="w-7 h-7 md:w-10 md:h-10 bg-[#666666] rounded-full z-20">
                            <div className="size-6"></div>
                        </Skeleton>
                    </div>
                </div>
                <div className="swiper-pagination block md:hidden"></div>
            </Skeleton>
        </section>
    );
};

export default MainSliderLoading;
