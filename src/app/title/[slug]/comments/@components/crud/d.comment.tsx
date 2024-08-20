"use client";
import IconDelete from "@/components/icon/icon.delete";
import { sendRequest } from "@/utils/api";

const DComment = (props: any) => {
    const { commentId, fetchComments, setLoading } = props;
    const deleteComment = async () => {
        setLoading(true);
        const data = await sendRequest<IReviews>({
            url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments/${commentId}`,
            method: "DELETE",
        });
        if (data) {
            await fetchComments();
            setLoading(false);
        }
    };
    return (
        <span
            className="flex items-center gap-2 px-2 py-2"
            onClick={deleteComment}
        >
            <IconDelete className="size-6"></IconDelete>
            <span>Delete</span>
        </span>
    );
};

export default DComment;
