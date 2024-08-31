"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import RatingReadOnly from "@/app/title/[slug]/reviews/@component/rating.read.only";
import CReviewComments from "@/app/title/[slug]/reviews/@component/crud/c.review.comments";
import UReviewComments from "@/app/title/[slug]/reviews/@component/crud/u.review.comments";
import DReviewComments from "@/app/title/[slug]/reviews/@component/crud/d.review.comments";
import { sendRequest } from "@/utils/api";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BtnUReview from "@/app/title/[slug]/reviews/@component/crud/btn.u.review";

dayjs.extend(relativeTime);

const RReviewComments = React.memo(
    ({
        id,
        currentIdUser,
        reviews,
    }: {
        id: number;
        currentIdUser: number;
        reviews: IReviews[];
    }) => {
        const [formUpdate, setFormUpdate] = useState(false);
        const [hiddenReviewCurrent, setHiddenReviewCurrent] = useState(true);

        const hasReviewId = useMemo(
            () => reviews.some((review) => review.authorId === currentIdUser),
            [reviews, currentIdUser]
        );

        const specialReview = useMemo(
            () =>
                reviews.find((review) => review.authorId === currentIdUser) ||
                null,
            [reviews, currentIdUser]
        );

        const otherReviews = useMemo(
            () => reviews.filter((review) => review.authorId !== currentIdUser),
            [reviews, currentIdUser]
        );

        return (
            <>
                <CReviewComments
                    id={id}
                    currentIdUser={currentIdUser}
                    hasReviewId={hasReviewId}
                />

                {specialReview && (
                    <UReviewComments
                        uId={specialReview.id}
                        currentIdUser={currentIdUser}
                        id={id}
                        setHiddenReviewCurrent={setHiddenReviewCurrent}
                        formUpdate={formUpdate}
                        setFormUpdate={setFormUpdate}
                        currentRating={specialReview.rated}
                        currentReview={specialReview.content}
                    />
                )}

                <Separator
                    className={`mt-4 bg-neutral-300 ${
                        currentIdUser ? "hidden" : ""
                    }`}
                />

                <section>
                    {reviews.length >= 1 ? (
                        <ul>
                            {specialReview && hiddenReviewCurrent && (
                                <li>
                                    <div>
                                        <div className="text-sm text-neutral-600">
                                            Your Review
                                        </div>
                                        <div className="flex gap-4 mt-4">
                                            <Link href="/author">
                                                <Avatar className="size-12 mb-auto">
                                                    <AvatarImage
                                                        src={
                                                            specialReview.author
                                                                ?.avatar
                                                        }
                                                        alt={
                                                            specialReview.author
                                                                ?.name
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {
                                                            specialReview.author
                                                                ?.name
                                                        }
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Link>
                                            <div className="flex flex-col gap-1">
                                                <Link href="/author">
                                                    <h3 className="font-medium line-clamp-1 break-all">
                                                        {
                                                            specialReview.author
                                                                ?.name
                                                        }
                                                        <span className="text-sm opacity-70 ml-1">
                                                            @
                                                            {
                                                                specialReview
                                                                    .author
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </h3>
                                                </Link>
                                                <div className="flex -ml-0.5">
                                                    <RatingReadOnly
                                                        stars={
                                                            specialReview.rated
                                                        }
                                                    />
                                                    <div className="text-neutral-500 whitespace-nowrap text-sm ml-2 mt-0.5">
                                                        {dayjs(
                                                            specialReview.updateAt
                                                        ).fromNow()}
                                                    </div>
                                                </div>
                                                <p>{specialReview.content}</p>
                                            </div>
                                            <div className="flex ml-auto items-start">
                                                <BtnUReview
                                                    setFormUpdate={
                                                        setFormUpdate
                                                    }
                                                    setHiddenReviewCurrent={
                                                        setHiddenReviewCurrent
                                                    }
                                                />
                                                <DReviewComments
                                                    dId={specialReview.id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="mt-4 bg-neutral-300" />
                                    {reviews.length === 1 && (
                                        <p className="mt-4">
                                            You&apos;re the only reviewer!
                                        </p>
                                    )}
                                </li>
                            )}
                            {otherReviews.map((review) => (
                                <li className="flex gap-4 mt-4" key={review.id}>
                                    <Link href="/author">
                                        <Avatar className="size-12 mb-auto">
                                            <AvatarImage
                                                src={review.author?.avatar}
                                                alt={review.author?.name}
                                            />
                                            <AvatarFallback>
                                                {review.author?.name}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className="flex flex-col gap-1">
                                        <Link href="/author">
                                            <h3 className="font-medium line-clamp-1 break-all">
                                                {review.author?.name}
                                                <span className="text-sm opacity-70 ml-1">
                                                    @{review.author?.name}
                                                </span>
                                            </h3>
                                        </Link>
                                        <div className="flex -ml-0.5">
                                            <RatingReadOnly
                                                stars={review.rated}
                                            />
                                            <div className="text-neutral-500 whitespace-nowrap text-sm mt-0.5 ml-2">
                                                {dayjs(
                                                    review.updateAt
                                                ).fromNow()}
                                            </div>
                                        </div>
                                        <p>{review.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-4">No Reviews</div>
                    )}
                </section>
            </>
        );
    }
);

RReviewComments.displayName = "RReviewComments";
export default RReviewComments;
