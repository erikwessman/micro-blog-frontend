import { Button, Container, Card, Divider } from "@mui/material";
import { api } from "../../api";

export default function Admin() {
    function getStatus() {
        api.get("/status")
            .then(response => {
                console.log(response.data);
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
        <div>
            <main>
                <Container>
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