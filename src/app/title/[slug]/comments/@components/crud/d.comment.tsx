"use client";
import IconDelete from "@/components/icon/icon.delete";
import { sendRequest } from "@/utils/api";

const DComment = (props: any) => {
    const { commentId, fetchComments } = props;
    const deleteComment = async () => {
        const data = await sendRequest<IReviews>({
            url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments/${commentId}`,
            method: "DELETE",
        });
        if (data) {
            await fetchComments();
        }
    };
    return (
        <span className="flex items-center gap-2" onClick={deleteComment}>
            <IconDelete className="size-6"></IconDelete>
            <span>Delete</span>
        </span>
    );
};

export default DComment;
