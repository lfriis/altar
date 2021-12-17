import { useEffect, useState } from 'react';
import axios from 'axios';

export const Index = (): JSX.Element => {
	const [serverResponse, setServerResponse] = useState<string | null>(null);

	useEffect((): void => {
		loginUser();
	}, []);

	const loginUser = (): void => {
		axios
			.get(`user/create`)
			.then((res) => {
				console.log(res);
				setServerResponse(res.data.message);
			})
			.catch((e) => {
				console.debug(e);
			});
	};

	return <div>Blaaaah {serverResponse}</div>;
};
