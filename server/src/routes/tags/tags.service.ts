import { paginatedAsyncPoolFunction } from '../../utils/getFunctions';
import { tag } from './tags.interface';

export default async function getTags(uberflipToken: string) {
	const READ_TAGS_URL = 'https://v2.api.uberflip.com/tags';

	const tags = await paginatedAsyncPoolFunction<tag>(
		uberflipToken,
		READ_TAGS_URL,
	);

	return tags;
}
