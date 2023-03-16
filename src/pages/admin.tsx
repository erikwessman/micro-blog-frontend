import { useState } from "react";
import { Button, Container, Card, Box } from "@mui/material";
import { api } from "@/api";
import { CustomAlert, ICustomAlert } from "@/components/customAlert";

export default function Admin() {
    const [alert, setAlert] = useState<ICustomAlert>({ open: false, handleClose: handleCloseAlert });

    function getStatus() {
        api.get("/status")
            .then(response => {
                setAlert({
                    ...alert,
                    open: true,
                    severity: 'success',
                    message: response.data
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
        <div>
            <main>
                <Container>
                    <CustomAlert {...alert} />
                    <Box sx={{ margin: '2rem' }}>
                        <Card variant="outlined">
                            <Button variant="contained" onClick={getStatus} color="secondary">
                                Get status
                            </Button>
                        </Card>
                    </Box>
                </Container>
            </main>
        </div>
    )
}