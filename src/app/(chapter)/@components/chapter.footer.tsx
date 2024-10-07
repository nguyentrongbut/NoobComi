"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

const ChapterFooter = ({
    footerRef,
    showFooter,
}: {
    footerRef?: React.RefObject<HTMLDivElement>;
    showFooter: boolean;
}) => {
    const [scrollValue, setScrollValue] = useState(0);

    // Hàm cập nhật slider dựa trên vị trí cuộn của trang
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;
        setScrollValue(scrollPercentage); // Cập nhật giá trị slider
    };

    // Hàm cập nhật vị trí cuộn dựa trên giá trị của slider
    const handleSliderChange = (value: number[]) => {
        const newValue = value[0]; // Lấy giá trị đầu tiên từ Slider
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = (newValue / 100) * documentHeight;
        window.scrollTo(0, scrollPosition); // Cuộn trang đến vị trí tương ứng
    };

    useEffect(() => {
        // Lắng nghe sự kiện cuộn
        window.addEventListener("scroll", handleScroll);

        return () => {
            // Xóa bỏ lắng nghe khi component unmount
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className={`transition-opacity duration-500 ${
                showFooter ? "opacity-100" : "opacity-0"
            } fixed w-full bottom-0 left-0 z-10`}
        >
            <div className="p-4 bg-white/80 border-t border-neutral-200 backdrop-blur-lg">
                <div className="px-4 flex h-10 items-center select-none">
                    <div className="flex text-xs min-w-0 whitespace-nowrap leading-4">
                        <span className="min-w-[1rem] text-center">
                            {Math.round(scrollValue)}%
                        </span>
                    </div>
                    <Slider
                        value={[Math.round(scrollValue)]} // Sử dụng `value` để đồng bộ slider
                        onValueChange={handleSliderChange} // Lắng nghe sự thay đổi
                        max={100}
                        step={1}
                        className="mx-2 cursor-pointer"
                    />
                    <div className="flex text-xs min-w-0 whitespace-nowrap leading-4">
                        <span className="min-w-[1rem] text-center">100%</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ChapterFooter;
