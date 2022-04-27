import React, { useState } from 'react';
import {
	FormControl,
	InputLabel,
	Input,
	Paper,
	FormHelperText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoadingButton from './Loading.Button';
import { useFetchGuests, useLoading } from '../store';

const useStyles = makeStyles(() => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: '30px',
		opacity: 0.95,
	},
}));

export default function SearchAddress() {
	const styles = useStyles();
	const loading = useLoading();
	const fetchGuests = useFetchGuests();
	const [address, setAddress] = useState('63 Watermill Street');

	return (
		<Paper className={styles.form}>
			<h4>Enter your address so we can find your seat!</h4>

			<FormControl variant="standard" fullWidth>
				<InputLabel color="secondary" htmlFor="input-field-address">
					Address
				</InputLabel>
				<Input
					color="secondary"
					id="input-field-address"
					disabled={loading}
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					onBlur={() => setAddress(address.trim())}
					autoComplete="address"
					type="text"
				/>
				<FormHelperText id="input-field-address">
					Use the address on your invitations envelope.
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<LoadingButton
				loading={loading}
				disabled={address === '' || loading}
				onClick={() => fetchGuests({ address })}
				fullWidth
			>
				{loading ? 'Searching...' : 'Search'}
			</LoadingButton>
		</Paper>
	);
}
