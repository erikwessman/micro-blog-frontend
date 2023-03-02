import { useState, useEffect } from 'react';
import { api } from '../../api';
import Article from '../../types/article';
import Markdown from 'markdown-to-jsx';
import { Container } from '@mui/material';

export default function Frontpage() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        getArticles();
    }, []);

    function getArticles() {
        api.get("/article")
            .then(response => {
                const articles_resp: Article[] = response.data;
                setArticles(articles_resp);
            })
            .catch(error => {
                if (error.response) {
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
    }

    return (
        <div>
            <main>
                <Container>
                    <article>
                        {articles.map((article, index) => (
                            <div key={index}>
                                <h2>{article.title}</h2>
                                <Markdown>
                                    {article.content}
                                </Markdown>
                            </div>
                        ))}
                    </article>
                </Container>
            </main>
        </div>
    )
}