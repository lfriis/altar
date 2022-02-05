import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Avatar,
	Typography,
	Paper,
	FormControl,
	Input,
	InputLabel,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '../../components';
import {
	IGuests,
	IConfirmedGuest,
	ICoupleConfig,
} from './couples.declarations';
import FoodOptionSelect from '../../components/FoodOption.Select';

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

export default function CouplesForm({
	coupleName,
	coupleInitials,
	foodOptions,
}: ICoupleConfig) {
	const styles = useStyles();
	const navigate = useNavigate();
	// const dispatch = useAuthDispatch();
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState('1294 Heritage Road');
	const [guests, setGuests] = useState<IGuests>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [confirmedGuests, setConfirmedGuests] = useState<IConfirmedGuest[]>();

	const handleSearchSheet = async () => {
		setLoading(true);

		axios
			.get(`/api/guests/${address}`)
			.then((res) => {
				console.log(res.data);
				setGuests(res.data.guestInfo);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			});
	};

	const handleSubmitRSVP = async () => {
		setLoading(true);
		axios
			.post(`/api/guests/option`, confirmedGuests)
			.then((res) => {
				console.log(res.data);
				setGuests(res.data.guestInfo);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			});
	};

	const handleSetGuest = (confirmedSelection: IConfirmedGuest) => {
		// const tempArray = [...confirmedGuests, confirmedSelection];
		// setConfirmedGuests(tempArray);
		// setConfirmedGuests(confirmedSelection);
		console.log(confirmedGuests, confirmedSelection);
	};

	useEffect(() => {
		console.log({ confirmedGuests });
	}, [confirmedGuests]);

	return (
		<form className={styles.form}>
			<Avatar
				className={styles.avatar}
				alt="logo"
				onClick={() => navigate('/')}
			>
				{coupleInitials}
			</Avatar>

			<Typography className={styles.title}>{coupleName}</Typography>
			<Paper className={styles.form}>
				<FormControl variant="standard">
					<InputLabel color="secondary" htmlFor="input-field-address">
						Please enter your address
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-address"
						disabled={loading}
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						autoComplete="address"
						type="text"
					/>
				</FormControl>
				<LoadingButton loading={loading} onClick={handleSearchSheet}>
					{loading ? 'Searching...' : 'Search Guests'}
				</LoadingButton>
			</Paper>
			{guests?.names && (
				<Paper className={styles.form}>
					<h4>Select a food option per guest</h4>
					{guests.names.map((guest) => (
						<FoodOptionSelect
							key={guest}
							guest={guest}
							handleSetGuest={handleSetGuest}
							options={foodOptions}
						/>
					))}
					<Button variant="contained" onClick={handleSubmitRSVP}>
						Submit RSVP
					</Button>
				</Paper>
			)}
		</form>
	);
}
