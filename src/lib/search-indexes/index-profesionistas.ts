import type { Curriculum, Profesionista, Profesionistas } from '$lib/entities';
import { convertProfesionista } from './convert';
import { SearchIndex } from './search-index';

export class IndexProfesionistas extends SearchIndex<Profesionista> {
	constructor() {
		super();
	}

	convert(data: Profesionista): string {
		return convertProfesionista(data);
	}

	addToIndex(...data: Profesionistas): void {
		for (let profesionista of data) {
			const profesionistaStr = convertProfesionista(profesionista);
			this.index.add(profesionista.id, profesionistaStr);
		}
	}
}

export function newIndexProfesionistas(...data: Profesionistas) {
	if (!data) return new IndexProfesionistas();

	const index = new IndexProfesionistas();

	index.addToIndex(...data);

	return index;
}
