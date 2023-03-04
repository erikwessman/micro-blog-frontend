import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import IArticle from '../../types/article';
import { Container, Box, TextField, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Article from '../../components/article/article';

export default function Frontpage() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getArticles(searchParams);
    }, [searchParams]);

    function getArticles(articleParams: URLSearchParams) {
        api.get("/article", { params: articleParams })
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

    function handleSubmitFilter(event: any) {
        event.preventDefault();

        const filterParams = {
            ...(event.target.author.value !== "" && {author: event.target.author.value}),
            ...(event.target.category.value !== "" && {category: event.target.category.value}),
            ...(event.target.date.value !== "" && {date: event.target.date.value})
        }

        setSearchParams(filterParams);
    }

    return (
        <div>
            <main>
                <Container>
                    <Box component="form" noValidate onSubmit={handleSubmitFilter} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '1rem' }}>
                        <TextField name="author" id="author" label="Author" variant="standard" />
                        <TextField name="category" id="category" label="Category" variant="standard" />
                        <TextField name="date" id="date" label="Date" variant="standard" />
                        <Button type='submit' variant="contained">Filter</Button>
                    </Box>
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