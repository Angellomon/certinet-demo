import type { Empleador, Empleadores } from '$lib/entities';
import { convertEmpleador } from './convert';
import { SearchIndex } from './search-index';

export class IndexEmpleadores extends SearchIndex<Empleador> {
	constructor() {
		super();
	}

	convert(data: Empleador): string {
		return convertEmpleador(data);
	}
}

export function newIndexEmpleadores(...data: Empleadores) {
	if (!data) return new IndexEmpleadores();

	const index = new IndexEmpleadores();

	index.addToIndex(...data);

	return index;
}
