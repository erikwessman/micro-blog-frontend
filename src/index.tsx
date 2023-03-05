import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CustomThemeProvider from './themes/customThemeProvider';
import Frontpage from './pages/frontpage/frontpage';
import Admin from './pages/admin/admin';
import Settings from './pages/settings/settings';
import Register from './pages/register/register';
import Login from './pages/login/login';
import PageNotFound from './pages/pageNotFound/pageNotFound';
import Header from './components/header/header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
