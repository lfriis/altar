import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from './routes';
import AppRoute from './routes/appRoutes';
import { AuthProvider } from './context/auth';

function App(): JSX.Element {
	return (
		<div className="App">
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						{routes.map(
							({
								path,
								component,
								isPrivate,
							}): React.ReactElement => (
								<AppRoute
									key={path}
									path={path}
									component={component}
									isPrivate={isPrivate}
								/>
							)
						)}
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
