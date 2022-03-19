import React, { useEffect } from 'react';
import axios from 'axios';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Stepper } from '../../components';
import { CoupleConfig } from '../../interfaces';
import { useSetGuests } from '../../store';

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
}: CoupleConfig) {
	const styles = useStyles();
	const setGuests = useSetGuests();
	// const [emailAddress, setEmailAddress] = useState('');
	// const [guests, setGuests] = useState<IGuests>();

	const handleRetrieveGuestInfo = async () => {
		const address = '1294%20Heritage%20Road';
		// const address = '5%20Buona%20Vista%20Drive';

		axios
			.get(`/api/guests/${address}`)
			.then((res) => {
				setGuests(res.data.guestInfo);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// const handleSubmitRSVP = async () => {
	// 	setLoading(true);
	// 	axios
	// 		.post('/api/guests/option', confirmedGuests)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setGuests(res.data.guestInfo);
	// 			setLoading(false);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 			setLoading(false);
	// 		});
	// };

	useEffect(() => {
		handleRetrieveGuestInfo();
	}, []);

	return (
		<form className={styles.form}>
			<Avatar className={styles.avatar} alt="logo">
				{coupleInitials}
			</Avatar>

			<Typography className={styles.title}>{coupleName}</Typography>
			<Stepper />
		</form>
	);
}
