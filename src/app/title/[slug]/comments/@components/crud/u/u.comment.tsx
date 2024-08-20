'use client'
import IconUpdate from "@/components/icon/icon.update";
import IconUploadImage from "@/components/icon/icon.upload.image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/utils/api";
import { useState } from "react";

const UComment = (props: any) => {
    const {commentId, toggleFormEditVisibility, messageComment, fetchComments, setLoading} = props;
    const [uComment, setUComment] = useState(messageComment)
    const handleCancel = () => {
        toggleFormEditVisibility(commentId)
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if (uComment !== "") {
            const data = await sendRequest<CommentType>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments/${commentId}`,
                method: "PATCH",
                body: {
                    message: uComment,
                    updatedAt: Date.now(),
                },
            });
            if (data) {
                await fetchComments();
                setUComment("");
                handleCancel();
                setLoading(false)
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-1.5">
            <Textarea
                className="border-0 py-0 pl-0 text-sm sm:text-base min-h-12 block"
                value={uComment}
                onChange={(e) => setUComment(e.target.value)}
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
                        className={`bg-primary-color rounded-full flex items-center gap-1 px-2 py-1.5 
                    `}
                        type="submit"
                    >
                        <span>Edit</span>
                        <IconUpdate></IconUpdate>
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UComment;
