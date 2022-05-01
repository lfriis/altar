import React from 'react';
import { WeddingGifts } from '../../components';

export default function Gifts() {
	return (
		<>
			<section className="gifts">
				<div className="landing-wrapper-content">
					<p className="landing-wrapper-header">Gifts</p>
					<p className="landing-wrapper-subheading">
						The best present of all is your presence
					</p>
				</div>
			</section>
			<section>
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Wedding Gifts
				</p>
				<p
					className="landing-wrapper-subheading"
					style={{
						padding: '0px 17px',
						textAlign: 'center',
					}}
				>
					If you would like to contribute to our Honeymoon in Hawaii
					or our upcoming adventure to Australia, here&apos;s how you
					can contribute!
				</p>
				<WeddingGifts />

				{/* <div className="gifts-footer"> Thank you</div> */}
			</section>
		</>
	);
}
