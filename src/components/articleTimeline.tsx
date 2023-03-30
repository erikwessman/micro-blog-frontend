import { Box } from "@mui/material";
import { useSprings, animated } from '@react-spring/web';
import IArticle from "@/types/article";
import ArticlePreview from "./articlePreview";

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
        from: from(i),
        config: {
            mass: 1,
            tension: 170,    
            friction: 26
        }
    }), [])

    return (
        <Box component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
            {springs.map((spring, index) => (
                <animated.div key={index}
                    style={{ ...spring }}>
                    <ArticlePreview article={props.articles[index]} />
                </animated.div>
            ))}
        </Box>
    )
}