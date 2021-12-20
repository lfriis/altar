import { useEffect } from 'react';
import { useAxiosGet } from '../../hooks';
// import { FormControl, InputLabel, Input } from '@material-ui/core';

const Index = (): JSX.Element => {
	const [data] = useAxiosGet('user/create');

	useEffect(() => {
		console.log({ data });
	}, [data]);

	return (
		<>
			<h2>Login Page</h2>

			<a href={'/'}>Nav to Home</a>
		</>
	);
};

export default Index;
