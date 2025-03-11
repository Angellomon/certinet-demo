import { getDemoCertificaciones, getDemoProfesionista } from '$lib/demo-data';

export const load = (data) => {
	const currentProfesionista = getDemoProfesionista();
	const certificaciones = getDemoCertificaciones().filter(
		(c) => c.idProfesionista === currentProfesionista.id
	);

	return { certificaciones };
};
