import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Clients />} />
						<Route path='/Clients' element={<Clients />} />
					</Routes>
				</div>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
