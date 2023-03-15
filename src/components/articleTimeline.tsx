import { Box } from "@mui/material";
import { useSprings, animated } from '@react-spring/web';
import IArticle from "@/types/article";
import Article from "./article";

function to(i: number) {
    return {
        x: 0,
        y: 0,
        delay: i * 100,
    }
}

function from(_i: number) {
    return {
        x: 0,
        y: 2000
    }
}

export default function ArticleTimeline(props: { articles: IArticle[] }) {
    const [springs] = useSprings(props.articles.length, i => ({
        ...to(i),
        from: from(i)
    }), [])

    return (
        <Box component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            {springs.map((spring, index) => (
                <animated.div key={index}
                    style={{ ...spring }}>
                    <Article article={props.articles[index]} />
                </animated.div>
            ))}
        </Box>
    )
}