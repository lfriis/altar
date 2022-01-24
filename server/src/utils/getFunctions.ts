import axios from 'axios';
import asyncPool from 'tiny-async-pool';

/**
 * * Recursive call to handle
 * @param {STRING} uberflipToken - Uberflip Bearer token required to hit endpoints
 * @param {STRING} URL - URL of Uberflip
 * @param {ARRAY} data - return array
 * @param {NUMBER} pageNumber - used to move through Uberflip pagination
 * @returns
 */

export async function recursiveGet(
	uberflipToken: string,
	URL: string,
	_data: object[] = [],
	_pageNumber = 1,
) {
	let pageNumber = _pageNumber;
	let data = _data;

	const { data: currPageItems } = await axios({
		url: URL,
		method: 'GET',
		params: {
			limit: 100,
			page: pageNumber,
		},
		headers: {
			Authorization: `Bearer ${uberflipToken}`,
		},
	});

	console.log(
		'UBERFLIP OBJECTS READ',
		`Success Reading ~${pageNumber * 100} Items `,
	);
	data = [...data, ...currPageItems.data];

	if (pageNumber < currPageItems.meta.total_pages) {
		pageNumber++;
		data = await recursiveGet(uberflipToken, URL, data, pageNumber);
	}
	return data;
}

/**
 * *Runs UF endpoint once to get # of pages, then the rest of the pages in parallel
 * @param {STRING} uberflipToken - Uberflip Bearer token required to hit endpoints
 * @param {STRING} URL - URL of Uberflip Endpoint
 * @returns {ARRAY}
 */
export async function paginatedGet(uberflipToken: string, URL: string) {
	let data: object[] = [];

	const { data: firstPageData } = await axios({
		url: URL,
		method: 'GET',
		params: {
			limit: 100,
			page: 1,
		},
		headers: {
			Authorization: `Bearer ${uberflipToken}`,
		},
	});

	data = [...data, ...firstPageData.data];
	const totalPages = firstPageData.meta.total_pages;

	if (!(totalPages > 1)) {
		console.log(
			'UBERFLIP OBJECTS READ',
			`Success Reading ${data.length} Items`,
		);
		return data;
	}

	const pages = Array(totalPages - 1)
		.fill(0)
		.map((_, index) => index + 2);

	const nextPagesData = await Promise.all(
		pages.map(async (page) => {
			const { data: pageData } = await axios({
				url: URL,
				method: 'GET',
				params: {
					limit: 100,
					page,
				},
				headers: {
					Authorization: `Bearer ${uberflipToken}`,
				},
			});
			if (!pageData.data) console.log({ page });
			return pageData.data;
		}),
	);

	data = [...data, ...nextPagesData.flat()];
	console.log(
		'UBERFLIP OBJECTS READ',
		`Success Reading ${data.length} Items from ${totalPages} pages`,
	);
	return data;
}

export async function asyncPoolFunction(
	array: any[],
	asyncFunction: (generator: any) => Promise<any>,
	concurrency = 10,
) {
	const resArray = await asyncPool(concurrency, array, asyncFunction);
	return resArray;
}

export async function paginatedAsyncPoolFunction<T>(
	uberflipToken: string,
	URL: string,
	callback:
		| ((currentItemsCount?: number, totalItemsCount?: number) => number)
		| null = null,
	concurrency = 10,
): Promise<T[]> {
	let data: T[] = [];

	const { data: firstPageData } = await axios({
		url: URL,
		method: 'GET',
		params: {
			limit: 5,
			page: 1,
		},
		headers: {
			Authorization: `Bearer ${uberflipToken}`,
		},
	});
	data = [...data, ...firstPageData.data];
	const totalPages = firstPageData.meta.total_pages;
	const totalItems = firstPageData.meta.count;
	let currentItemsCount = data.length;

	callback?.(currentItemsCount, totalItems);
	if (!(totalPages > 1)) {
		return data;
	}

	const pages = Array(totalPages - 1)
		.fill(0)
		.map((element, index) => index + 2);

	const nextPagesData = await asyncPool(concurrency, pages, async (page) => {
		const { data: pageData } = await axios({
			url: URL,
			method: 'GET',
			params: {
				limit: 5,
				page,
			},
			headers: {
				Authorization: `Bearer ${uberflipToken}`,
			},
		});
		currentItemsCount += pageData.data.length;
		callback?.(currentItemsCount, totalItems);
		return pageData.data;
	});

	data = [...data, ...nextPagesData.flat()];
	return data;
}
