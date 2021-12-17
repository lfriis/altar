import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import AppRoute from './routes/appRoutes';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					{routes.map(
						({
							path,
							element: RouteComponent,
							isPrivate,
						}): React.ReactElement => (
							<Route
								key={path}
								path={path}
								element={
									<AppRoute>
										<RouteComponent />
									</AppRoute>
								}
							/>
						)
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
