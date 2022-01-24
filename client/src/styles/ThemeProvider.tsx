import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

interface IProps {
	children: ReactNode;
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#738377',
		},
		secondary: {
			main: '#a1aca3',
		},
	},
});

export default function CustomThemeProvider({ children }: IProps) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
