import { Navigate } from 'react-router-dom';

interface Props {
	children: React.ReactElement;
}

function AppRoutes({ children }: Props): React.ReactElement {
	const user = {
		loggedIn: true,
	};

	console.log(children);

	return user.loggedIn ? (
		children
	) : (
		<Navigate
			to={{
				pathname: '/login',
				// state: { referrer: window.location.url }
			}}
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
