export {}
declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: {[key:string]: any};
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
    }
}