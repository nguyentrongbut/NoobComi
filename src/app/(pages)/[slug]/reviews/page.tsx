import TabContent from "@/app/(pages)/@component/tab.content.wrapper";
import RReviewComments from "@/app/(pages)/[slug]/reviews/@components/crud/r.review.comments";
import { sendRequest } from "@/utils/api";

const ReviewsTab = async (props: any) => {
    const { id, currentIdUser } = props;

    const reviews = await sendRequest<IReviews[]>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/reviews?comicId=${id}&_sort=updatedAt&_order=desc&_expand=author`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <RReviewComments
            id={id}
            currentIdUser={currentIdUser}
            reviews={reviews}
        ></RReviewComments>
    );
};

export default ReviewsTab;
