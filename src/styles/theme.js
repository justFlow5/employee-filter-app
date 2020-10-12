import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        primary: '#ff6b01',
        primaryLight: '#ff9b48',
        primaryVeryLight: '#ffcb9a',
        secondary: '#999',
        black: '#000',
        bgPrimary: '#f5f5f5',
        bgSecondary: '#ffffff',
    },
    fontSizes: {},
};

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
