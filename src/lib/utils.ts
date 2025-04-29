export function formatNumber(num: number) {
	let n = num.toFixed(2) + '';
	const x = n.split('.');
	let x1 = x[0];
	let x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

export function buildMap<T extends { id: string }>(data: T[]): Record<string, T> {
	const result: Record<string, T> = {};

	for (let d of data) {
		result[d.id] = d;
	}

	return result;
}
