import IArticle from "../../types/article";
import Markdown from "markdown-to-jsx";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Tooltip } from "@mui/material";
import './article.sass'

export default function Article(props: { article: IArticle }) {
    return (
        <div className="entry">
            <div className="entry-body">
                <div className="entry-date">
                    <Tooltip title="Publish date">
                        <CalendarMonthIcon />
                    </Tooltip>
                    {props.article.date}
                </div>
                <h2>{props.article.title}</h2>
                <div className="entry-author">
                    <Tooltip title="Author">
                        <PermIdentityIcon />
                    </Tooltip>
                    {props.article.author}
                </div>
                <div className="entry-content">
                    <div className="entry-text">
                        <Markdown>
                            {props.article.content}
                        </Markdown>
                    </div>
                    {props.article.image ?
                        <div className="entry-image">
                            <img alt="article"
                                src={"/images/" + props.article.image}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src="/images/theo.jpeg";
                                  }} />
                        </div>
                        : null}
                </div>
            </div>
            <div className="entry-footer">
                Categories: {props.article.categories.join(', ')}
            </div>
        </div>
    )
}