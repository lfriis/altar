export function parseURL(url: string) {
	const urlSearchParams = new URLSearchParams(url);
	return Object.fromEntries(urlSearchParams.entries());
}

export function getQueryParam(url: string) {
	const urlParams = new URLSearchParams(url);
	return urlParams.get('query');
}
