import { useState } from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import { api } from "@/api";

export default function Login() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });
    const navigate = useNavigate();

    function handleSubmitLogin(event: any) {
        event.preventDefault();

        const loginRequest: any = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        api.post("/authorization/login", loginRequest)
            .then(response => {
                localStorage.setItem('token', response.data['token']);
                navigate("/");
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