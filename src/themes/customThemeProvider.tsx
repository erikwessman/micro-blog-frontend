import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import getTheme from './getTheme';

type CustomThemeContextType = {
    currentTheme: string,
    setTheme: (name: string) => void
}

export const CustomThemeContext = React.createContext<CustomThemeContextType>(
    {
        currentTheme: 'light',
        setTheme: () => { },
    },
)

export default function CustomThemeProvider(props: any) {
    const { children } = props;
    const currentTheme = localStorage.getItem('appTheme') || 'light';
    const [themeName, _setThemeName] = useState<string>(currentTheme);
    const theme = getTheme(themeName)

    function setThemeName(name: string) {
        localStorage.setItem('appTheme', name)
        _setThemeName(name)
    }

    const contextValue = {
        currentTheme: themeName,
        setTheme: setThemeName,
    }

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    )
}