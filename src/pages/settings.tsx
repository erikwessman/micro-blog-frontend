import { useContext } from "react";
import { CustomThemeContext } from "@/themes/customThemeProvider";
import { Box, Container, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function Settings() {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    function handleChangeTheme(event: SelectChangeEvent) {
        setTheme(event.target.value)
    }

    return (
        <div>
            <main>
                <Container>
                    <Box sx={{ margin: '2rem' }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-menu" color="secondary">Theme</InputLabel>
                            <Select
                                labelId="select-menu"
                                id="select-menu"
                                value={currentTheme}
                                label="Age"
                                onChange={handleChangeTheme}
                                color="secondary"
                            >
                                <MenuItem value={"light"}>Light</MenuItem>
                                <MenuItem value={"dark"}>Dark</MenuItem>
                                <MenuItem value={"sun"}>Sun</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Container>
            </main>
        </div>
    )
}