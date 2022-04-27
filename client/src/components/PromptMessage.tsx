import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	form: {
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

export default function PromptMessage({ status, children }: Props) {
	const styles = useStyles();

	console.log(status);

	return <Paper className={styles.form}>{children}</Paper>;
}
