import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CustomThemeProvider from '@/themes/customThemeProvider';
import Frontpage from '@/pages/frontpage';
import Admin from '@/pages/admin';
import Settings from '@/pages/settings';
import Register from '@/pages/register';
import Login from '@/pages/login';
import ArticlePage from './pages/articlePage';
import CreateArticle from './pages/createArticle';
import PageNotFound from '@/pages/pageNotFound';
import Header from '@/components/header';

export default function App() {
    return (
        <CustomThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Frontpage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/new" element={<CreateArticle />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CustomThemeProvider>
    )
}