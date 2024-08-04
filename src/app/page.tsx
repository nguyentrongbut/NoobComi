import MainSlider from "@/components/slider/main.slider";
import TopSlider from "@/components/slider/top.slider";
import { sendRequest } from "@/utils/api";

export default async function Home() {
    const data = await sendRequest<ITopComics[]>({
        url: `${process.env.WEB_COMIC_API}/api/all-comics?sortByFollow=true`,
        method: "GET",
    });

    const like = await sendRequest<ITopComics[]>({
        url: `${process.env.WEB_COMIC_API}/api/top-liked`,
        method: "GET",
    });

    const follow = await sendRequest<ITopComics[]>({
        url: `${process.env.WEB_COMIC_API}/api/top-followed`,
        method: "GET",
    });

    return (
        <main>
            <MainSlider data={data}></MainSlider>
            <TopSlider
                data={follow}
                title="Most Followed"
                linkPage="/follow"
                showLinkPage={true}
            ></TopSlider>
            <TopSlider
                data={like}
                title="Most Liked"
                linkPage="/update"
                showLinkPage={true}
            ></TopSlider>
        </main>
    );
}
