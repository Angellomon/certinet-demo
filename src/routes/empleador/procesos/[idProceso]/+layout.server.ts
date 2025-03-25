import {
	getDemoCertificaciones,
	getDemoEmpleadores,
	getDemoProcesosContacto,
	getDemoProfesionistas
} from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';

export function load(data) {
	const params = data.params;

	const proceso = getDemoProcesosContacto().find((p) => p.id === params.idProceso);

	if (!proceso) {
		error(404, { message: `[404] Proceso no encontrado (p.id=${params.idProceso})` });
	}

	const empleador = getDemoEmpleadores().find((e) => e.id === proceso.idEmpleador);
	if (!empleador) {
		error(404, { message: `[404] Empleador no encontrado (p.idEmpleador=${proceso.idEmpleador})` });
	}

	const profesionista = getDemoProfesionistas().find((p) => p.id === proceso.idProfesionista);
	if (!profesionista) {
		error(404, `[404] Profesionista no encontrado (p.idProfesionista=${proceso.idProfesionista})`);
	}

	const certificacion = getDemoCertificaciones().find((c) => c.id === proceso.idCertificacion);
	if (!certificacion) {
		error(404, `[404] Certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);
	}

	return {
		proceso,
		empleador,
		profesionista,
		certificacion
	};
}
