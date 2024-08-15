"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import IconHeart from "@/components/icon/icon.heart";
import IconComments from "@/components/icon/icon.comments";
import { useState } from "react";
import IconDot from "@/components/icon/icon.dot";
import CCommentIcon from "@/app/title/[slug]/comments/@components/crud/c.comment.icon";

dayjs.extend(relativeTime);

const RCommentList: React.FC<RCommentListProps> = ({
    comments,
    parentId = null,
    className,
}) => {
    const [hiddenComments, setHiddenComments] = useState<{
        [key: number]: boolean;
    }>({});

    const toggleVisibility = (id: number) => {
        setHiddenComments((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const nestedComments = comments?.filter(
        (comment) => comment.parentId === parentId
    );

    return (
        <section className={className}>
            {nestedComments.map((comment) => {
                const childComments = comments.filter(
                    (childComment) => childComment.parentId === comment.id
                );

                return (
                    <div key={comment.id} className="relative flex pt-4">
                        <div className="w-full">
                            <div className={`${parentId ? "pl-4" : "pl-0"}`}>
                                {parentId && (
                                    <div className="absolute top-0 left-4 h-full w-[2px] bg-neutral-300"></div>
                                )}
                            </div>
                            <div
                                className={`pt-4 ${
                                    parentId !== null && "pl-10"
                                }`}
                            >
                                <div className="flex gap-4">
                                    <Link href="/">
                                        <Avatar className="size-10 mb-auto">
                                            <AvatarImage
                                                src={comment?.author?.avatar}
                                                alt={comment?.author?.name}
                                            />
                                            <AvatarFallback>
                                                {comment?.author?.name}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <Link href="/" className="font-medium">
                                            {comment?.author.name}
                                        </Link>
                                        <div className="opacity-70 text-xs sm:text-sm flex gap-1">
                                            <Link href="/">
                                                {`@${comment?.author?.name}`}
                                            </Link>
                                            <span>•</span>
                                            <span>
                                                {dayjs(
                                                    comment?.updatedAt
                                                ).fromNow()}
                                            </span>
                                        </div>
                                        <p className="mt-1 mb-2">
                                            {comment?.message}
                                        </p>
                                        <div className="flex items-center text-neutral-700 text-xs sm:text-sm font-medium gap-2">
                                            <div className="p-[5px] cursor-pointer flex items-center gap-1 hover:bg-neutral-100 rounded-md">
                                                <IconHeart className="size-5"></IconHeart>
                                                <span>React</span>
                                            </div>
                                            <CCommentIcon></CCommentIcon>
                                            <div className="cursor-pointer p-1 rounded-full hover:bg-neutral-100 ">
                                                <IconDot></IconDot>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-14 mt-2">
                                    {childComments.length > 0 && (
                                        <button
                                            onClick={() =>
                                                toggleVisibility(comment.id)
                                            }
                                            className="primary-color text-sm font-medium"
                                        >
                                            {!hiddenComments[comment.id]
                                                ? `Show ${childComments.length} replies`
                                                : `Hide replies`}
                                        </button>
                                    )}
                                </div>

                                <RCommentList
                                    comments={comments}
                                    parentId={comment?.id}
                                    className={`${
                                        !hiddenComments[comment.id]
                                            ? "max-h-0"
                                            : "max-h-[1000px]"
                                    } overflow-hidden transition-max-h`}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default RCommentList;
