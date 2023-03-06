import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from '@/themes/customThemeProvider';
import Frontpage from '@/pages/frontpage/frontpage';
import Admin from '@/pages/admin/admin';
import Settings from '@/pages/settings/settings';
import Register from '@/pages/register/register';
import Login from '@/pages/login/login';
import PageNotFound from '@/pages/pageNotFound/pageNotFound';
import Header from '@/components/header/header';

export default function App() {
    return (
        <CustomThemeProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Frontpage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CustomThemeProvider>
    )
}