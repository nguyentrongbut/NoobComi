import TabContent from "@/app/title/@component/tab.content.wrapper";
import RReviewComments from "@/app/title/[slug]/reviews/@component/crud/r.review.comments";

const ReviewsTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];
    const currentIdUser = 9;

    return (
        <TabContent>
            <RReviewComments
                id={id}
                currentIdUser={currentIdUser}
            ></RReviewComments>
        </TabContent>
    );
};

export default ReviewsTab;
