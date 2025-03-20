import {
	getDemoCertificacionById,
	getDemoEmpleador,
	getDemoProcesosContacto,
	newProcesosContacto
} from '$lib/demo-data';

export async function load({ parent, url }) {
	const currentEmpleador = getDemoEmpleador();
	let procesosContacto = getDemoProcesosContacto().filter(
		(p) => p.idEmpleador === currentEmpleador.id
	);

	const parentData = await parent();

	const { certificacionesDataMap, certificaciones } = parentData;

	const certIds: string[] = url.searchParams.get('idsCerts')?.split(',') || [];

	if (certIds.length > 0) {
		const nuevosProcesosContacto = newProcesosContacto(currentEmpleador.id, certIds);

		procesosContacto = procesosContacto.concat(nuevosProcesosContacto);

		for (let proceso of nuevosProcesosContacto) {
			const cert = getDemoCertificacionById(proceso.idCertificacion);
			if (!cert) continue;

			certificacionesDataMap[proceso.idCertificacion] = cert;
		}
	}

	return { currentEmpleador, procesosContacto, certificacionesDataMap, certificaciones };
}
