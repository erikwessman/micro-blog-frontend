import IArticle from "../../types/article";
import Markdown from "markdown-to-jsx";

export default function Article(props: { article: IArticle }) {

    return (
        <div className="holla">
            <div>
                <h2>{props.article.title}</h2>
                <div>
                    {props.article.date}
                </div>
                <Markdown>
                    {props.article.content}
                </Markdown>
            </div>
            <div>
                Categories: {props.article.categories}
            </div>
        </div>
    )
}