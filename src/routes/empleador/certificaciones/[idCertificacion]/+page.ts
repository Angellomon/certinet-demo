import { getDemoCertificaciones, getDemoProfesionistas } from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';

export const load = (data) => {
	const { idCertificacion } = data.params;

	const certificacion = getDemoCertificaciones().find((c) => c.id === idCertificacion);

	if (!certificacion) error(404, { message: '[404] Certificación no encontrada' });

	const profesionista = getDemoProfesionistas().find((p) => p.id === certificacion.idProfesionista);

	if (!profesionista) error(404, { message: '[404] Profesionista no encontrado' });

	return { certificacion, profesionista };
};
