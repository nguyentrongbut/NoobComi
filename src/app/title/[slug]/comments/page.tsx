import TabContent from "@/app/title/@component/tab.content.wrapper";
import RComment from "@/app/title/[slug]/comments/@components/crud/r/r.comment";
import { sendRequest } from "@/utils/api";

const CommentsTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];
    const currentIdUser = 9;

    const comments = await sendRequest<CommentType[]>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments?comicId=${id}&_sort=updatedAt&_order=desc&_expand=author`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });
    return (
        <TabContent>
            <RComment id={id} currentIdUser={currentIdUser} comments={comments}></RComment>
        </TabContent>
    );
};

export default CommentsTab;
