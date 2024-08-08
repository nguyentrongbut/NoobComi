"use client";
import Rating from "@/app/title/[slug]/reviews/@component/rating";
import IconLoading from "@/components/icon/icon.loading";
import IconSend from "@/components/icon/icon.send";
import IconSuccess from "@/components/icon/icon.success";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { sendRequest } from "@/utils/api";
import { useState } from "react";

const CReviewComments = (props: any) => {
    const { id, currentIdUser, fetchReviews, hasReviewId } = props;
    const [yourReviewComment, setYourReviewComment] = useState("");
    const [rating, setRating] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (rating != null && !hasReviewId) {
            const data = await sendRequest<IReviews>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/reviews`,
                method: "POST",
                body: {
                    comicId: id,
                    authorId: currentIdUser,
                    content: yourReviewComment,
                    rated: rating,
                },
            });
            if (!data) {
                toast({
                    title: "Please wait...",
                    description: "Posting review",
                    icon: <IconLoading />,
                });
            } else {
                setYourReviewComment("");
                fetchReviews();
                toast({
                    title: "Success!",
                    description: "You have successfully reviewed",
                    icon: <IconSuccess />,
                });
            }
        }
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className={hasReviewId && "hidden"}
        >
            <Rating rating={rating} setRating={setRating}></Rating>
            <div className="relative">
                <Textarea
                    className="form-input min-h-[7rem] mt-5 bg-neutral-100 border border-[#a3a3a3] transition-all  focus:border-[var(--primary-color)] focus:outline-none p-3"
                    value={yourReviewComment}
                    onChange={(e) => setYourReviewComment(e.target.value)}
                    placeholder=" "
                ></Textarea>
                <label className="form-label absolute left-2 text-neutral-700 text-base pointer-events-none select-none top-3 px-1 transition-all">
                    <span className="relative z-[2] overflow-hidden whitespace-nowrap">
                        Write a review
                    </span>
                    <div className="absolute left-0 bottom-0 w-full h-1/2 z-[1] bg-neutral-100"></div>
                </label>
            </div>
            <div className="flex justify-end mt-6">
                <Button
                    className="flex gap-1 items-center bg-primary-color p-1.5"
                    onClick={handleSubmit}
                >
                    <IconSend></IconSend>
                    <span>Submit</span>
                </Button>
            </div>
        </form>
    );
};

export default CReviewComments;
