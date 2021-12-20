import { useEffect } from 'react';
import { useAxiosGet } from '../../hooks';

const Index = (): JSX.Element => {
	const [data] = useAxiosGet('user/create');

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<h2>Home Page</h2>

			<a href={'/login'}>Nav to login</a>
		</>
	);
};

export default Index;
