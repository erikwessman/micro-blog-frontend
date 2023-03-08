export default interface IArticle {
    _id: string;
    title: string;
    author: string;
    description?: string;
    date: string,
    categories: string[];
    image?: string;
    content: string;
}