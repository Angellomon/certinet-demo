import type { Empleador, Empleadores } from '$lib/entities';
import { convertEmpleador } from './convert';
import { SearchIndex } from './search-index';

export class IndexEmpleadores extends SearchIndex<Empleador> {
	constructor() {
		super();
	}

	search(searchTerm: string): string[] {
		const text = this.escapeRegExp(searchTerm);
		return this.index.search(text) as any;
	}

	addToIndex(...data: Empleadores): void {
		for (let empleador of data) {
			const empleadorStr = convertEmpleador(empleador);
			this.index.add(empleador.id, empleadorStr);
		}
	}

	updateIndex(data: Empleador): void {
		if (this.index.contain(data.id)) this.index.update(data.id, convertEmpleador(data));
		else this.addToIndex(data);
	}

	removeFromIndex(id: string): void {
		if (this.index.contain(id)) this.index.remove(id);
	}
}

export function newIndexEmpleadores(...data: Empleadores) {
	if (!data) return new IndexEmpleadores();

	const index = new IndexEmpleadores();

	index.addToIndex(...data);

	return index;
}
