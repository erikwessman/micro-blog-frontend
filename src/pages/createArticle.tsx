import { useState } from "react";
import { Box, Container, TextField, Button } from "@mui/material"
import { api } from "@/api"
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import TokenManager from "@/utils/tokenManager";

export default function CreateArticle() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert })
    const tokenManager = new TokenManager();

    function handleSubmitCreateAricle(event: any) {
        event.preventDefault();

        const userArticleRequest = {
            title: event.target.title.value,
            categories: event.target.categories.value.split(",").map((category: string) => category.trim()),
            content: event.target.content.value,
            image: {
                src: event.target.image_url.value,
                caption: event.target.image_caption.value
            }
        }

        api.post("/article/user", userArticleRequest, { headers: { 'Authorization': tokenManager.getToken() } })
            .then(() => {
                setAlert({
                    ...alert,
                    open: true,
                    severity: 'success',
                    message: 'Posted article'
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
    }

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
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box component="form"
                        noValidate
                        onSubmit={handleSubmitCreateAricle}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '65%'
                        }}>
                        <TextField name="title"
                            id="title"
                            label="Title"
                            variant="standard"
                            margin="normal"
                            color="secondary" />
                        <TextField name="categories"
                            id="categories"
                            label="Categories"
                            variant="standard"
                            margin="normal"
                            color="secondary" />
                        <TextField name="content"
                            id="content"
                            label="Content"
                            variant="standard"
                            margin="normal"
                            multiline
                            rows={5}
                            color="secondary" />
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', m: 1 }}>
                            <TextField name="image_url"
                                id="image_url"
                                label="Image URL"
                                variant="standard"
                                margin="normal"
                                color="secondary" />
                            <TextField name="image_caption"
                                id="image_caption"
                                label="Image caption"
                                variant="standard"
                                margin="normal"
                                color="secondary" />
                        </Box>
                        <Button type="submit"
                            variant="contained"
                            color="secondary">
                            Create article
                        </Button>
                    </Box>
                </Container>
            </main>
        </Box>
    )
}