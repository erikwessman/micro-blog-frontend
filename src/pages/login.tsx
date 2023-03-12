import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";

export default function Login() {
    const navigate = useNavigate();

    function handleSubmitLogin(event: any) {
        event.preventDefault();

        const loginRequest: any = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        api.get("/authorization/login", { params: loginRequest })
            .then(response => {
                localStorage.setItem('token', response.data['token']);
                navigate("/");
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
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography component="span">
                            Dont have an account? &nbsp;
                            <Typography component="a" href="/register" color="inherit">
                                Register
                            </Typography>
                        </Typography>
                    </Box>
                    <Box component="form"
                        noValidate
                        onSubmit={handleSubmitLogin}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%'
                        }}>
                        <TextField name="username"
                            id="username"
                            label="Username"
                            variant="standard"
                            margin="normal"
                            color="secondary" />
                        <TextField name="password"
                            id="password"
                            label="Password"
                            variant="standard"
                            margin="normal"
                            type="password"
                            color="secondary" />
                        <Button type="submit"
                            variant="contained"
                            color="secondary">
                            Log in
                        </Button>
                    </Box>
                </Container>
            </main>
        </Box>
    )
}