import { Index } from 'flexsearch';
import type {
	Certificacion,
	Certificaciones,
	Curriculum,
	Profesionista,
	Profesionistas
} from './entities';

function escapeRegExp(text: string) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

abstract class SearchIndex<T> {
	protected index: Index;

	constructor() {
		this.index = new Index({ tokenize: 'forward' });
	}

	abstract addToIndex(...data: T[]): void;
	abstract search(searchTerm: string): string[];
	abstract updateIndex(data: T): void;
	abstract removeFromIndex(id: string): void;
}

export class IndexProfesionistas extends SearchIndex<Profesionista> {
	constructor() {
		super();
	}

	search(searchTerm: string): string[] {
		const text = escapeRegExp(searchTerm);
		return this.index.search(text) as any;
	}

	convertCurriculum(data: Curriculum[]) {
		let result = '';

		const tags = new Set();

		for (let curr of data) {
			for (let tech of curr.tech) {
				tags.add(tech);
			}
		}

		result = result.concat(Array.from(tags).join(','));

		return result;
	}

	convertProfesionista(data: Profesionista) {
		let result = '';

		result = result.concat(`${data.nombre},`);
		result = result.concat(`${data.apellidos.replaceAll(' ', '')},`);
		result = result.concat(`${data.profesion},`);
		result = result.concat(`${data.correo},`);
		result = result.concat(this.convertCurriculum(data.trayectoria.laboral));
		result = result.concat(this.convertCurriculum(data.trayectoria.proyectos));

		return result;
	}

	addToIndex(...data: Profesionistas): void {
		for (let profesionista of data) {
			const profesionistaStr = this.convertProfesionista(profesionista);
			this.index.add(profesionista.id, profesionistaStr);
		}
	}

	updateIndex(data: Profesionista) {
		if (this.index.contain(data.id)) this.index.update(data.id, this.convertProfesionista(data));
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

export class IndexCertificaciones extends SearchIndex<Certificacion> {
	constructor() {
		super();
	}

	convertCertificado(data: Certificacion) {
		let result = '';

		result = result.concat(data.nombre);
		result = result.concat(data.serie);
		result = result.concat(data.organizacion);

		return result;
	}

	search(searchTerm: string): string[] {
		const text = escapeRegExp(searchTerm);

		return this.index.search(text) as any;
	}

	addToIndex(...data: Certificaciones): void {
		for (let cert of data) {
			const certificacionStr = this.convertCertificado(cert);
			this.index.add(cert.id, certificacionStr);
		}
	}

	updateIndex(data: Certificacion) {
		if (this.index.contain(data.id)) this.index.update(data.id, this.convertCertificado(data));
		else this.addToIndex(data);
	}

	removeFromIndex(id: string): void {
		if (this.index.contain(id)) this.index.remove(id);
	}
}

export function newIndexCertificaciones(...data: Certificaciones) {
	if (!data) return new IndexCertificaciones();

	const index = new IndexCertificaciones();

	index.addToIndex(...data);

	return index;
}
