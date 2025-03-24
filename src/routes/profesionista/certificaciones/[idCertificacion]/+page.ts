import { getDemoCertificaciones } from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';
import { certificacionesLocalStore } from '../utils.svelte.js';

export const load = (data) => {
	const { idCertificacion } = data.params;

	const certificacion = [
		...getDemoCertificaciones(),
		...certificacionesLocalStore.certificaciones
	].find((c) => c.id === idCertificacion);

	if (!certificacion) error(404, { message: '[404] Certificación no encontrada' });

	return { certificacion };
};

export const ssr = false;
