export default function dateToString(date: Date): string {
	const now = new Date();
	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);

	let output = '';

	if (now.toDateString() === date.toDateString()) {
		output += 'Today ';
	} else if (now.toDateString() === yesterday.toDateString()) {
		output += 'Yesterday ';
	} else {
		output += date.toDateString() + ' ';
	}

	output += 'at ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

	return output;
}
