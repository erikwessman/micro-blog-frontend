import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Link,
    Box
} from '@mui/material';
import RocketIcon from '@mui/icons-material/Rocket';

export default function Header() {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <RocketIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DAMNNN
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Link href="/something">
                            Something
                        </Link>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}