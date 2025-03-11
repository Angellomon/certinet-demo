import { getDemoCertificaciones } from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';

export const load = (data) => {
	const { idCertificacion } = data.params;

	const certificacion = getDemoCertificaciones().find((c) => c.id === idCertificacion);

	if (!certificacion) error(404, { message: '[404] Certificación no encontrada' });

	return { certificacion };
};
