import TabContent from "@/app/title/@component/tab.content.wrapper";
<<<<<<< HEAD
import RReviewComments from "@/app/title/[slug]/reviews/@component/crud/r.review.comments";
import { sendRequest } from "@/utils/api";
=======
import RReviewComments from "@/app/title/[slug]/reviews/@components/crud/r.review.comments";
>>>>>>> aecc83819a7ba90d04efdd55f4556534720dd068

const ReviewsTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = +temp1[temp1.length - 1];

    const currentIdUser = 9;

    const reviews = await sendRequest<IReviews[]>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/reviews?comicId=${id}&_sort=id&_order=desc&_expand=author`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <TabContent>
            <RReviewComments
                id={id}
                currentIdUser={currentIdUser}
                reviews={reviews}
            ></RReviewComments>
        </TabContent>
    );
};

export default ReviewsTab;
