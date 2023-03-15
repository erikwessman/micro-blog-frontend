import { useState, useEffect } from 'react';
import { api } from '@/api';
import IArticle from '@/types/article';
import { Container, Box, TextField, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArticleTimeline from '@/components/articleTimeline';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Frontpage() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [hasMoreArticles, setHasMoreArticles] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const articleLimit = 2;

    useEffect(() => {
        function getArticles() {
            api.get(`/article?limit=${articleLimit}`, { params: searchParams })
                .then(response => {
                    const articles_resp: IArticle[] = response.data;
                    if (articles_resp.length === 0 || articles_resp.length < articleLimit) {
                        setHasMoreArticles(false);
                    }
                    setArticles(articles_resp);
                })
        }
        getArticles();
    }, [searchParams]);

    function getMoreArticles() {
        api.get(`/article?page=${currentPage}&limit=${articleLimit}`, { params: searchParams })
            .then(response => {
                const articles_resp: IArticle[] = response.data;
                if (articles_resp.length === 0 || articles_resp.length < articleLimit) {
                    setHasMoreArticles(false);
                }
                setArticles([...articles, ...articles_resp]);
            })
        setCurrentPage(currentPage + 1)
    }

    function handleSubmitFilter(event: any) {
        event.preventDefault();

        const filterParams = {
            ...(event.target.author.value.trim() !== "" && { author: event.target.author.value }),
            ...(event.target.category.value.trim() !== "" && { categories: event.target.category.value }),
            ...(event.target.date.value.trim() !== "" && { date: event.target.date.value })
        }

        setSearchParams(filterParams);
    }

    return (
        <Box component="div">
            <main>
                <Container>
                    <Box component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '1rem'
                        }}>
                        <Button variant="contained"
                            color="secondary"
                            href="/new"
                            startIcon={<AddIcon />}>
                            Create new article
                        </Button>
                    </Box>
                    <Box component="form"
                        noValidate
                        onSubmit={handleSubmitFilter}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            m: 1,
                            p: 1,
                        }}>
                        <TextField name="author"
                            id="author"
                            label="Author"
                            variant="standard"
                            color="secondary" />
                        <TextField name="category"
                            id="category"
                            label="Category"
                            variant="standard"
                            color="secondary" />
                        <TextField name="date"
                            id="date"
                            label="Date"
                            variant="standard"
                            color="secondary" />
                        <Button type='submit'
                            variant="contained"
                            color="secondary"
                            startIcon={<FilterAltIcon />}>
                            Filter
                        </Button>
                    </Box>
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={getMoreArticles}
                        hasMore={hasMoreArticles}
                        loader={
                            <p style={{ textAlign: 'center' }}>
                                <b>Loading...</b>
                            </p>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>No more articles available</b>
                            </p>
                        }>
                        <ArticleTimeline articles={articles} />
                    </InfiniteScroll>
                </Container>
            </main>
        </Box>
    )
}