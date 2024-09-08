"use client";
import DComment from "@/app/(pages)/title/[slug]/comments/@components/crud/d.comment";  
import IconDelete from "@/components/icon/icon.delete";
import IconDot from "@/components/icon/icon.dot";
import IconUpdate from "@/components/icon/icon.update";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import ImgQuestion from "@/../public/images/question.png";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import IconFlag from "@/components/icon/icon.flag";
import BtnUComment from "@/app/(pages)/title/[slug]/comments/@components/crud/u/btn.u.comment";

const IconDotDropdown = (props: any) => {
    const { commentId, fetchComments, currentIdUser, commentUserId, toggleFormEditVisibility, setLoading } = props;
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const removePointerENone = () => {
        document.body.classList.add("!pointer-events-auto");
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer p-1 rounded-full hover:bg-neutral-100 ">
                        <IconDot></IconDot>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center"
                    className="border-none p-0 min-w-max divide-y divide-neutral-300/50 shadow-[0_0_8px_1px_rgba(0,0,0,0.1)]"
                >
                    <DropdownMenuItem
                        onClick={() => setIsReportDialogOpen(true)}
                        className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50 border-b-[#e5e7eb]"
                    >
                        <Button className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal">
                            <IconFlag></IconFlag>
                            <span>Report</span>
                        </Button>
                    </DropdownMenuItem>
                    {currentIdUser === commentUserId && (
                        <>
                            <DropdownMenuItem className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50 border-b-[#e5e7eb]">
                                <BtnUComment toggleFormEditVisibility={toggleFormEditVisibility} commentId={commentId}></BtnUComment>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setIsDeleteDialogOpen(true)}
                                className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50"
                            >
                                <Button className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal">
                                    <IconDelete></IconDelete>
                                    <span>Delete</span>
                                </Button>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
                open={isReportDialogOpen}
                onOpenChange={() => setIsReportDialogOpen(!isReportDialogOpen)}
            >
                <AlertDialogContent className="gap-0 sm:px-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-medium text-lg mt-0">
                            Report this comment
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="relative">
                        <Textarea
                            className="form-input-report min-h-[7rem] mt-5 bg-neutral-100 border border-[#a3a3a3] focus:border-[var(--primary-color)] focus:outline-none p-3"
                            placeholder=" "
                        ></Textarea>
                        <label className="form-label-report absolute left-2 text-neutral-700 text-base pointer-events-none select-none top-7 px-1 transition-all">
                            <span className="relative z-[2] overflow-hidden whitespace-nowrap">
                                Enter a reason...
                            </span>
                            <div className="absolute left-0 bottom-0 w-full h-1/2 z-[1] bg-neutral-100"></div>
                        </label>
                    </div>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel onClick={removePointerENone}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={removePointerENone}
                            className="bg-primary-color"
                        >
                            Submit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
            >
                <AlertDialogTrigger asChild></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Image
                            src={ImgQuestion}
                            alt="Are you sure you want to delete this comment?"
                            width={192}
                            height={192}
                            className="size-48 mx-auto"
                        />
                        <AlertDialogTitle className="font-medium text-lg sm:text-xl">
                            Are you sure you want to delete this comment?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            className="bg-red-400 hover:bg-red-500 p-0 text-base"
                            onClick={removePointerENone}
                        >
                            <DComment
                                commentId={commentId}
                                fetchComments={fetchComments}
                                setLoading={setLoading}
                            ></DComment>
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={removePointerENone} className="text-base">
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default IconDotDropdown;
