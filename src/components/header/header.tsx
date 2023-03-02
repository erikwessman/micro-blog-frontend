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
                        MICRO-BLOG
                    </Typography>

                    <Box sx={{ p: 2 }}>
                        <Link href="/admin" color="#fff" underline="hover" sx={{ p: 1 }}>
                            Admin
                        </Link>
                        <Link href="/settings" color="#fff" underline="hover" sx={{ p: 1 }}>
                            Settings
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}