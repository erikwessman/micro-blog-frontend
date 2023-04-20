export default interface IComment {
    _id: string;
    author: {
        id: string;
        name: string;
    };
    date: number;
    content: string;
    article_id: string;
    is_owner: boolean;
}