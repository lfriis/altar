import React from 'react';
import axios from 'axios';
import {
	Avatar,
	Typography,
	Paper,
	FormControl,
	Input,
	InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '../../components';

const useStyles = makeStyles(() => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '45px',

		'& .MuiFormControl-root': {
			margin: '10px',
			width: '400px',
		},
		'& .MuiButtonBase-root': {
			margin: '20px',
		},
		'& .MuiButton-contained': {
			width: '400px',
		},
	},
	avatar: {
		width: '70px !important',
		height: '70px !important',
	},
	title: {
		paddingTop: '30px',
		paddingBottom: '30px',
		fontSize: '18px !important',
		textTransform: 'uppercase',
		letterSpacing: '0.1em !important',
	},
	credentials: {
		paddingTop: '8px',
	},
}));

export default function Friises() {
	const styles = useStyles();
	const navigate = useNavigate();
	// const dispatch = useAuthDispatch();

	const loading = false;

	const handleSubmitRSVP = async () => {
		axios
			.get('/api/guests/:123456')
			.then((res) => {
				console.log(res);
			})
			.catch((e) => console.log(e));
	};

	return (
		<form className={styles.form}>
			<Avatar
				className={styles.avatar}
				alt="logo"
				onClick={() => navigate('/')}
			>
				J & L
			</Avatar>

			<Typography className={styles.title}>Jillian and Larsen</Typography>
			<Paper className={styles.form}>
				<FormControl variant="standard">
					<InputLabel color="secondary" htmlFor="input-field-email">
						Please enter your address
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-email"
						// onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						type="email"
					/>
				</FormControl>
				<LoadingButton loading={loading} onClick={handleSubmitRSVP}>
					{loading ? 'Submitting...' : 'Submit RSVP'}
				</LoadingButton>
			</Paper>
		</form>
	);
}
