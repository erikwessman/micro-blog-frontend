import React, { useState, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';
import IArticle from "@/types/article";
import Article from "./article";

export default function ArticleCardDeck(props: { articles: IArticle[] }) {
    const lastArticleUpdateTime = useRef<number>(0);
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);
    const [springs, springApi] = useSprings(
        props.articles.length,
        () => ({
            from: { x: 0 },
        }),
        []
    )

    function handleAnimateArticle(articleIndex: number) {
        springApi.start(i => {
            if (i !== articleIndex) return;
            return {
                from: {
                    x: 0,
                },
                to: {
                    x: 2000,
                }
            }
        })
    }

    function handleUserScrolled(up: boolean) {
        if (up) {
            const prevIndex = Math.max(currentArticleIndex - 1, 0);
            handleAnimateArticle(prevIndex);
            setCurrentArticleIndex(prevIndex)
        } else {
            const nextIndex = Math.min(currentArticleIndex + 1, props.articles.length);
            handleAnimateArticle(currentArticleIndex);
            setCurrentArticleIndex(nextIndex)
        }
    }

    function handleWheel(event: React.WheelEvent<HTMLElement>) {
        let now = new Date().getTime();
        if (now - lastArticleUpdateTime.current < 1000) {
            return;
        } else {
            lastArticleUpdateTime.current = now;
        }
        handleUserScrolled(event.deltaY < 0);
    }

    return (
        <article onWheel={handleWheel}>
            {springs.map((spring, index) => (
                <animated.div key={index} style={spring}>
                    <Article article={props.articles[index]} />
                </animated.div>
            ))}
        </article>
    )
}