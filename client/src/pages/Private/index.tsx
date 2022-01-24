import React from 'react';
import { useAuthState } from '../../context/auth';
import { useAxios } from '../../hooks';

interface tag {
	created_at: string;
	description: string;
	id: number;
	items_count: number;
	modified_at: string;
	name: string;
	tag_group_id: number;
}

export default function Private() {
	const userState = useAuthState();
	const [tagsData, tagsError, tagsLoading] = useAxios({
		url: '/api/tags/',
		method: 'GET',
	});

	const tags: tag[] = tagsData?.tags;

	return (
		<div>
			<div>
				This is a private page, only accesible after authenticating the
				user
			</div>
			<br />
			<br />
			<div>Authentication Data</div>
			<p> {JSON.stringify(userState)}</p>
			<br />
			<br />
			<div>SAMPLE FETCH</div>
			<br />
			{tagsLoading ? (
				<div>loading tags...</div>
			) : (
				tags && (
					<div>
						Account Tags
						<ul>
							{tags.map((tag) => (
								<li key={tag.id}>{tag.name}</li>
							))}
						</ul>
					</div>
				)
			)}
			{tagsError && <div>{JSON.stringify(tagsError)}</div>}
		</div>
	);
}
