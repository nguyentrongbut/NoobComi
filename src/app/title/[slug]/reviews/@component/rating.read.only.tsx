import IconStar from "@/components/icon/icon.star";
import IconStarBorder from "@/components/icon/icon.star.border";
import IconStarHalf from "@/components/icon/icon.star.half";

const RatingReadOnly = (props: { stars: number; half?: boolean }) => {
    const { stars, half = false } = props;
    const rattingStar = Array.from({ length: 5 }, (elm, index) => {
        let number = index + 0.5;
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <IconStar className="primary-color size-5" />
                ) : stars >= number ? (
                    <IconStarHalf className={half ? "primary-color" : ""} />
                ) : (
                    <IconStarBorder
                        className={`size-5 ${half ? "primary-color" : ""}`}
                    />
                )}
            </span>
        );
    });
    return <div className="flex">{rattingStar}</div>;
};

export default RatingReadOnly;
