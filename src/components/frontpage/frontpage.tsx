import { useState, useEffect } from 'react';
import { api } from '../../api';
import Article from '../../types/article';
import Markdown from 'markdown-to-jsx';
import {
    Grid,
    Button
} from '@mui/material';

export default function Frontpage() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        getArticles();
    }, []);

    function getArticles() {
        api.get("/article/all")
            .then(response => {
                const articles_resp: Article[] = response.data;
                console.log(articles_resp)
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
                <Button>
                    Get status
                </Button>
                {articles.map((article) => (
                    <div>
                        <h2>{article.title}</h2>
                        <Markdown>
                            {article.content}
                        </Markdown>
                    </div>
                ))}
            </main>
        </div>
    )
}