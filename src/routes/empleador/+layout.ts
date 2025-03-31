import {
	getDemoCertificaciones,
	getDemoEmpleador,
	getDemoProcesosContacto
} from '$lib/demo-data.js';
import type { Certificacion } from '$lib/entities.js';

export function load(data) {
	const currentEmpleador = getDemoEmpleador();

	const procesos = getDemoProcesosContacto().filter((p) => p.idEmpleador === currentEmpleador.id);
	const procesosContacto = procesos.slice(0, 10);
	const totalProcesos = procesos.length;

	const certificaciones = getDemoCertificaciones();
	const certificacionesDataMap: Record<string, Certificacion> = {};

	procesos.forEach((p) => {
		const cert = certificaciones.find((c) => c.id == p.idCertificacion);
		if (!cert) return;

		certificacionesDataMap[p.idCertificacion] = cert;
	});

	return {
		currentEmpleador,
		procesosContacto,
		totalProcesos,
		certificaciones,
		certificacionesDataMap
	};
}
