import IArticle from "@/types/article";
import Article from "./article";

export default function ArticleTimeline(props: { articles: IArticle[] }) {
    return (
        <article>
            {props.articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </article>
    )
}