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
		// color: '#fff',
		width: '100%',
	},
	subHeading: {
		fontSize: '13px',
	},
	timelineDot: {
		// '& .MuiTimelineDot-root': {
		// 	backgroundColor: '#fff',
		// },
	},
}));

export default function WeddingTimeline() {
	const styles = useStyles();

	return (
		<div className={styles.timeline}>
			<Timeline position="alternate">
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot className={styles.timelineDot}>
							<Favorite />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography className="timeline-title">
							Ceremony
						</Typography>
						<Typography className="timeline-title">
							4:30 pm
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
						<Typography className="timeline-title">
							Cocktail Hour
						</Typography>
						<Typography className="timeline-title">
							5:00 pm
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
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography className="timeline-title">
							Dinner & Dancing
						</Typography>
						<Typography className="timeline-title">
							7:00 pm
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