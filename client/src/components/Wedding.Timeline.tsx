import React from 'react';
import { Typography } from '@mui/material';
import { Favorite, Tapas, Restaurant } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot,
	TimelineContent,
} from '@mui/lab';

const useStyles = makeStyles(() => ({
	timeline: {
		color: '#fff',
	},
	subHeading: {
		fontSize: '13px',
	},
	timelineDot: {
		'& .MuiTimelineDot-root': {
			backgroundColor: '#fff',
		},
	},
}));

export default function WeddingTimeline() {
	const styles = useStyles();

	return (
		<div>
			{' '}
			<Timeline className={styles.timeline} position="alternate">
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot className={styles.timelineDot}>
							<Favorite />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant="h6" component="span">
							Ceremony - 4:30 pm
						</Typography>
						<Typography className={styles.subHeading}>
							Sprucewood Shores Estate Winery - Beach
						</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector />
						<TimelineDot className={styles.timelineDot}>
							<Tapas />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant="h6" component="span">
							Cocktail Hour - 5:00 pm
						</Typography>
						<Typography className={styles.subHeading}>
							{' '}
							Sprucewood Shores Estate Winery - Patio
						</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector />
						<TimelineDot className={styles.timelineDot}>
							<Restaurant />
						</TimelineDot>
						<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant="h6" component="span">
							Dinner and Dancing - 7:00 pm
						</Typography>
						<Typography className={styles.subHeading}>
							Sprucewood Shores Estate Winery - Hall
						</Typography>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</div>
	);
}
