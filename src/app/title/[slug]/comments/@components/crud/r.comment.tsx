"use client";
import CComment from "@/app/title/[slug]/comments/@components/crud/c.comment";
import RCommentList from "@/app/title/[slug]/comments/@components/crud/r.comment.list";
import { sendRequest } from "@/utils/api";

import { useCallback, useEffect, useState } from "react";
const RComment = ({ id, currentIdUser }: any) => {
    const [comments, setComments] = useState<CommentType[]>([]);

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
        <CComment id={id} currentIdUser={currentIdUser} fetchComments={fetchComments}></CComment>
        {comments.length >= 1 ? (
        <RCommentList comments={comments} />
    ) : (
        <div className="my-6 text-center text-neutral-700">No Comments</div>
    )}
        </>
    );
};

export default RComment;
