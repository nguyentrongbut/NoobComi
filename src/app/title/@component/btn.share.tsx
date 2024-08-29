"use client";
import IconShare from "@/components/icon/icon.share";
import IconSuccess from "@/components/icon/icon.success";
import { toast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import IconCopy from "@/components/icon/icon.copy";
import IconClose from "@/components/icon/icon.close";
import Image from "next/image";
import IconSave from "@/components/icon/icon.save";
import IconHeart from "@/components/icon/icon.heart";
import IconEye from "@/components/icon/icon.eye";
import IconComment from "@/components/icon/icon.comment";
import IconAuthor from "@/components/icon/icon.author";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import IconFacebook from "@/components/icon/icon.facebook";
import IconTwitter from "@/components/icon/icon.twitter";
import IconDiscord from "@/components/icon/icon.discord";
import IconLinkedIn from "@/components/icon/icon.linkedin";
import IconInstagram from "@/components/icon/icon.instagram";
import Link from "next/link";

const BtnShare = (props: any) => {
    const {
        title,
        cover,
        author,
        totalFollow,
        totalLike,
        totalView,
        totalComment,
    } = props;

    const [url, setUrl] = useState("");
    useEffect(() => {
        let currentUrl = window.location.toString();
        currentUrl = currentUrl
            .replace("/comments", "")
            .replace("/reviews", "");
        setUrl(currentUrl);
    }, [window.location.href]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        console.log(url);
        toast({
            title: "Success!",
            description: "URL has been copied to clipboard.",
            icon: <IconSuccess />,
        });
    };
    function formatNumber(number: number) {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + "B";
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + "M";
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + "K";
        } else {
            return number?.toString();
        }
    }
    const shareOnPlatform = (platformUrl: string) => {
        window.open(platformUrl, "_blank", "noopener,noreferrer");
    };

    const platforms = [
        {
            name: "Share on Facebook",
            icon: IconFacebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        },
        {
            name: "Share on X",
            icon: IconTwitter,
            url: `https://x.com/intent/tweet?url=${url}`,
        },
        {
            name: "Share on LinkedIn",
            icon: IconLinkedIn,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
        },
    ];
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span className="flex primary-color hover:bg-blue-100 bg-white p-2 font-medium sm:text-base rounded-md">
                    <IconShare></IconShare>
                    <span className="ml-1">Share</span>
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-3xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-start flex justify-between items-center text-lg font-medium sm:text-xl mt-0 mb-2">
                        Share Title
                        <AlertDialogCancel className="border-none">
                            <IconClose></IconClose>
                        </AlertDialogCancel>
                    </AlertDialogTitle>

                    <Separator></Separator>
                    <div className="grid grid-cols-[6rem_1fr] gap-2">
                        <div className="aspect-[5/7] relative">
                            <Image
                                src={cover}
                                width={150}
                                height={134.39}
                                alt={title}
                                className="absolute top-0 h-full w-full left-0 object-cover rounded shadow"
                            ></Image>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold line-clamp-1 text-start">
                                {title}
                            </h2>
                            <div className="flex items-center gap-4 mt-2">
                                <span
                                    className="flex gap-2 items-center"
                                    title={totalFollow}
                                >
                                    <IconSave className="primary-color"></IconSave>
                                    <span>{formatNumber(totalFollow)}</span>
                                </span>
                                <span
                                    className="flex gap-2 items-center"
                                    title={totalLike}
                                >
                                    <IconHeart className="primary-color"></IconHeart>
                                    <span>{formatNumber(totalLike)}</span>
                                </span>
                                <span
                                    className="flex gap-2 items-center"
                                    title={totalView}
                                >
                                    <IconEye className="primary-color"></IconEye>
                                    <span>{formatNumber(totalView)}</span>
                                </span>
                                <span
                                    className="flex gap-2 items-center"
                                    title={totalComment}
                                >
                                    <IconComment className="primary-color"></IconComment>
                                    <span>{formatNumber(totalComment)}</span>
                                </span>
                            </div>
                            <div className="flex gap-2 py-1 mt-2">
                                <IconAuthor className="primary-color"></IconAuthor>
                                <span>{author}</span>
                            </div>
                        </div>
                    </div>
                    <Separator></Separator>
                    <div className="text-lg font-medium">Share on ...</div>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-0 flex items-center flex-col gap-2 sm:gap-0">
                    <div className="flex gap-3">
                        {platforms.map((platforms) => {
                            const LinkIcon = platforms?.icon;
                            return (
                                <Link
                                    href={platforms?.url}
                                    key={platforms?.name}
                                    title={platforms?.name}
                                    target="_blank"
                                    className="flex p-1 rounded-lg bg-[#e5e5e5] text-[#404040] items-center hover:bg-[#d4d4d4]"
                                >
                                    <LinkIcon className="size-5"></LinkIcon>
                                </Link>
                            );
                        })}
                    </div>
                    <span className="text-sm font-medium">Or</span>
                    <AlertDialogAction
                        onClick={copyToClipboard}
                        className="flex gap-1 text-sm sm:text-base p-1 rounded-full bg-[#e5e5e5] text-[#404040] items-center hover:bg-[#d4d4d4]"
                        title={url}
                    >
                        <IconCopy></IconCopy>
                        <span className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                            {url}
                        </span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BtnShare;
