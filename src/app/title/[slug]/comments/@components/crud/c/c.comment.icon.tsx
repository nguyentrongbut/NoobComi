"use client";
import IconSend from "@/components/icon/icon.send";
import IconUploadImage from "@/components/icon/icon.upload.image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const CCommentIcon = (props: any) => {
    const {
        currentIdUser,
        id,
        fetchComments,
        yourParentId,
        toggleFormVisibility,
    } = props;
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [yourComment, setYourComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const user = await sendRequest<IUser>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/authors/${currentIdUser}`,
                method: "GET",
            });
            setCurrentUser(user);
        };
        fetchData();
    }, [currentIdUser]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (yourComment !== "") {
            const data = await sendRequest<CommentType>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments`,
                method: "POST",
                body: {
                    comicId: +id,
                    authorId: currentIdUser,
                    message: yourComment,
                    parentId: yourParentId,
                },
            });
            if (data) {
                await fetchComments();
                setYourComment("");
                handleCancel();
            }
        }
    };

    const handleCancel = () => {
        setYourComment("");
        toggleFormVisibility(yourParentId);
    };
    return (
        <section className="flex gap-4">
            <div>
                <Link href="/">
                    <Avatar className="size-10 mb-auto">
                        <AvatarImage
                            src={currentUser?.avatar}
                            alt={currentUser?.name}
                        />
                        <AvatarFallback>{currentUser?.name}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-2">
                    <Link href="/" className="font-medium">
                        {currentUser?.name}
                    </Link>
                    <div className="text-sm opacity-70">
                        <Link href="/">{`@${currentUser?.name}`}</Link>
                    </div>
                </div>
                <Textarea
                    className="border-0 py-0 pl-0 text-sm sm:text-base min-h-12 block"
                    placeholder="Express your thoughts"
                    value={yourComment}
                    onChange={(e) => setYourComment(e.target.value)}
                    autoFocus
                ></Textarea>
                <Separator className="my-2"></Separator>
                <div className="flex justify-between items-center">
                    <IconUploadImage className="primary-color opacity-50 cursor-pointer pointer-events-none"></IconUploadImage>
                    <div className="flex gap-2">
                        <Button
                            className="rounded-full bg-[#e5e5e5] hover:bg-[#d4d4d4] text-[rgb(64 64 64 / 1)] py-[5px] px-[9px]"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`bg-primary-color rounded-full flex items-center gap-1 px-2 py-1.5 ${
                                yourComment === ""
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                            type="submit"
                        >
                            <span>Post</span>
                            <IconSend></IconSend>
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CCommentIcon;
