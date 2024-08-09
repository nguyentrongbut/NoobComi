"use client";
import Rating from "@/app/title/[slug]/reviews/@component/rating";
import IconError from "@/components/icon/icon.error";
import IconLoading from "@/components/icon/icon.loading";
import IconSend from "@/components/icon/icon.send";
import IconSuccess from "@/components/icon/icon.success";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { sendRequest } from "@/utils/api";
import { useRef, useState } from "react";

const CReviewComments = (props: any) => {
    const { id, currentIdUser, fetchReviews, hasReviewId } = props;
    const [yourReviewComment, setYourReviewComment] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmittingRef.current) return;

        if (rating == null) {
            toast({
                title: "Error!",
                description: "Please rating",
                icon: <IconError className="text-red-600" />,
            });
        }

        setIsSubmitting(true);
        if (rating != null) {
            toast({
                title: "Please wait...",
                description: "Posting review",
                icon: <IconLoading />,
            });
        }

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
            if (data) {
                await fetchReviews();
                
                setYourReviewComment("");
            }
        }
        setIsSubmitting(false);
        toast({
            title: "Success!",
            description: "You have successfully reviewed",
            icon: <IconSuccess />,
        });
        isSubmittingRef.current = false;
    };
    
    return (
        <form onSubmit={handleSubmit} className={hasReviewId && "hidden"}>
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
                    className={`flex gap-1 items-center bg-primary-color p-1.5 ${
                        isSubmitting ? "pointer-events-none" : ""
                    }`}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting && rating !== null ? (
                        <IconLoading className="animate-spin" />
                    ) : (
                        <IconSend />
                    )}
                    <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                </Button>
            </div>
        </form>
    );
};

export default CReviewComments;
