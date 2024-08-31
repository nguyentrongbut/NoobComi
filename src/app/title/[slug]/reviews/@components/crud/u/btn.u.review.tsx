'use client'
import React, { useCallback } from "react";
import IconUpdate from "@/components/icon/icon.update";

const BtnUReview = React.memo(
    ({ setFormUpdate, setHiddenReviewCurrent }: any) => {
        const handleClick = useCallback(() => {
            setFormUpdate(true);
            setHiddenReviewCurrent(false);
        }, [setFormUpdate, setHiddenReviewCurrent]);

        return (
            <span className="p-1 cursor-pointer" onClick={handleClick}>
                <IconUpdate className="size-5" />
            </span>
        );
    }
);

BtnUReview.displayName = "BtnUReview";
export default BtnUReview;
