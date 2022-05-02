import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { Email, Redeem } from '@mui/icons-material';

export default function Gifts() {
	const mobile = useMediaQuery('(max-width:575px)');
	const smallMobile = useMediaQuery('(max-width:400px)');

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
			<section style={{ height: 'auto', minHeight: 'unset' }}>
				<p
					className="landing-wrapper-header"
					style={{ marginBottom: '0' }}
				>
					Wedding Gifts
				</p>
				<p
					className="landing-wrapper-subheading"
					style={
						mobile
							? {
									padding: '0px 17px',
									textAlign: 'center',
							  }
							: {
									fontSize: '20px',
									padding: '0px 20%',
									textAlign: 'center',
							  }
					}
				>
					If you would like to contribute to our Honeymoon in Hawaii
					or our upcoming adventure to Australia, here&apos;s how you
					can contribute!
				</p>
				<div style={{ padding: '15px 10px 30px 10px' }}>
					<Button className="align-items" disabled>
						<Email style={{ paddingRight: '5px' }} />
						Hand-deliver a cheque
					</Button>
					<Button className="align-items" disabled>
						<Redeem style={{ paddingRight: '5px' }} />
						{smallMobile ? 'E-transfer ' : 'E-transfer to '}
						larsenfriis@icloud.com
					</Button>
				</div>
			</section>
		</>
	);
}
