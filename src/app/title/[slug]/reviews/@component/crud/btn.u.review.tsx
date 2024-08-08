import IconUpdate from "@/components/icon/icon.update";


const BtnUReview = (props: any) => {
    const { setFormUpdate, setHiddenReviewCurrent } = props;

    const handleClick = () => {
        setFormUpdate(true);
        setHiddenReviewCurrent(false);
    };
    
    return (
        <span className="p-1 cursor-pointer" onClick={handleClick}>
            <IconUpdate className="size-5"></IconUpdate>
        </span>
    );
};

export default BtnUReview;
