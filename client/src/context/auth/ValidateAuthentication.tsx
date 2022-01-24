import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from '@mui/material';
import { useAuthDispatch, validateUser } from './index';

interface IProps {
	children: ReactNode;
}

export default function ValidateAuthentication({ children }: IProps) {
	const dispatch = useAuthDispatch();
	const [validating, setValidating] = useState(true);

	useEffect(() => {
		validateUser(dispatch).finally(() => {
			setValidating(false);
		});
	}, []);

	return (
		<div>{validating ? <Button disabled>Loading</Button> : children}</div>
	);
}
