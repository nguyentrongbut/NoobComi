"use client";
import Rating from "@/app/title/[slug]/reviews/@component/rating";
import IconLoading from "@/components/icon/icon.loading";
import IconSend from "@/components/icon/icon.send";
import IconSuccess from "@/components/icon/icon.success";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { sendRequest } from "@/utils/api";
import { useRef, useState } from "react";

const UReviewComments = (props: any) => {
    const {
        uId,
        currentIdUser,
        id,
        fetchReviews,
        setHiddenReviewCurrent,
        setFormUpdate,
        currentRating,
        currentReview,
        formUpdate,
    } = props;
    const [uRating, setURating] = useState(currentRating);
    const [uReview, setUReview] = useState(currentReview);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCancel, setIsCancel] = useState(true);
    const isSubmittingRef = useRef(false);

    const handleCancel = () => {
        setFormUpdate(false);
        setHiddenReviewCurrent(true);
        setIsCancel(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isSubmittingRef.current) return;

        setIsCancel(false);
        setIsSubmitting(true);
        if (!isCancel) {
            toast({
                title: "Please wait...",
                description: "Updating review",
                icon: <IconLoading />,
            });
        }
        if (uRating != null) {
            const data = await sendRequest<IReviews>({
                url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/reviews/${uId}`,
                method: "PATCH",
                body: {
                    comicId: id,
                    authorId: currentIdUser,
                    content: uReview,
                    rated: uRating,
                    updateAt: Date.now(),
                },
            });
            if (data && !isCancel) {
                setFormUpdate(false);
                fetchReviews();
                setHiddenReviewCurrent(true);
                toast({
                    title: "Success!",
                    description: "Your review was successfully updated.",
                    icon: <IconSuccess />,
                });
            }
        }
        setIsSubmitting(false);
        isSubmittingRef.current = false;
    };

    return (
        <form onSubmit={handleSubmit} className={formUpdate ? "" : "hidden"}>
            <Rating rating={uRating} setRating={setURating}></Rating>
            <div className="relative">
                <Textarea
                    className="form-input min-h-[7rem] mt-5 bg-neutral-100 border border-[#a3a3a3] transition-all  focus:border-[var(--primary-color)] focus:outline-none p-3"
                    value={uReview}
                    onChange={(e) => setUReview(e.target.value)}
                    placeholder=" "
                ></Textarea>
                <label className="form-label absolute left-2 text-neutral-700 text-base pointer-events-none select-none top-3 px-1 transition-all">
                    <span className="relative z-[2] overflow-hidden whitespace-nowrap">
                        Write a review
                    </span>
                    <div className="absolute left-0 bottom-0 w-full h-1/2 z-[1] bg-neutral-100"></div>
                </label>
            </div>
            <div className="flex justify-end mt-6 gap-2">
                <Button
                    className="bg-[rgb(229 229 229/1)] p-1 text-[rgb(64 64 64/1)] hover:bg-[rgb(212 212 212/1)]"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    className={`flex gap-1 items-center bg-primary-color p-1.5
                    } ${isSubmitting ? "pointer-events-none" : ""}`}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting && uRating !== null ? (
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

export default UReviewComments;
