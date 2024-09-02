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
    const [follow, setFollow] = useState(true);
    const router = useRouter();
    const userId = 9;

    const handleFollowToggle = async () => {
        if (follow) {
            const followed = await sendRequest<ITopComics[]>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comics/${id}`,
                method: "PATCH",
                body: {
                    follow: totalFollow + 1,
                    followBy: [...followBy, userId],
                },
            });
            if (followed) {
                setFollow(false);
                router.refresh();
            }
        } else {
            const unfollowed = await sendRequest<ITopComics[]>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comics/${id}`,
                method: "PATCH",
                body: {
                    follow: totalFollow - 1,
                    followBy: followBy.filter((id) => id !== userId),
                },
            });
            if (unfollowed) {
                setFollow(true);
                router.refresh();
            }
        }
    };

    return follow ? (
        <Button
            className="flex bg-primary-color hover:opacity-90 sm:w-[228.5625px] font-medium sm:text-base p-2 sm:p-0"
            onClick={handleFollowToggle}
        >
            <IconSave />
            <span className="ml-1">Follow</span>
        </Button>
    ) : (
        <Button
            className="flex bg-[#e5e5e5] hover:bg-[#b2b2b2] sm:w-[228.5625px] font-medium sm:text-base p-2 sm:p-0 text-black"
            onClick={handleFollowToggle}
        >
            <IconUnSave />
            <span className="ml-1">Unfollow</span>
        </Button>
    );
};

export default BtnToggleFollow;
