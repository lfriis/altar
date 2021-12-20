import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useAxiosGet = (url: string) => {
	const [data, setData] = useState<object | null>(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				console.log(`Axios Get -`, res);
				setData(res.data);
			})
			.catch((e) => {
				console.log(`Axios Get -`, e);
				console.log(e);
			});
	}, [url]);

	return [data];
};

const useAxiosPost = (url: string, body: object) => {
	const [data, setData] = useState<object | null>(null);

	useEffect(() => {
		axios
			.post(url, body)
			.then((res) => {
				console.log(`Axios Post -`, res);
				setData(res.data);
			})
			.catch((e) => {
				console.log(`Axios Post -`, e);
				console.debug(e);
			});
	}, [url, body]);

	return [data];
};

export { useAxiosGet, useAxiosPost };
