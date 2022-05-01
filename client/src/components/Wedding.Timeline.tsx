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
		width: '100%',
		paddingBottom: '25px !important',
	},
	subHeading: {
		fontSize: '13px',
	},
}));

export default function WeddingTimeline() {
	const styles = useStyles();

	return (
		<div className={styles.timeline}>
			<Timeline position="alternate">
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot>
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
						<TimelineDot>
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
						<TimelineDot>
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
