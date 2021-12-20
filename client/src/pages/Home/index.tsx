import { useAxiosGet } from '../../hooks/useAxios';
import { Button } from '@mui/material';
import axios from 'axios';

const Index = (): JSX.Element => {
	const [data] = useAxiosGet('user/create');
	console.log(data);

	const testFunc = () => {
		axios
			.post('auth/status', { name: 'Toby' })
			.then((res) => console.log(res))
			.catch((e) => console.log(e));
	};

	return (
		<>
			<h2>Home Page</h2>

			<a href={'/login'}>Nav to login</a>
			<Button variant={'contained'} onClick={testFunc}>
				Test Function
			</Button>
		</>
	);
};

export default Index;
