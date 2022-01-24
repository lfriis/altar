/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	progress: {
		marginRight: '10px',
	},
}));

interface IProps extends ButtonProps {
	loading: boolean | undefined;
	children: ReactNode;
}

export default function LoadingButton({ loading, children, ...rest }: IProps) {
	const styles = useStyles();

	return (
		<Button
			color="primary"
			variant="contained"
			disabled={loading}
			startIcon={
				loading && (
					<CircularProgress
						color="inherit"
						size={21}
						className={styles.progress}
					/>
				)
			}
			{...rest}
		>
			{children}
		</Button>
	);
}
