import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ArticleFull from "@/components/articleFull";
import IArticle from "@/types/article";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import { api } from "@/api";

export default function ArticlePage() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });
    const [article, setArticle] = useState<IArticle>();
    const { id } = useParams();

    useEffect(() => {
        function getArticle() {
            api.get("/article", { params: { 'id': id } })
                .then(response => {
                    const article_resp: IArticle = response.data;
                    setArticle(article_resp);
                })
                .catch(error => {
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'error',
                        message: error.response.data
                    })
                })
        }

        getArticle();
    }, [id, alert])

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
                    <article>
                        {article ? <ArticleFull article={article} /> : null}
                    </article>
                </Container>
            </main>
        </Box>
    )
}