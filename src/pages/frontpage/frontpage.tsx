import { useState, useEffect } from 'react';
import { api } from '../../api';
import IArticle from '../../types/article';
import { Container } from '@mui/material';
import Article from '../../components/article/article';

export default function Frontpage() {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        getArticles();
    }, []);

    function getArticles() {
        api.get("/article")
            .then(response => {
                const articles_resp: IArticle[] = response.data;
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
                            <Article key={index}
                                article={article} />
                        ))}
                    </article>
                </Container>
            </main>
        </div>
    )
}