import React, { useState, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';
import IArticle from "@/types/article";
import Article from "../article";
import styles from './articleCardDeck.module.css';

function to(i: number) {
    return {
        x: 0,
        y: i * -4,
        rot: -10 + Math.random() * 20,
        delay: i * 100,
    }
}

function from(_i: number) {
    return {
        x: 0,
        rot: 0,
        y: 2000
    }
}

export default function ArticleCardDeck(props: { articles: IArticle[] }) {
    const lastArticleUpdateTime = useRef<number>(0);
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);
    const [springs, springApi] = useSprings(props.articles.length, i => ({
            ...to(i),
            from: from(i)
        }),
        []
    )

    function handleAnimateArticle(articleIndex: number) {
        springApi.start(i => {
            if (i !== articleIndex) return;
            return {
                x: -500
            }
        })
    }

    function handleUserScrolled(up: boolean) {
        if (up && currentArticleIndex > 0) {
            const prevIndex = Math.max(currentArticleIndex - 1, 0);
            handleAnimateArticle(prevIndex);
            setCurrentArticleIndex(prevIndex)
        } else if (!up && currentArticleIndex < props.articles.length - 1) {
            const nextIndex = Math.min(currentArticleIndex + 1, props.articles.length);
            handleAnimateArticle(currentArticleIndex);
            setCurrentArticleIndex(nextIndex)
        }
    }

    function handleOnWheel(event: React.WheelEvent<HTMLElement>) {
        const now = new Date().getTime();
        if (now - lastArticleUpdateTime.current < 1000) {
            return;
        } else {
            lastArticleUpdateTime.current = now;
        }
        handleUserScrolled(event.deltaY < 0);
    }

    return (
        <div className={styles.card_container}>
            {springs.map((spring, index) => (
                <animated.div key={index}
                    style={{
                        zIndex: props.articles.length - index,
                        ...spring
                    }}
                    className={styles.card_deck}
                    onWheel={handleOnWheel}>
                    <Article article={props.articles[index]} />
                </animated.div>
            ))}
        </div>
    )
}