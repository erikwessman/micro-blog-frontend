import { useState } from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IUser from "@/types/user";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";
import { api } from "@/api";
import TokenManager from "@/utils/tokenManager";

export default function Register() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });
    const navigate = useNavigate();
    const tokenManager = new TokenManager();

    function handleSubmitRegister(event: any) {
        event.preventDefault();

        const registerRequest: IUser = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        api.post("/authorization/register", registerRequest)
            .then(response => {
                tokenManager.updateToken(response.data['token']);
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
                            Already have an account? &nbsp;
                            <Typography component="a" href="/login" color="inherit">
                                Log in
                            </Typography>
                        </Typography>
                    </Box>
                    <Box component="form"
                        noValidate
                        onSubmit={handleSubmitRegister}
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
                        <TextField name="email"
                            id="email"
                            label="Email"
                            variant="standard"
                            margin="normal"
                            type="email"
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
                            Register
                        </Button>
                    </Box>
                </Container>
            </main>
        </Box>
    )
}