import React from 'react';
import { WeddingLocation, WeddingTimeline } from '../../components';

export default function Location() {
	return (
		<>
			<section className="location">
				<div className="landing-wrapper-content">
					<p className="landing-wrapper-header">Location</p>
					<p
						className="landing-wrapper-subheading"
						style={{ marginBottom: '0', paddingBottom: '0' }}
					>
						Sprucewood Shores Estate Winery -
					</p>
					<p
						className="landing-wrapper-subheading"
						style={{ margin: '0' }}
					>
						Amherstburg, ON
					</p>
				</div>
			</section>
			<section>
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Our Day
				</p>
				<p
					className="landing-wrapper-body"
					style={{ textAlign: 'center' }}
				>
					Eat, drink, dance, repeat.
				</p>
				<WeddingTimeline />
				<hr />
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Directions
				</p>
				<p
					className="landing-wrapper-body"
					style={{ padding: '0px 17px', textAlign: 'center' }}
				>
					Sprucewood Shores is a short trip away from Kingsville,
					located in the heart of wine country in Essex County.
				</p>
				<WeddingLocation />
				{/* <div className="location-footer" /> */}
			</section>
		</>
	);
}
