"use client";
import DComment from "@/app/title/[slug]/comments/@components/crud/d.comment";
import IconDelete from "@/components/icon/icon.delete";
import IconDot from "@/components/icon/icon.dot";
import IconFlag from "@/components/icon/icon.flag";
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

const IconDotDropdown = () => {
    const removePointerENone = () => {
        document.body.classList.add("!pointer-events-auto");
    };
    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer p-1 rounded-full hover:bg-neutral-100 ">
                        <IconDot></IconDot>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none p-0 min-w-max divide-y divide-neutral-300/50 shadow-[0_0_8px_1px_rgba(0,0,0,0.1)]">
                    <DropdownMenuItem className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50 border-b-[#e5e7eb]">
                        <Button className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal">
                            <IconFlag></IconFlag>
                            <span>Report</span>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50 border-b-[#e5e7eb]">
                        <Button className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal">
                            <IconUpdate></IconUpdate>
                            <span>Edit</span>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer p-0 flex justify-center hover:bg-neutral-200/50"
                        inert
                    >
                        <AlertDialogTrigger>
                            <Button className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal">
                                <IconDelete></IconDelete>
                                <span>Delete</span>
                            </Button>
                        </AlertDialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Image
                        src={ImgQuestion}
                        alt="Are you sure you want to delete this comment?"
                        width={192}
                        height={192}
                        className="size-48 mx-auto"
                    />
                    <AlertDialogTitle>
                        Are you sure you want to delete this comment?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-red-400 hover:bg-red-500">
                        <DComment></DComment>
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={removePointerENone}>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default IconDotDropdown;
