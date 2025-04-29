import type { Curriculum, Profesionista, Profesionistas } from '$lib/entities';
import { convertProfesionista } from './convert';
import { SearchIndex } from './search-index';

export class IndexProfesionistas extends SearchIndex<Profesionista> {
	constructor() {
		super();
	}

	search(searchTerm: string): string[] {
		const text = this.escapeRegExp(searchTerm);
		return this.index.search(text) as any;
	}

	addToIndex(...data: Profesionistas): void {
		for (let profesionista of data) {
			const profesionistaStr = convertProfesionista(profesionista);
			this.index.add(profesionista.id, profesionistaStr);
		}
	}

	updateIndex(data: Profesionista) {
		if (this.index.contain(data.id)) this.index.update(data.id, convertProfesionista(data));
		else this.addToIndex(data);
	}

	removeFromIndex(id: string): void {
		if (this.index.contain(id)) this.index.remove(id);
	}
}

export function newIndexProfesionistas(...data: Profesionistas) {
	if (!data) return new IndexProfesionistas();

	const index = new IndexProfesionistas();

	index.addToIndex(...data);

	return index;
}
