import { Route, Redirect } from 'react-router-dom';

interface IRouteProps {
	key: string;
	path: string;
	component: React.FunctionComponent | any;
	isPrivate: boolean;
}

function AppRoutes({
	key,
	path,
	component: Component,
	isPrivate,
	...rest
}: IRouteProps): React.ReactElement {
	const user = {
		loggedIn: true,
	};

	return (
		<Route
			exact
			key={key}
			path={path}
			render={(props) =>
				isPrivate && !Boolean(user.loggedIn) ? (
					<>
						{console.log(props)}
						<Redirect
							exact
							from={props.location.pathname}
							to={'/login'}
							// to={{
							// 	pathname: '/login',
							// 	state: { from: props.location },
							// }}
						/>
					</>
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
}

export default AppRoutes;
