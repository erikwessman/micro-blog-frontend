export default interface IArticle {
    _id: string;
    title: string;
    author: string;
    description?: string;
    date: string,
    categories: string[];
    image?: IImage;
    content: string;
}

interface IImage {
    src: string;
    alt: string;
    caption?: string;
}