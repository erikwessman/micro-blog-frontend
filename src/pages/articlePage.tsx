import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import ArticleFull from "@/components/articleFull";
import IArticle from "@/types/article";
import IComment from "@/types/comment"
import { api } from "@/api";

export default function ArticlePage() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });
    const [article, setArticle] = useState<IArticle>();
    const [comments, setComments] = useState<IComment[]>([]);
    const { id } = useParams();

    useEffect(() => {
        function getArticle() {
            api.get("/article", { params: { 'id': id } })
                .then(response => {
                    const article_resp: IArticle = response.data;
                    setArticle(article_resp);
                })
                .catch(error => {
                    setAlert((prevState) => ({
                        ...prevState,
                        open: true,
                        severity: 'error',
                        message: error.response.data
                    }))
                })
        }

        function getComments() {
            api.get("/comment", { params: { 'article_id': id } })
                .then(response => {
                    const comments_resp: IComment[] = response.data;
                    setComments(comments_resp);
                })
                .catch(error => {
                    setAlert((prevState) => ({
                        ...prevState,
                        open: true,
                        severity: 'error',
                        message: error.response.data
                    }))
                })
        }

        getArticle();
        getComments();
    }, [id])

    function handleCloseAlert() {
        setAlert({
            ...alert,
            open: false
        })
    }

    return (
        <Box component="div">
            <CustomAlert {...alert} />
            <main>
                <Container>
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="contained" color="secondary">
                            Post new comment
                        </Button>
                    </Box>
                    <article>
                        {article ? <ArticleFull article={article} comments={comments} /> : <p>Can't find article</p>}
                    </article>
                </Container>
            </main>
        </Box>
    )
}