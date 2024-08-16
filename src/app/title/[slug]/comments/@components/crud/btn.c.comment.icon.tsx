"use client";

import IconComments from "@/components/icon/icon.comments";

const BtnCCommentIcon = (props: any) => {
    const { toggleFormVisibility, idComment } = props;

    return (
        <div
            className="p-[5px] cursor-pointer hover:bg-neutral-100 rounded-md"
            onClick={() => toggleFormVisibility(idComment)}
        >
            <IconComments></IconComments>
        </div>
    );
};

export default BtnCCommentIcon;
