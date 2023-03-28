import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CustomThemeProvider from '@/themes/customThemeProvider';
import Frontpage from '@/pages/frontpage';
import Settings from '@/pages/settings';
import Register from '@/pages/register';
import Login from '@/pages/login';
import Logout from './pages/logout';
import ArticlePage from './pages/articlePage';
import CreateArticle from './pages/createArticle';
import PageNotFound from '@/pages/pageNotFound';
import Header from '@/components/header';

export default function App() {
    return (
        <CustomThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<><Header /><Outlet /></>}>
                        <Route path="/" element={<Frontpage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/article/:id" element={<ArticlePage />} />
                        <Route path="/new" element={<CreateArticle />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CustomThemeProvider>
    )
}