import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	form: {
		maxWidth: '400px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '30px',
	},
}));

interface Props {
	status: string;
	children: ReactNode;
}

export default function AlertMessage({ status, children }: Props) {
	const styles = useStyles();

	console.log(status);

	return <Paper className={styles.form}>{children}</Paper>;
}
