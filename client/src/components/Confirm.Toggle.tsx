import React from 'react';
import { Button } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Guest } from '../interfaces';
import { useSetUpdatedGuest } from '../store';

const useStyles = makeStyles(() => ({
	button_wrapper: {
		padding: '5px 0px',
	},
	options_button_override: {
		color: '#333',
		display: 'unset',
		textAlign: 'left',
		textTransform: 'none',
	},
	options_button_header: {
		fontSize: '16px',
		fontWeight: '500',
	},
	options_button_body: {
		fontSize: '13px',
		marginTop: '0px',
		lineHeight: 'normal',
	},
	selected: {
		backgroundColor: '#f5f5f5',
	},
}));

export default function ConfirmToggle({ guest }: { guest: Guest }) {
	const styles = useStyles();
	const setUpdatedGuest = useSetUpdatedGuest();

	const confirm = () => {
		const editedGuest = guest.clone();
		editedGuest.confirmed = true;
		setUpdatedGuest(editedGuest);
	};

	const decline = () => {
		const editedGuest = guest.clone();
		editedGuest.confirmed = false;
		editedGuest.foodOption = {
			main: null,
			vegan: null,
			glutenFree: null,
			other: null,
		};
		setUpdatedGuest(editedGuest);
	};

	return (
		<>
			<div className={styles.button_wrapper}>
				<Button
					className={`${styles.options_button_override} ${
						guest.confirmed === true ? styles.selected : ''
					}`}
					variant="outlined"
					onClick={() => confirm()}
					fullWidth
				>
					<div className="align-items-center">
						{guest.confirmed === true && (
							<Check style={{ paddingRight: '5px' }} />
						)}
						<h3 className={styles.options_button_header}>
							Joyfully Accept
						</h3>
					</div>
					<p className={styles.options_button_body}>
						ready to eat, drink and celebrate!
					</p>
				</Button>
			</div>

			<div className={styles.button_wrapper}>
				<Button
					className={`${styles.options_button_override} ${
						guest.confirmed === false ? styles.selected : ''
					}`}
					variant="outlined"
					onClick={() => decline()}
					fullWidth
				>
					<div className="align-items-center">
						{guest.confirmed === false && (
							<Close style={{ paddingRight: '5px' }} />
						)}
						<h3 className={styles.options_button_header}>
							Regretfully Decline
						</h3>
					</div>

					<p className={styles.options_button_body}>
						we will celebrate from afar
					</p>
				</Button>
			</div>
		</>
	);
}
