"use client";
import React, { useCallback } from "react";
import IconDelete from "@/components/icon/icon.delete";
import { sendRequest } from "@/utils/api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImgQuestion from "@/../public/images/question.png";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import IconSuccess from "@/components/icon/icon.success";
import IconLoading from "@/components/icon/icon.loading";

const DReviewComments = React.memo((props: any) => {
    const { dId, fetchReviews } = props;

    const handleSubmit = useCallback(async () => {
        toast({
            title: "Please wait...",
            description: "Deleting review",
            icon: <IconLoading />,
        });

        const data = await sendRequest<IReviews>({
            url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/reviews/${dId}`,
            method: "DELETE",
        });

        if (data) {
            await fetchReviews();
            toast({
                title: "Success!",
                description: "Your review was successfully deleted.",
                icon: <IconSuccess />,
            });
        }
    }, [dId, fetchReviews]);

    return (
        <span className="p-1 cursor-pointer">
            <AlertDialog>
                <AlertDialogTrigger>
                    <IconDelete className="size-5 text-red-500" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Image
                            src={ImgQuestion}
                            alt="Are you sure you want to permanently delete this review?"
                            width={192}
                            height={192}
                            className="size-48 mx-auto"
                        />
                        <AlertDialogTitle>Delete this review?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to permanently delete this
                            review?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSubmit}
                            className="bg-red-400 hover:bg-red-500"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </span>
    );
});

export default DReviewComments;
