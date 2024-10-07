import IconArrowPrev from "@/components/icon/icon.arrow.prev";
import IconComment2 from "@/components/icon/icon.comment2";
import IconHeart from "@/components/icon/icon.heart";
import IconMenuBar from "@/components/icon/icon.menubar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ChapterHeader = ({
    titleChapter,
    totalLike,
    totalComment,
    slugChapters,
    headerRef,
    showHeader,
}: {
    titleChapter: any;
    totalLike: number;
    totalComment: number;
    slugChapters: string;
    headerRef?: React.RefObject<HTMLDivElement>;
    showHeader: boolean;
}) => {
    return (
        <header
            ref={headerRef}
            className={`transition-opacity duration-500 ${
                showHeader ? "opacity-100" : "opacity-0"
            } sm:px-4 px-2 py-[0.675rem] bg-white/80 border-b border-neutral-200 box-border backdrop-blur-lg fixed z-[1] top-0 left-0 w-full`}
        >
            <div className="flex justify-between space-x-4 my-auto">
                <Link href={`/${slugChapters}`} className="primary-color">
                    <Button className="text-base p-2 bg-transparent text-inherit hover:bg-[#b3e4f9] rounded-full flex gap-1">
                        <IconArrowPrev></IconArrowPrev>
                        <span>Back to Title</span>
                    </Button>
                </Link>
                <h1 className="text-center font-medium my-auto whitespace-nowrap overflow-hidden">
                    {titleChapter}
                </h1>
                <div className="flex space-x-2 my-auto">
                    <Button className="bg-transparent text-black flex gap-1 p-2">
                        <IconHeart></IconHeart>
                        <span className="text-base">{totalLike}</span>
                    </Button>
                    <Button className="bg-transparent text-black flex gap-1 p-2">
                        <IconComment2></IconComment2>{" "}
                        <span className="text-base">{totalComment}</span>
                    </Button>
                    <Button className="bg-transparent text-black flex gap-1 p-2">
                        <IconMenuBar></IconMenuBar>{" "}
                        <span className="text-base">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default ChapterHeader;
