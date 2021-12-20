import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useAxiosGet = (url: string) => {
	const [data, setData] = useState<object | null>(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				console.log({ res });
				setData(res.data);
			})
			.catch((e) => {
				console.debug(e);
			});
	}, [url]);

	return [data];
};

export { useAxiosGet };
