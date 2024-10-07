"use client";
import ChapterHeader from "./chapter.header";
import ChapterFooter from "./chapter.footer";
import { useEffect, useRef, useState } from "react";

const FeatHover = ({
    data,
    slugChapters,
}: {
    data: any;
    slugChapters: string;
}) => {
    const [showHeader, setShowHeader] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [clicked, setClicked] = useState(false); // Cờ để kiểm soát click

    const headerRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);

    const updateVisibility = (mouseY: number) => {
        const windowHeight = window.innerHeight;

        if (!clicked) {
            setShowHeader(mouseY < 73);
            setShowFooter(mouseY > windowHeight - 73);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        updateVisibility(event.clientY);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            headerRef.current &&
            footerRef.current &&
            !headerRef.current.contains(event.target as Node) &&
            !footerRef.current.contains(event.target as Node)
        ) {
            setShowHeader((prev) => !prev);
            setShowFooter((prev) => !prev);
            setClicked((prev) => !prev); // Kích hoạt hoặc hủy kích hoạt chế độ click
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [clicked]);

    return (
        <div>
            <ChapterHeader
                titleChapter={data.content}
                totalLike={data.likes}
                totalComment={data.comments}
                slugChapters={slugChapters}
                headerRef={headerRef}
                showHeader={showHeader}
            />

            <ChapterFooter footerRef={footerRef} showFooter={showFooter} />
        </div>
    );
};

export default FeatHover;
