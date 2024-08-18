'use client'
import IconDelete from "@/components/icon/icon.delete";


const DComment = () => {
    return (
        // // onClick={handleSubmit}
        <span className="flex items-center gap-2">
            <IconDelete className="size-6"></IconDelete>
            <span>Delete</span>
        </span>
    );
};

export default DComment;
