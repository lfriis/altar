import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

interface IRouteProps {
	path: string;
	isPrivate: boolean;
	component: React.FunctionComponent;
	children?: React.ReactChild;
}

const routes: IRouteProps[] = [
	{
		path: '/',
		isPrivate: true,
		component: HomePage,
	},
	{
		path: '/login',
		isPrivate: false,
		component: LoginPage,
	},
	{
		path: '/*',
		isPrivate: false,
		component: PageNotFound,
	},
];

export default routes;
