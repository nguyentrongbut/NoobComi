"use client";

import CComment from "@/app/(pages)/title/[slug]/comments/@components/crud/c/c.comment";
import RCommentList from "@/app/(pages)/title/[slug]/comments/@components/crud/r/r.comment.list";
import IconLoading from "@/components/icon/icon.loading";

import { useState } from "react";

const RComment = ({ id, currentIdUser, comments }: any) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <CComment
                id={id}
                currentIdUser={currentIdUser}
                setLoading={setLoading}
            ></CComment>
            {comments.length >= 1 ? (
                <RCommentList
                    comments={comments}
                    currentIdUser={currentIdUser}
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
