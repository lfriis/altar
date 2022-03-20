import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import styles from './Stepper.module.css';

export default function TableSkeleton() {
	return (
		<div className={styles.wrapper}>
			<Grid container direction="row" spacing={2}>
				<Grid item xs>
					<Skeleton variant="text" />
				</Grid>
			</Grid>
			<br />
			<Grid container direction="row" spacing={2}>
				<Grid item xs>
					<Skeleton variant="rectangular" height={200} />
				</Grid>
			</Grid>
			<br />

			<Grid className="align-items" container direction="row" spacing={2}>
				<Grid item xs>
					<Skeleton variant="rectangular" height={50} />
				</Grid>
				<Grid item xs={6}>
					<Skeleton variant="text" />
				</Grid>
				<Grid item xs>
					<Skeleton variant="rectangular" height={50} />
				</Grid>
			</Grid>
		</div>
	);
}
