import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';

interface Props {
	status: string;
	children: ReactNode;
}

export default function AlertMessage({ status, children }: Props) {
	console.log(status);

	return <Paper>{children}</Paper>;
}
