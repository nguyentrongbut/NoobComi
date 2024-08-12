"use client";
import IconStar from "@/components/icon/icon.star";
import IconStarBorder from "@/components/icon/icon.star.border";
import { useState } from "react";

const Rating = (props: any) => {
    const { rating, setRating } = props;
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex h-8 my-auto">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label
                        key={index}
                        className="relative flex items-center cursor-pointer transition-all py-1 pl-1"
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                            className="hidden"
                        />
                        <IconStarBorder className="cursor-pointer" />
                        <IconStar
                            className={`absolute top-0 left-0 z-10 transition-all primary-color w-full h-full py-1 pl-1 ${
                                currentRating <= (hover ?? rating ?? 0)
                                    ? "visible"
                                    : "invisible"
                            }`}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default Rating;
