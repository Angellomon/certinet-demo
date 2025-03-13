import { getDemoCertificaciones } from '$lib/demo-data.js';
import { error } from '@sveltejs/kit';

export const load = ({ url }) => {
	const certIds: string[] = url.searchParams.get('certIds')?.split(',') || [];

	if (certIds.length < 1) error(400, { message: 'too few certs' });

	// todo: impl better search
	const certificaciones = getDemoCertificaciones().filter((c) => {
		return certIds.includes(c.id);
	});

	return {
		certificaciones
	};
};
