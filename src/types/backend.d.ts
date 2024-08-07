export { }
declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface ITopComics {
        id: number;
        title: string;
        desc: string;
        cover: string;
        banner: string;
        author: {
            name: string;
        }
        genres: string[];
        views: number;
        likes: number;
        follow: number;
        totalComment: number;
        updatedAt: number;
        createdAt: number;
        state: string;
        rating: number
    }

    interface IChapter {
        id: number;
        comicId: number;
        title: string;
        content: string;
        cover: string;
        images: Array;
        views: number;
        comments: number;
        likes: number;
        vip: boolean;
        createdAt: number
    }

    interface IReviews {
        id: number;
        comicId: number;
        authorId: number,
        content: string,
        rated: number,
        createdAt: number,
        updateAt: number,
        author: {
            id: number,
            name: string,
            country: string,
            avatar: string,
            banner: string
        }
    }
}