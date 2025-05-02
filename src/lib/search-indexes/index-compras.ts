import type {
	Certificacion,
	Certificaciones,
	Compra,
	Compras,
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
	convertCompra,
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
	compra: Compra;
};

export class IndexCompras extends SearchIndex<Compra> {
	dataHelper: DataProcesosHelper[];

	constructor(...data: DataProcesosHelper[]) {
		super();

		this.dataHelper = data;
	}

	convert(data: Compra): string {
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
			let compraStr = convertCompra(p.compra);

			const txt = `${certificacionStr} ${profesionistaStr} ${empleadorStr} ${procesoStr} ${compraStr}`;

			this.index.add(p.compra.id, txt);
		}
	}
}

export function newIndexCompras(
	profesionistas: Profesionistas,
	empleadores: Empleadores,
	certificaciones: Certificaciones,
	procesos: ProcesosContacto,
	compras: Compras
) {
	const mapCertificaciones = buildMap(certificaciones);
	const mapProfesionistas = buildMap(profesionistas);
	const mapEmpleadores = buildMap(empleadores);
	const mapProcesos = buildMap(procesos);

	const _data: DataProcesosHelper[] = [];

	for (let compra of compras) {
		const empleador = mapEmpleadores[compra.idEmpleador];

		for (let idProceso of compra.idsProcesosContacto) {
			const proceso = mapProcesos[idProceso];

			if (!proceso) continue;

			const profesionista = mapProfesionistas[proceso.idProfesionista];
			const certificacion = mapCertificaciones[proceso.idCertificacion];

			_data.push({
				proceso,
				certificacion,
				empleador,
				profesionista,
				compra
			});
		}
	}
	const index = new IndexCompras(..._data);

	index.addToIndexHelper(..._data);

	return index;
}
