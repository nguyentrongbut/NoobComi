"use client";
import { Button } from "@/components/ui/button";

const BtnWriteAReview = () => {
    return (
        <Button className="sm:flex primary-color hover:bg-blue-100 bg-white font-medium p-0 text-base hidden">
            <span className="p-2">Write a review</span>
        </Button>
    );
};

export default BtnWriteAReview;
