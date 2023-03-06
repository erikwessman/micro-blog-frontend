import { useState } from "react";
import { Button, Container, Card, Divider, Snackbar } from "@mui/material";
import { api } from "@/api";

export default function Admin() {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<String>("");

    function getStatus() {
        api.get("/status")
            .then(response => {
                setAlertOpen(true);
                setAlertMessage(response.data);
            })
            .catch(error => {
                setAlertOpen(false);
                setAlertMessage("Server is not reachable");
            })
    }

    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertOpen(false);
      };

    return (
        <div>
            <main>
                <Container>
                    <Snackbar
                        open={alertOpen}
                        autoHideDuration={3000}
                        onClose={handleCloseAlert}
                        message={alertMessage}
                    />
                    <Card variant="outlined">
                        <Button variant="contained" onClick={getStatus}>
                            Get status
                        </Button>
                    </Card>
                    <Divider />
                </Container>
            </main>
        </div>
    )
}