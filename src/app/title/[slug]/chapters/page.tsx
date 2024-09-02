import ChapterTab from "@/app/@chapter/chapter";
import TabContent from "@/app/title/@component/tab.content.wrapper";
import { sendRequest } from "@/utils/api";

const ChaptersTab = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html" ?? []);
    const temp1 = temp[0]?.split("-" ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const currentIdUser = 8;
    const currentUser = await sendRequest<IUser>({
        url: `${process.env.NEXT_PUBLIC_WEB_COMIC_API}/api/authors/${currentIdUser}`,
        method: "GET",
        nextOption: {
            cache: "no-store",
        },
    });

    return (
        <TabContent>
            <ChapterTab currentUser={currentUser} id={id}></ChapterTab>
        </TabContent>
    );
};

export default ChaptersTab;
