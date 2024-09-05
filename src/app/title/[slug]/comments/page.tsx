import TabContent from "@/app/title/@component/tab.content.wrapper";
import RComment from "@/app/title/[slug]/comments/@components/crud/r/r.comment";
import { sendRequest } from "@/utils/api";

const CommentsTab = async (props: any) => {
    const { id, currentIdUser } = props;

    const comments = await sendRequest<CommentType[]>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/comments?comicId=${id}&_sort=updatedAt&_order=desc&_expand=author`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });
    return (
        <RComment
            id={id}
            currentIdUser={currentIdUser}
            comments={comments}
        ></RComment>
    );
};

export default CommentsTab;
