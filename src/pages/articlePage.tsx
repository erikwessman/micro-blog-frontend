import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Article from "@/components/article";
import IArticle from "@/types/article";
import { api } from "@/api";

export default function ArticlePage() {
    const [article, setArticle] = useState<IArticle>();
    const { id } = useParams();

    useEffect(() => {
        getArticle(id);
    }, [id])

    function getArticle(id: string | undefined) {
        api.get("/article", { params: { 'id': id } })
            .then(response => {
                const article_resp: IArticle = response.data;
                setArticle(article_resp);
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
        <Box component="div">
            <main>
                <Container>
                    <article>
                        {article ? <Article article={article} /> : null}
                    </article>
                </Container>
            </main>
        </Box>
    )
}