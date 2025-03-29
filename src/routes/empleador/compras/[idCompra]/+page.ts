import { getDemoCertificaciones, getDemoCompras, getDemoProcesosContacto } from '$lib/demo-data';
import type { Certificacion } from '$lib/entities.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const { idCompra } = params;

	const compra = getDemoCompras().find((c) => c.id === idCompra);

	if (!compra) error(404, `[404] compra no encontrada (idCompra=${idCompra})`);

	const procesosContacto = getDemoProcesosContacto().filter((c) =>
		compra.idsProcesosContacto.includes(c.id)
	);

	const certificaciones: Certificacion[] = [];

	const certificacionesIdMap: Record<string, Certificacion> = {};

	const demoCerts = getDemoCertificaciones();

	for (let proceso of procesosContacto) {
		const certificacion = demoCerts.find((c) => c.id == proceso.idCertificacion);
		if (!certificacion) continue;

		certificaciones.push(certificacion);

		if (!certificacionesIdMap[certificacion.id])
			certificacionesIdMap[certificacion.id] = certificacion;
	}

	return {
		compra,
		procesosContacto,
		certificaciones,
		certificacionesIdMap
	};
};
