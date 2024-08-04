import TabContent from "@/app/title/@component/tab.content.wrapper";
import Ratting from "@/app/title/[slug]/reviews/@component/ratting";

const ReviewsTab = () => {
    return (
        <TabContent>
            <Ratting></Ratting>
        </TabContent>
    );
};

export default ReviewsTab;
