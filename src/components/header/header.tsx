import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Link,
    Box,
    IconButton
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                        <Link href="/admin" color="inherit" underline="hover" sx={{ p: 1 }}>
                            Admin
                        </Link>
                        <Link href="/settings" color="inherit" underline="hover" sx={{ p: 1 }}>
                            Settings
                        </Link>
                    </Box>

                    <IconButton aria-label="account" href="/register" color="secondary">
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}