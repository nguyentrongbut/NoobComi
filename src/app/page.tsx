import MainSlider from "@/components/slider/main.slider";
import TopSlider from "@/components/slider/top.slider";
import { sendRequest } from "@/utils/api";

export default async function Home() {
    const data = await sendRequest<ITopComics[]>({
        url: "http://localhost:3009/api/all-comics?sortByFollow=true",
        method: "GET",
    });
    // console.log(">> check res: ", data);
    const like = await sendRequest<ITopComics[]>({
        url: "http://localhost:3009/api/top-liked",
        method: "GET",
    });

    const follow = await sendRequest<ITopComics[]>({
        url: "http://localhost:3009/api/top-followed",
        method: "GET",
    });

    return (
        <main>
            <MainSlider data={data}></MainSlider>
            <TopSlider data={follow} title="Most Followed"></TopSlider>
            <TopSlider data={like} title="Most Liked"></TopSlider>
        </main>
    );
}
