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
	dataHelper: DataProcesosHelper[];

	constructor(...data: DataProcesosHelper[]) {
		super();

		this.dataHelper = data;
	}

	convert(data: ProcesoContacto): string {
		let dataProceso = this.dataHelper.find((d) => d.proceso.id === data.id);

		return dataProceso ? this.convertHelper(dataProceso) : '';
	}

	convertHelper(data: DataProcesosHelper) {
		let certificacionStr = convertCertificado(data.certificacion);
		let profesionistaStr = convertProfesionista(data.profesionista);
		let empleadorStr = convertEmpleador(data.empleador);
		let procesoStr = convertProcesoContacto(data.proceso);

		return `${certificacionStr}${profesionistaStr}${empleadorStr}${procesoStr}`;
	}

	addToIndexHelper(...data: DataProcesosHelper[]) {
		for (let p of data) {
			let certificacionStr = convertCertificado(p.certificacion);
			let profesionistaStr = convertProfesionista(p.profesionista);
			let empleadorStr = convertEmpleador(p.empleador);
			let procesoStr = convertProcesoContacto(p.proceso);

			const txt = `${certificacionStr} ${profesionistaStr} ${empleadorStr} ${procesoStr}`;

			this.index.add(p.proceso.id, txt);
		}
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
	const index = new IndexProcesosContacto(..._data);

	index.addToIndexHelper(..._data);

	return index;
}
