import React, { useState } from 'react';
import {
	FormControl,
	InputLabel,
	Input,
	Paper,
	Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoadingButton from './Loading.Button';
import { useFetchGuests, useLoading } from '../store';

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

export default function SearchAddress() {
	const styles = useStyles();
	const loading = useLoading();
	const fetchGuests = useFetchGuests();
	const [address, setAddress] = useState('#1305-45 Lisgar Street');

	return (
		<form>
			<Paper className={styles.form}>
				<Typography>
					Please enter your address so we can find your seat!
				</Typography>

				<FormControl variant="standard">
					<InputLabel color="secondary" htmlFor="input-field-address">
						Street Address
					</InputLabel>
					<Input
						color="secondary"
						id="input-field-address"
						disabled={loading}
						value={address}
						onChange={(e) => setAddress(e.target.value.trim())}
						autoComplete="address"
						type="text"
					/>
					{/* <FormHelperText id="input-field-address">
						{message || 'Please enter your address'}
					</FormHelperText> */}
				</FormControl>
				<LoadingButton
					loading={loading}
					disabled={address === '' || loading}
					onClick={() => fetchGuests({ address })}
				>
					{loading ? 'Searching...' : 'Search'}
				</LoadingButton>
			</Paper>
		</form>
	);
}
