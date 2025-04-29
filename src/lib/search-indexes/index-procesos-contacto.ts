import type {
	Certificacion,
	Certificaciones,
	Empleador,
	Empleadores,
	ProcesoContacto,
	ProcesosContacto,
	Profesionista,
	Profesionistas
} from '$lib/entities';
import { buildMap } from '$lib/utils';
import {
	convertCertificado,
	convertEmpleador,
	convertProcesoContacto,
	convertProfesionista
} from './convert';
import { SearchIndex } from './search-index';

type DataProcesosHelper = {
	proceso: ProcesoContacto;
	profesionista: Profesionista;
	empleador: Empleador;
	certificacion: Certificacion;
};

export class IndexProcesosContacto extends SearchIndex<ProcesoContacto> {
	constructor() {
		super();
	}

	search(searchTerm: string): string[] {
		const text = this.escapeRegExp(searchTerm);
		return this.index.search(text) as any;
	}

	addToIndex(...data: ProcesosContacto): void {}

	addToIndexHelper(...data: DataProcesosHelper[]) {
		let txt = '';

		for (let p of data) {
			let certificacionStr = convertCertificado(p.certificacion);
			let profesionistaStr = convertProfesionista(p.profesionista);
			let empleadorStr = convertEmpleador(p.empleador);
			let procesoStr = convertProcesoContacto(p.proceso);

			txt = txt.concat(certificacionStr, profesionistaStr, empleadorStr, procesoStr);

			this.index.add(p.proceso.id, txt);
		}
	}

	updateIndex(data: ProcesoContacto) {}

	removeFromIndex(id: string): void {
		if (this.index.contain(id)) this.index.remove(id);
	}
}

export function newIndexProcesosContacto(
	profesionistas: Profesionistas,
	empleadores: Empleadores,
	certificaciones: Certificaciones,
	procesos: ProcesosContacto
) {
	const mapCertificaciones = buildMap(certificaciones);
	const mapProfesionistas = buildMap(profesionistas);
	const mapEmpleadores = buildMap(empleadores);

	const index = new IndexProcesosContacto();

	const _data: DataProcesosHelper[] = [];

	for (let proceso of procesos) {
		const profesionista = mapProfesionistas[proceso.idProfesionista];
		const empleador = mapEmpleadores[proceso.idEmpleador];
		const certificacion = mapCertificaciones[proceso.idCertificacion];

		_data.push({
			proceso,
			certificacion,
			empleador,
			profesionista
		});
	}

	index.addToIndexHelper(..._data);

	return index;
}
