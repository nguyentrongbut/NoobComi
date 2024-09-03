"use client";

import IconSave from "@/components/icon/icon.save";
import IconUnSave from "@/components/icon/icon.un.save";
import { Button } from "@/components/ui/button";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BtnToggleFollow = ({
    id,
    totalFollow,
    followBy,
}: {
    id: string;
    totalFollow: number;
    followBy: number[];
}) => {
    const userId = 9; 
    const router = useRouter();
    const [follow, setFollow] = useState(followBy.includes(userId));

    const handleFollowToggle = async () => {
        if (follow) {
            const unfollowed = await sendRequest<ITopComics[]>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comics/${id}`,
                method: "PATCH",
                body: {
                    follow: totalFollow - 1,
                    followBy: followBy.filter((id) => id !== userId),
                },
            });
            if (unfollowed) {
                setFollow(false);
                router.refresh();
            }
        } else {
            const followed = await sendRequest<ITopComics[]>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comics/${id}`,
                method: "PATCH",
                body: {
                    follow: totalFollow + 1,
                    followBy: [...followBy, userId],
                },
            });
            if (followed) {
                setFollow(true);
                router.refresh();
            }
        }
    };

    return (
        <Button
            className={`flex ${
                follow ? "bg-[#e5e5e5] hover:bg-[#b2b2b2] text-black" : "bg-primary-color hover:opacity-90 text-white"
            } sm:w-[228.5625px] font-medium sm:text-base p-2 sm:p-0`}
            onClick={handleFollowToggle}
        >
            {follow ? <IconUnSave /> : <IconSave />}
            <span className="ml-1">{follow ? "Unfollow" : "Follow"}</span>
        </Button>
    );
};

export default BtnToggleFollow;

