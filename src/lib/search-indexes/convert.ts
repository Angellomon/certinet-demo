import type {
	Certificacion,
	Curriculum,
	Empleador,
	ProcesoContacto,
	Profesionista
} from '$lib/entities';

export function convertCurriculum(data: Curriculum[]) {
	let result = '';

	const tags = new Set();

	for (let curr of data) {
		for (let tech of curr.tech) {
			tags.add(tech);
		}
	}

	result = result.concat(Array.from(tags).join(','));

	return result;
}

export function convertProfesionista(data: Profesionista) {
	let result = '';

	result = result.concat(`${data.nombre} `);
	result = result.concat(`${data.apellidos.replaceAll(' ', '')} `);
	result = result.concat(`${data.profesion} `);
	result = result.concat(`${data.correo} `);
	result = result.concat(convertCurriculum(data.trayectoria.laboral));
	result = result.concat(convertCurriculum(data.trayectoria.proyectos));

	return result;
}

export function convertEmpleador(data: Empleador) {
	let result = '';

	result = result.concat(`${data.razonSocial} `);
	result = result.concat(`${data.giro} `);
	result = result.concat(`${data.correo} `);

	return result;
}

export function convertCertificado(data: Certificacion) {
	let result = '';

	result = result.concat(`${data.nombre} `);
	result = result.concat(`${data.serie} `);
	result = result.concat(`${data.organizacion} `);

	return result;
}

export function convertProcesoContacto(data: ProcesoContacto) {
	let result = '';

	result = result.concat(data.contacto.empleador, ' ');
	result = result.concat(data.contacto.profesionista, ' ');

	return result;
}
