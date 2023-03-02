export default interface IArticle {
    title: string;
    author: string;
    description?: string;
    date: string,
    categories: string[];
    image?: string;
    content: string;
}