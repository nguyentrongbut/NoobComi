"use client";

import CComment from "@/app/title/[slug]/comments/@components/crud/c/c.comment";
import RCommentList from "@/app/title/[slug]/comments/@components/crud/r/r.comment.list";
import IconLoading from "@/components/icon/icon.loading";
import { sendRequest } from "@/utils/api";

import { useCallback, useEffect, useState } from "react";

const RComment = ({ id, currentIdUser }: any) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = useCallback(async () => {
        const comments = await sendRequest<CommentType[]>({
            url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments?comicId=${id}&_sort=updatedAt&_order=desc&_expand=author`,
            method: "GET",
            nextOption: {
                cache: "no-store",
            },
        });
        setComments(comments);
    }, [id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <>
            <CComment
                id={id}
                currentIdUser={currentIdUser}
                fetchComments={fetchComments}
                setLoading={setLoading}
            ></CComment>
            {comments.length >= 1 ? (
                <RCommentList
                    comments={comments}
                    currentIdUser={currentIdUser}
                    fetchComments={fetchComments}
                    id={id}
                    setLoading={setLoading}
                />
            ) : (
                <div className="my-6 text-center text-neutral-700">
                    No Comments
                </div>
            )}
            {loading && (
                <div className="fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center">
                    <IconLoading className="animate-spin primary-color size-11"></IconLoading>
                </div>
            )}
        </>
    );
};

export default RComment;
