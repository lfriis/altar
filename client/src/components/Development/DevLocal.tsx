import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface IGitInfo {
	gitInfo?: Nullable<{
		gitBranch?: string | null;
		gitCommitHash?: string | null;
		cwd?: string;
		version?: string;
	}>;
	message: string | null;
	status: string;
}

export default function DevLocal() {
	const [serverResponse, setServerResponse] =
		useState<Nullable<IGitInfo>>(null);

	function healthCheck() {
		axios
			.get('/api/dev/gitInfo')
			.then((res) => {
				setServerResponse(res.data);
			})
			.catch((e) => {
				setServerResponse({
					message: e.response.statusText,
					status: `DOWN [${e.response.status}]`,
				});
			});
	}

	useEffect(() => {
		healthCheck();
	}, []);

	return (
		<div
			style={{
				position: 'fixed',
				left: '10px',
				bottom: '0px',
				color: 'blue',
				fontSize: '13px',
				padding: 0,
			}}
		>
			{serverResponse?.gitInfo && (
				<>
					<p>
						<strong>Branch:</strong>{' '}
						<code>
							{serverResponse?.gitInfo?.gitBranch} (
							{serverResponse?.gitInfo?.gitCommitHash})
						</code>
					</p>
					<p>
						<strong>CWD:</strong>{' '}
						<code>{serverResponse?.gitInfo?.cwd}</code>
					</p>
					<p>
						<strong>Version:</strong>{' '}
						<code>{serverResponse?.gitInfo?.version}</code>
					</p>
				</>
			)}

			{serverResponse && (
				<p>
					<strong>API Status:</strong>{' '}
					<code>
						{serverResponse?.status} - {serverResponse?.message}
					</code>
				</p>
			)}

			<p>
				<strong>Environment:</strong>{' '}
				<code>{process.env.REACT_APP_ENVIRONMENT}</code>
			</p>
		</div>
	);
}
