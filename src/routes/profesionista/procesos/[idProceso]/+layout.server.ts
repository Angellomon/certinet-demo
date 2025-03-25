import {
	getDemoCertificaciones,
	getDemoEmpleadores,
	getDemoProcesosContacto
} from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const params = event.params;

	const parentData = await event.parent();

	const { currentProfesionista } = parentData;

	const proceso = getDemoProcesosContacto().find((p) => p.id === params.idProceso);
	if (!proceso) {
		error(404, { message: '[404] Proceso no encontrado...' });
	}

	const empleador = getDemoEmpleadores().find((e) => e.id === proceso.idEmpleador);
	if (!empleador) {
		error(404, `[404] empelador no encontrado (p.idEmpleador=${proceso.idEmpleador})`);
	}

	const certificacion = getDemoCertificaciones().find((c) => c.id === proceso.idCertificacion);
	if (!certificacion) {
		error(404, `[404] certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);
	}

	return {
		proceso,
		profesionista: currentProfesionista,
		empleador,
		certificacion
	};
}
