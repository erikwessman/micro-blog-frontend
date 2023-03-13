import { Box, Container, TextField, Button } from "@mui/material"
import { api } from "@/api"

export default function CreateArticle() {

    function handleSubmitCreateAricle(event: any) {
        event.preventDefault();

        const userArticleRequest = {
            title: event.target.title.value,
            categories: event.target.categories.value.split(",").map((category: string) => category.trim()),
            content: event.target.content.value,
            image: {
                src: event.target.image_url.value,
                local: false,
                caption: event.target.image_caption.value
            }
        }

        api.post("/article/user", userArticleRequest, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
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