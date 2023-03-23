import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Button, Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@mui/material";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import ArticleFull from "@/components/articleFull";
import TokenManager from "@/utils/tokenManager";
import IArticle from "@/types/article";
import IComment from "@/types/comment"
import { api } from "@/api";

export default function ArticlePage() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });
    const [article, setArticle] = useState<IArticle>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>("");
    const { id } = useParams();
    const tokenManager = new TokenManager();

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

    function handlePostComment() {
        if (newComment !== "") {
            const commentReq = {
                content: newComment,
                article_id: id
            }
            api.post("/comment/user", commentReq, { params: { 'article_id': id }, headers: { 'Authorization': tokenManager.getToken() } })
                .then(() => {
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'success',
                        message: 'Posted comment'
                    })
                })
                .catch(error => {
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'error',
                        message: error.response.data
                    })
                })
        } else {
            setAlert({
                ...alert,
                open: true,
                severity: 'warning',
                message: 'Comment cannot be empty'
            })
        }
    }

    function handleCloseAlert() {
        setAlert({
            ...alert,
            open: false
        })
    }

    function handleOpenDialog() {
        setDialogOpen(true);
    }

    function handleCloseDialog() {
        setDialogOpen(false);
    }

    return (
        <Box component="div">
            <CustomAlert {...alert} />
            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth={'md'}>
                <DialogTitle>Post new comment</DialogTitle>
                <DialogContent>
                    <TextField name="content"
                        id="content"
                        label="Content"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        multiline
                        onChange={e => { setNewComment(e.target.value) }}
                        rows={5}
                        color="secondary" />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="outlined" onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="secondary" variant="outlined" onClick={handlePostComment} type="submit">Post</Button>
                </DialogActions>
            </Dialog>
            <main>
                <Container>
                    <article>
                        {article ? <ArticleFull article={article} comments={comments} /> : <p>Can't find article</p>}
                    </article>
                    {tokenManager.hasToken() ?
                        <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem' }}>
                            <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
                                Post new comment
                            </Button>
                        </Box>
                        : null}
                </Container>
            </main>
        </Box>
    )
}