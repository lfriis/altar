export default function checkIsIFramed() {
	return window.location !== window.parent.location;
}
