import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

interface RouteProps {
	path: string;
	isPrivate: boolean;
	element: React.FunctionComponent;
	children?: React.ReactChild;
}

const routes: RouteProps[] = [
	{
		path: '/',
		isPrivate: true,
		element: HomePage,
	},
	{
		path: '/login',
		isPrivate: false,
		element: LoginPage,
	},
	{
		path: '/*',
		isPrivate: false,
		element: PageNotFound,
	},
];

export default routes;
