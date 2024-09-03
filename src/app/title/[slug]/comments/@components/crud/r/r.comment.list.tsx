"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import IconHeart from "@/components/icon/icon.heart";
import { useState } from "react";
import CCommentIcon from "@/app/title/[slug]/comments/@components/crud/c/c.comment.icon";
import BtnCCommentIcon from "@/app/title/[slug]/comments/@components/crud/c/btn.c.comment.icon";
import IconDotDropdown from "@/app/title/[slug]/comments/@components/crud/icon.dot.dropdown";
import UComment from "@/app/title/[slug]/comments/@components/crud/u/u.comment";

dayjs.extend(relativeTime);

const RCommentList: React.FC<RCommentListProps> = ({
    comments,
    parentId = null,
    className,
    currentIdUser,
    id,
    setLoading,
}) => {
    const [hiddenComments, setHiddenComments] = useState<{
        [key: number]: boolean;
    }>({});
    const [hiddenForm, setHiddenForm] = useState<{
        [key: number]: boolean;
    }>({});
    const [hiddenFormEdit, setHiddenFormEdit] = useState<{
        [key: number]: boolean;
    }>({});

    const toggleVisibility = (id: number) => {
        setHiddenComments((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleFormVisibility = (id: number) => {
        setHiddenForm((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleFormEditVisibility = (id: number) => {
        setHiddenFormEdit((prev) => ({
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
                                    <div className="w-full">
                                        <Link href="/" className="font-medium">
                                            {comment?.author.name}
                                        </Link>
                                        <div className="opacity-70 text-xs sm:text-sm flex gap-1">
                                            <Link href="/" className="line-clamp-1">
                                                {`@${comment?.author?.name}`}
                                            </Link>
                                            <span>•</span>
                                            <span className="line-clamp-1">
                                                {dayjs(
                                                    comment?.updatedAt
                                                ).fromNow()}
                                            </span>
                                        </div>
                                        {hiddenFormEdit[comment.id] ? (
                                            <UComment
                                                commentId={comment?.id}
                                                toggleFormEditVisibility={
                                                    toggleFormEditVisibility
                                                }
                                                messageComment={
                                                    comment?.message
                                                }
                                                setLoading={setLoading}
                                            ></UComment>
                                        ) : (
                                            <div>
                                                <p className="mt-1 mb-2">
                                                    {comment?.message}
                                                </p>
                                                <div className="flex items-center text-neutral-700 text-xs sm:text-sm font-medium gap-2">
                                                    <div className="p-[5px] cursor-pointer flex items-center gap-1 hover:bg-neutral-100 rounded-md">
                                                        <IconHeart className="size-5"></IconHeart>
                                                        <span>React</span>
                                                    </div>
                                                    <BtnCCommentIcon
                                                        toggleFormVisibility={
                                                            toggleFormVisibility
                                                        }
                                                        idComment={comment.id}
                                                    ></BtnCCommentIcon>
                                                    <IconDotDropdown
                                                        commentId={comment?.id}
                                                        currentIdUser={
                                                            currentIdUser
                                                        }
                                                        commentUserId={
                                                            comment?.author?.id
                                                        }
                                                        toggleFormEditVisibility={
                                                            toggleFormEditVisibility
                                                        }
                                                        setLoading={setLoading}
                                                    ></IconDotDropdown>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {hiddenForm[comment.id] && (
                                    <div className="mt-4 ml-14">
                                        <CCommentIcon
                                            toggleFormVisibility={
                                                toggleFormVisibility
                                            }
                                            yourParentId={comment.id}
                                            currentIdUser={currentIdUser}
                                            id={id}
                                        ></CCommentIcon>
                                    </div>
                                )}
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
                                    currentIdUser={currentIdUser}
                                    id={id}
                                    setLoading={setLoading}
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
