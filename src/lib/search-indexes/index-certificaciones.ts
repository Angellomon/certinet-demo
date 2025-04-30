import type { Certificacion, Certificaciones } from '$lib/entities';
import { convertCertificado } from './convert';
import { SearchIndex } from './search-index';

export class IndexCertificaciones extends SearchIndex<Certificacion> {
	constructor() {
		super();
	}

	convert(data: Certificacion): string {
		return convertCertificado(data);
	}
}

export function newIndexCertificaciones(...data: Certificaciones) {
	if (!data) return new IndexCertificaciones();

	const index = new IndexCertificaciones();

	index.addToIndex(...data);

	return index;
}
