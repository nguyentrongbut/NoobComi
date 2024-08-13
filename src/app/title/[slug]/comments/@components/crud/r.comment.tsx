"use client";
import RCommentList from "@/app/title/[slug]/comments/@components/crud/r.comment.list";
import { sendRequest } from "@/utils/api";

import { useCallback, useEffect, useState } from "react";
const RComment = ({ id }: any) => {
    const [comments, setComments] = useState<CommentType[]>([]);

    const fetchReviews = useCallback(async () => {
        const comments = await sendRequest<CommentType[]>({
            url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments?comicId=${id}&_expand=author`,
            method: "GET",
            nextOption: {
                cache: "no-store",
            },
        });
        setComments(comments);
    }, [id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return comments.length >= 1 ? (
        <RCommentList comments={comments} />
    ) : (
        <div className="my-6 text-center text-neutral-700">No Comments</div>
    );
};

export default RComment;
