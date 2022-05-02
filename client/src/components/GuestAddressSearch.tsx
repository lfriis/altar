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
import {
	useFetchGuests,
	useLoading,
	useResponseError,
	useSetResponseError,
} from '../store';

const useStyles = makeStyles(() => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: '30px',
		opacity: '87%',
	},
}));

export default function SearchAddress() {
	const styles = useStyles();
	const loading = useLoading();
	const fetchGuests = useFetchGuests();
	const responseError = useResponseError();
	const setResponseError = useSetResponseError();
	const [address, setAddress] = useState('');

	return (
		<Paper className={styles.form}>
			<h1 style={{ fontWeight: '900', textAlign: 'center' }}>
				RSVP by June 1, 2022
			</h1>

			<h3 style={{ paddingBottom: '0px' }}>Save your seat...</h3>

			<FormControl variant="standard" fullWidth>
				<InputLabel color="secondary" htmlFor="input-field-address">
					Enter Street Address
				</InputLabel>
				<Input
					color="secondary"
					id="input-field-address"
					disabled={loading}
					value={address}
					error={responseError !== null}
					onChange={(e) => {
						setAddress(e.target.value);
						setResponseError(null);
					}}
					onBlur={() => setAddress(address.trim())}
					autoComplete="address"
					type="text"
				/>
				<FormHelperText
					id="input-field-address"
					style={responseError ? { color: 'red' } : {}}
				>
					{responseError ||
						'Reference the street address found on your invitation'}
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
				{loading ? 'Searching Address...' : 'Search'}
			</LoadingButton>
		</Paper>
	);
}
