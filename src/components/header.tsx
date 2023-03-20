import { useState, useEffect } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Link,
    Box,
    Tooltip,
    IconButton
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import TokenManager from '@/utils/userManager';

export default function Header() {
    const [validLogin, setValidLogin] = useState<boolean>(false);

    useEffect(() => {
        const tokenManager = new TokenManager();
        tokenManager.isTokenValid()
            .then(valid => {
                setValidLogin(valid);
            })
            .catch(() => {
                setValidLogin(false);
            })
    }, [])

    return (
        <AppBar position="static"
            color="primary">
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
                        <Link href="/admin"
                            underline="hover"
                            sx={{ p: 1 }}
                            color="inherit">
                            Admin
                        </Link>
                        <Link href="/settings"
                            underline="hover"
                            sx={{ p: 1 }}
                            color="inherit">
                            Settings
                        </Link>
                    </Box>

                    <Tooltip title={validLogin ? "Logout" : "Register or log in"}>
                        <IconButton aria-label="account"
                            href={validLogin ? "/logout" : "/register"}
                            color="secondary"
                            sx={{
                                marginLeft: 'auto'
                            }}>
                            {validLogin ? <LogoutIcon /> : <AccountCircleIcon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar>
    )
}