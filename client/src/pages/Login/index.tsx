import { useEffect } from 'react';
import { useAxios } from '../../hooks';

const Index = (): JSX.Element => {
	const [data] = useAxios('user/create');

	useEffect(() => {
		console.log({ data });
	}, [data]);

	return <div>Login Page</div>;
};

export default Index;
