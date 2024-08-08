"use client";
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

const DReviewComments = (props: any) => {
    const { dId, fetchReviews } = props;
    const handleSubmit = async () => {
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
            fetchReviews();
            toast({
                title: "Success!",
                description: "Your review was successfully deleted.",
                icon: <IconSuccess />,
            });
        }
    };

    return (
        <span className="p-1 cursor-pointer">
            <AlertDialog>
                <AlertDialogTrigger>
                    <IconDelete className="size-5 text-red-500"></IconDelete>
                </AlertDialogTrigger>
                <AlertDialogContent className="">
                    <AlertDialogHeader>
                        <Image
                            src={ImgQuestion}
                            alt="Are you sure you want to permamently delete this review?"
                            width={192}
                            height={192}
                            className="size-48 mx-auto"
                        ></Image>
                        <AlertDialogTitle>Delete this review?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to permamently delete this
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
};

export default DReviewComments;
