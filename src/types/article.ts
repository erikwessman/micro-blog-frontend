export default interface Article {
    title: string;
    author: string;
    description?: string;
    date: string,
    categories: string[];
    image?: string;
    content?: string;
}