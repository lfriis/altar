import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

axios.defaults.withCredentials = true;

export default function useAxios(config: AxiosRequestConfig) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.request(config)
			.then((res) => {
				setData(res.data);
			})
			.catch((e) => {
				console.log(e);
				if (axios.isAxiosError(e)) setError(e);
				else setError(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return [data, error, loading];
}
