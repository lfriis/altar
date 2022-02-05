import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './styles/ThemeProvider';
import AppRouter from './routes';
import DevLocal from './components/Development/DevLocal';
import Navbar from './pages/Navbar';
/**
 * CSS
 */
import './styles/app.css';
import './styles/mui.overrides.css';

function App() {
	return (
		<div className="App">
			<ThemeProvider>
				{process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' && (
					<DevLocal />
				)}
				<BrowserRouter>
					<Navbar />
					<AppRouter />
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
