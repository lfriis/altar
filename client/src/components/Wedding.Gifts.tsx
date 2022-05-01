import React from 'react';
import { Typography, Link } from '@mui/material';
import { Email, Redeem, Savings } from '@mui/icons-material';
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
		paddingBottom: '15px',
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
							<Email />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography className="timeline-title">
							Hand-deliver a cheque to us at the wedding
						</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector />
						<TimelineDot>
							<Redeem />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography className="timeline-title">
							E-transfer to larsenfriis@icloud.com
						</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector />
						<TimelineDot>
							<Savings />
						</TimelineDot>
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography className="timeline-title">
							Contribute to our PayPal fund{' '}
							<Link
								href="/gifts"
								underline="hover"
								target="_blank"
							>
								here
							</Link>
						</Typography>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</div>
	);
}
