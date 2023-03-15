import { Box } from "@mui/material";
import IArticle from "@/types/article";
import Article from "./article";

export default function ArticleTimeline(props: { articles: IArticle[] }) {
    return (
        <Box component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            {props.articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </Box>
    )
}