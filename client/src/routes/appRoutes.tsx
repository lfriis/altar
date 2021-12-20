import { Route, Redirect } from 'react-router-dom';

interface IRouteProps {
	path: string;
	component: React.FunctionComponent | any;
	isPrivate: boolean;
}

function AppRoutes({
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
			path={path}
			render={(props) =>
				isPrivate && !Boolean(user.loggedIn) ? (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
}

export default AppRoutes;

// isPrivate && !Boolean(user.loggedIn) ? (
// 	<Navigate
// 		to={{
// 			pathname: '/login',
// 		}}
// 	/>
// ) : (
// 	<Element />
// )
