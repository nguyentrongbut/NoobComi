import TabContent from "@/app/title/@component/tab.content.wrapper";
import RComment from "@/app/title/[slug]/comments/@components/crud/r.comment";

const CommentsTab = (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];
    const currentIdUser = 9;
    return (
        <TabContent>
            <RComment id={id}></RComment>
        </TabContent>
    );
};

export default CommentsTab;
