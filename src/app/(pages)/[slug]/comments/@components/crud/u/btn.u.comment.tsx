import IconUpdate from "@/components/icon/icon.update";
import { Button } from "@/components/ui/button";

const BtnUComment = (props: any) => {
    const { commentId, toggleFormEditVisibility } = props;
    return (
        <Button
            className="flex justify-start gap-2 bg-transparent text-black px-4 pt-2 w-full text-sm sm:text-base font-normal"
            onClick={() => toggleFormEditVisibility(commentId)}
        >
            <IconUpdate></IconUpdate>
            <span>Edit</span>
        </Button>
    );
};

export default BtnUComment;
