export default interface Article {
    title: string;
    description?: string;
    date: string,
    categories: string[];
    image?: string;
    content?: string;
}