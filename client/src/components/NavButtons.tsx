import React from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Favorite, LocationOn, Redeem } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	grid: {
		flexDirection: 'column',
	},
	buttonWrapper: {
		paddingTop: '30px',
	},
	button: {
		margin: '10px 10px',
	},
}));

export default function NavButtons() {
	const styles = useStyles();
	const navigate = useNavigate();

	return (
		<div className={styles.buttonWrapper}>
			<Grid
				direction={{ xs: 'column', md: 'row', lg: 'row' }}
				container
				spacing={1}
			>
				<Grid item>
					<Button
						className={styles.button}
						variant="text"
						startIcon={<Favorite />}
						onClick={() => navigate('/')}
					>
						Wedding
					</Button>
				</Grid>
				<Grid item>
					<Button
						className={styles.button}
						variant="text"
						startIcon={<LocationOn />}
						onClick={() => navigate('/location')}
					>
						Location
					</Button>
				</Grid>
				<Grid item>
					<Button
						className={styles.button}
						variant="text"
						startIcon={<Redeem />}
						onClick={() => navigate('/Gifts')}
					>
						Gifts
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
