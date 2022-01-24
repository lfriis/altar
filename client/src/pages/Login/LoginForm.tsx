import React, { useState } from 'react';
import {
	Avatar,
	Typography,
	Paper,
	useMediaQuery,
	FormControl,
	Input,
	InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '../../components';
import { useAuthState, useAuthDispatch, loginUser } from '../../context/auth';
import { IHandleAuthSuccess } from './login.declarations';

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

const {
	REACT_APP_FIRST_NAME = '',
	REACT_APP_LAST_NAME = '',
	REACT_APP_EMAIL = '',
} = process.env;

export default function LoginForm({ handleAuthSuccess }: IHandleAuthSuccess) {
	const styles = useStyles();
	const navigate = useNavigate();
	const dispatch = useAuthDispatch();
	const { loading } = useAuthState();
	const mobile = useMediaQuery('(max-width:580px)');

	const [firstName, setFirstName] = useState(REACT_APP_FIRST_NAME);
	const [lastName, setLastName] = useState(REACT_APP_LAST_NAME);
	const [email, setEmail] = useState(REACT_APP_EMAIL);

	const handleLogin = async () => {
		const payload = {
			firstName,
			lastName,
			email,
		};

		try {
			await loginUser(dispatch, payload);
			handleAuthSuccess();
		} catch (e) {
			throw new Error(`An error occurred logging in, ${e}`);
		}
	};

	return (
		<form className={styles.form}>
			<Avatar className={styles.avatar} onClick={() => navigate('/')}>
				altar
			</Avatar>

			<Typography className={styles.title}>
				{mobile ? 'Sign in' : 'Sign in to altar'}
			</Typography>
			<Paper className={styles.form}>
				<FormControl variant="standard">
					<InputLabel color="secondary" htmlFor="input-field-email">
						Email
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-email"
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						type="email"
					/>
				</FormControl>
				<FormControl variant="standard">
					<InputLabel
						color="secondary"
						htmlFor="input-field-firstName"
					>
						First Name
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-firstName"
						onChange={(e) => setFirstName(e.target.value)}
						autoComplete="firstName"
						type="text"
					/>
				</FormControl>
				<FormControl variant="standard">
					<InputLabel
						color="secondary"
						htmlFor="input-field-lastName"
					>
						Last Name
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-lastName"
						onChange={(e) => setLastName(e.target.value)}
						autoComplete="lastName"
						type="text"
					/>
				</FormControl>
				<LoadingButton loading={loading} onClick={handleLogin}>
					{loading ? 'Signing In...' : 'Sign In'}
				</LoadingButton>
			</Paper>
		</form>
	);
}
