export default function parseURL(url: string) {
	const urlSearchParams = new URLSearchParams(url);
	return Object.fromEntries(urlSearchParams.entries());
}
