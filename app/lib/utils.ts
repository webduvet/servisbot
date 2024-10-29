import { Revenue } from './definitions';

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};


/**
 * Sort a collection of objects by the 'created' property in ascending order
 * @param collection - Collection of objects to sort
 * @return The sorted collection
 */
export function sortByDateCreated<T extends { created: number }>(collection: T[]) {
	collection.sort(function (a:T, b:T) {
		return a.created - b.created
	});
}

/**
 * Format a Unix timestamp to a human-readable date and time
 * @param unixTimestamp - Unix timestamp to format
 * @return Formatted date and time
 */
export function formatUnixTimestamp(unixTimestamp: string|number) {
	const date = new Date(Number(unixTimestamp)); // Multiply by 1000 to convert to milliseconds

	const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}/${month}/${day}, ${hours}:${minutes}:${seconds}`;
}
