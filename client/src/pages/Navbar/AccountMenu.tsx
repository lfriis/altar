import React, { useState, BaseSyntheticEvent } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	Fade,
	Avatar,
	useMediaQuery,
	Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ExpandMore, PowerSettingsNew } from '@mui/icons-material';
import { useAuthState, useAuthDispatch, logoutUser } from '../../context/auth';

const useStyles = makeStyles(() => ({
	menu: {
		'& .MuiPaper-root': {
			minWidth: '160px',
		},
	},
	hr: {
		border: '1px solid #e5e5e5',
	},
	menuHeading: {
		textTransform: 'uppercase',
		fontSize: '12px',
		lineHeight: '1.45455',
	},
	menuItem: {
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '600',
		pointerEvents: 'none',
	},
	avatar: {
		width: '30px',
		height: '30px',
	},
	avatarInitials: {
		width: '30px',
		height: '30px',
		backgroundColor: '#8a0e54',
	},
}));

export default function AccountMenu() {
	const styles = useStyles();
	const dispatch = useAuthDispatch();
	const { currentUser, accountId, version } = useAuthState();
	const shortName = useMediaQuery('(max-width:1000px)');
	const noName = useMediaQuery('(max-width:840px)');

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: BaseSyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div style={{ marginLeft: 'auto' }}>
			<Button
				color="inherit"
				startIcon={
					currentUser?.avatar_url ? (
						<Avatar
							className={styles.avatar}
							src={currentUser?.avatar_url}
						/>
					) : (
						<Avatar className={styles.avatarInitials}>
							<Typography style={{ fontSize: '13px' }}>
								{currentUser?.first_name?.substring(0, 1)}
								{currentUser?.last_name?.substring(0, 1)}
							</Typography>
						</Avatar>
					)
				}
				endIcon={<ExpandMore />}
				onClick={handleClick}
			>
				{noName
					? ``
					: shortName
					? `${currentUser?.first_name?.substring(0)} ${
							currentUser?.last_name
					  }`
					: `${currentUser?.first_name} ${currentUser?.last_name}`}
			</Button>
			<Menu
				id="fade-menu"
				className={styles.menu}
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem className={styles.menuHeading} disabled>
					Account ID
				</MenuItem>
				<MenuItem className={styles.menuItem}>{accountId}</MenuItem>
				<MenuItem className={styles.menuHeading} disabled>
					User
				</MenuItem>
				<MenuItem className={styles.menuItem}>
					{currentUser?.first_name} {currentUser?.last_name}
				</MenuItem>
				<MenuItem className={styles.menuHeading} disabled>
					Version
				</MenuItem>
				<MenuItem className={styles.menuItem}>{version}</MenuItem>

				<hr className={styles.hr} />

				<MenuItem onClick={() => logoutUser(dispatch)}>
					<PowerSettingsNew
						fontSize="small"
						style={{ paddingRight: '10px' }}
					/>{' '}
					Sign Out
				</MenuItem>
			</Menu>
		</div>
	);
}
