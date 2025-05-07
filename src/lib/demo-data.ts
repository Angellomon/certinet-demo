import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';

import type {
	Admin,
	CalificacionProceso,
	Certificacion,
	Compra,
	Empleador,
	FormaPago,
	PrecioCertificacion,
	ProcesoContacto,
	Profesionista,
	SeccionAdmin,
	SeccionAdminConfig,
	SeccionAdminEmpleador,
	SeccionAdminProfesionista,
	SeccionAdminProfesionistas,
	SeciconAdminCertificacion
} from './entities';

export const PROFESIONISTA_DEMO_ID = 'test-profesionista';
export const EMPLEADOR_DEMO_ID = 'test-empleador';
export const ADMIN_DEMO_ID = 'test-admin';

export const DEFAULT_SECCION_ADMIN_STORE: SeccionAdmin = 'dashboard';
export const DEFAULT_SECCION_ADMIN_CONFIG_STORE: SeccionAdminConfig = 'datos';
export const DEFAULT_SECCION_ADMIN_PROFESIONISTAS_STORE: SeccionAdminProfesionistas = 'dashboard';
export const DEFAULT_SECCION_ADMIN_PROFESIONISTA_STORE: SeccionAdminProfesionista = 'datos';
export const DEFAULT_SECCION_ADMIN_EMPLEADOR_STORE: SeccionAdminEmpleador = 'datos';
export const DEFAULT_SECCION_ADMIN_CERTIFICACION_STORE: SeciconAdminCertificacion = 'datos';

export const getDemoProfesionista: () => Profesionista = () =>
	getDemoProfesionistas().filter((p) => p.id == PROFESIONISTA_DEMO_ID)[0];

export const getDemoEmpleador: () => Empleador = () =>
	getDemoEmpleadores().filter((e) => e.id === EMPLEADOR_DEMO_ID)[0];

const defaultTrayectoria = {
	laboral: [],
	proyectos: []
};

export const getDemoProfesionistas: () => Profesionista[] = () => [
	{
		id: PROFESIONISTA_DEMO_ID,
		nombre: 'Juan',
		apellidos: 'Pérez Casas',
		correo: 'profesionista@test.com',
		fechaNacimeinto: new Date(1996, 6, 3),
		profesion: 'Programador',
		verificado: true,
		trayectoria: {
			laboral: [
				{
					descripcion:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget iaculis nunc. Sed vulputate odio nibh, a dignissim quam accumsan quis. Suspendisse pharetra erat et ornare porttitor. Curabitur id turpis a ipsum egestas dapibus. ',
					empresa: 'TestCO',
					fechaInicio: new Date(2023, 5, 10),
					fechaFin: null,
					nombre: 'Tester',
					tech: ['python', 'pandas', 'azure', 'postgresql']
				},
				{
					descripcion:
						'Cras lacinia libero tortor, iaculis consectetur enim pretium vel. Aenean porta nisi non ullamcorper efficitur. Nullam erat ex, pulvinar nec dictum in, sodales id dui. Aenean eget elit non erat mattis maximus a sed metus. Cras nunc risus, egestas id mauris a, faucibus ultrices magna.',
					empresa: 'TestCO 2',
					fechaInicio: new Date(2025, 4, 10),
					fechaFin: null,
					nombre: 'Test Developer',
					tech: ['javascript', 'react', 'frontend', 'mongodb']
				}
			],
			proyectos: [
				{
					descripcion:
						'Cenean erat est, porta id venenatis et, volutpat eget metus. Curabitur dolor elit, mollis ut tortor vehicula, consectetur dapibus dui. ',
					empresa: 'Propia',
					fechaInicio: new Date(2024, 7, 10),
					fechaFin: null,
					nombre: 'Testing Project',
					tech: ['zig', 'llvm', 'tigerbeetle']
				},
				{
					descripcion:
						'Quisque tristique ligula quis fringilla placerat. Aliquam mattis scelerisque suscipit. Fusce urna tortor, dictum eu rhoncus a, egestas in nisi. Cras egestas nisl vitae arcu porttitor laoreet. Sed rutrum dolor velit, ut porta elit interdum sit amet. Integer et ornare dui. Praesent sem libero, imperdiet eu ante non, bibendum porttitor enim.',
					empresa: 'Propia',
					fechaInicio: new Date(2025, 9, 12),
					fechaFin: null,
					nombre: 'Testing Project 2',
					tech: ['rust', 'llvm', 'opengl']
				}
			]
		}
	},
	{
		id: 'I_ijr3ITGtJX3Rns1QIjAQ',
		nombre: 'Summer',
		apellidos: 'Rodriguez Graves',
		correo: 'summer-rodriguez@test.com',
		fechaNacimeinto: new Date(1996, 6, 3),
		profesion: 'Programador',
		verificado: true,
		trayectoria: defaultTrayectoria
	},
	{
		id: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Miles',
		apellidos: 'Holloway Deleon',
		correo: 'miles-holloway@test.com',
		fechaNacimeinto: new Date(1987, 3, 12),
		profesion: 'Ingeniería Electrónica',
		verificado: false,
		trayectoria: defaultTrayectoria
	},
	{
		id: 'hJAgH_96vYKEse56svK8Eg',
		nombre: 'Laurie',
		apellidos: 'Griffith Hebert',
		correo: 'lauerie-griffith@test.com',
		fechaNacimeinto: new Date(1995, 8, 26),
		profesion: 'Administrador de Base de Datos',
		verificado: true,
		trayectoria: defaultTrayectoria
	}
];

// TODO: Empleadores == Organizaciones?
export const getDemoEmpleadores: () => Empleador[] = () => [
	{
		id: 'test-empleador',
		correo: 'empleador@test.com',
		fechaEstablecimiento: new Date(2005, 10, 2),
		giro: 'tech',
		razonSocial: 'Test & Co.',
		verificado: true
	},
	{
		id: 'uEHLrPCnfnomFaD26VbcUw',
		razonSocial: 'Microsoft',
		correo: 'microsoft@test.com',
		fechaEstablecimiento: new Date(1975, 4, 24),
		giro: 'tech',
		verificado: true
	},
	{
		id: 'd56yK4gSilWYMH25LpX5Lg',
		razonSocial: 'Oracle',
		correo: 'oracle@test.com',
		fechaEstablecimiento: new Date(1977, 10, 24),
		giro: 'tech',
		verificado: false
	},
	{
		id: 'Cr-9Ankbw_GkSbnjPDy8aA',
		razonSocial: 'Google',
		correo: 'google@test.com',
		fechaEstablecimiento: new Date(1998, 8, 14),
		giro: 'tech',
		verificado: false
	}
];

export const getDemoCertificaciones: () => Certificacion[] = () => [
	{
		id: 'MK8iiR5NoeZsB67WWz9vVA',
		fechaObtencion: new Date(2006, 12, 12),
		idProfesionista: 'I_ijr3ITGtJX3Rns1QIjAQ',
		nombre: "System's Architect",
		organizacion: 'Google',
		serie: 'Yt4s6iH_W_oKehZAAXey4Q',
		vigencia: -1,
		verificado: false
	},
	{
		id: '5YWM779iJ7xc9_Soy6q7sw',
		fechaObtencion: new Date(2015, 2, 12),
		idProfesionista: 'I_ijr3ITGtJX3Rns1QIjAQ',
		nombre: 'Cloud Architect',
		organizacion: 'Google',
		serie: 'Yt4s6iH_W_oKehZAAXey4Q',
		vigencia: 5,
		verificado: true
	},
	{
		id: '2vGis39bF6aEFMRGILSI0A',
		fechaObtencion: new Date(2010, 7, 25),
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Certified Ethical Hacker',
		organizacion: 'eccouncil.org',
		serie: 'iQuymvZRkvVfPK3zApS_TQ',
		vigencia: 3,
		verificado: true
	},
	{
		id: '5fuiE0rs02uc8j2jiX2RhQ',
		fechaObtencion: new Date(2020, 5, 5),
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Web DEV Certified',
		organizacion: 'W3 Schools',
		serie: '3T56TJQRMVdZHoa0PJS2Kg',
		vigencia: 2,
		verificado: false
	},
	{
		id: 'CXjtZgWa6_mMFe0zRbPoMw',
		idProfesionista: 'hJAgH_96vYKEse56svK8Eg',
		fechaObtencion: new Date(2021, 9, 8),
		nombre: 'Oracle DB Advocate',
		organizacion: 'Oracle',
		serie: 'VUtEUoDg_5U_KE7PmsTgqQ',
		vigencia: 1,
		verificado: true
	},
	{
		id: 'SkcIwQFhVQsDm27q5WaAlA',
		idProfesionista: 'hJAgH_96vYKEse56svK8Eg',
		fechaObtencion: new Date(2023, 4, 20),
		nombre: 'Kubernetes Fundamentals',
		organizacion: 'Google',
		serie: 'yOWXZVM2CRpX4U8D9T-zJw',
		vigencia: 2,
		verificado: true
	},
	{
		id: 'Q3qI4-XPmLUGWSahHbZgig',
		idProfesionista: PROFESIONISTA_DEMO_ID,
		fechaObtencion: new Date(2024, 6, 6),
		nombre: 'Microsoft Certified: Azure Fundamentals',
		organizacion: 'Microsoft',
		serie: '12Yexw5WiJCVtwL04dyYsg',
		vigencia: 5,
		verificado: false
	},
	{
		id: 'yzE7vahMEhfynZYHzqzqUA',
		idProfesionista: PROFESIONISTA_DEMO_ID,
		fechaObtencion: new Date(2024, 9, 10),
		nombre: 'Data Analyst Associate',
		organizacion: 'Microsoft',
		serie: 'rao7KCE4XojvfiIFTGNhHA',
		vigencia: 5,
		verificado: true
	}
];

export const getDemoCompras: () => Compra[] = () => [
	{
		fecha: new Date(2025, 1, 14),
		id: 'rDBQZ0J7sza7CQ2k-P-iIQ',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idsProcesosContacto: [
			'ZrWElEKLAxoec6aUAnKsxQ',
			'RHoZVhhVXDwm5LciscAB3g',
			'WPfNt2Ci9J_OUBbyUmGDyA'
		],
		monto: 150,
		precio: {
			centena: 300,
			decena: 250,
			unidad: 50
		},
		status: 'completado'
	},
	{
		fecha: new Date(2025, 1, 27),
		id: '9HwDyGY6K4uVbCk8wdIJ5w',
		idEmpleador: 'uEHLrPCnfnomFaD26VbcUw',
		idsProcesosContacto: ['U4BLP3metaGZuYGjekNLOQ'],
		monto: 43,
		precio: {
			centena: 20,
			decena: 30,
			unidad: 43
		},
		status: 'en proceso'
	},
	{
		fecha: new Date(2025, 2, 4),
		id: 'mSMjxBTHEs5nrSILUeaoYg',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idsProcesosContacto: ['Bp9cxscAcaMYXJaodSSpjA'],
		monto: 56,
		precio: {
			centena: 100,
			decena: 60,
			unidad: 56
		},
		status: 'rechazado'
	}
];

export const getCurrentProfesionistaDemoCertificates: () => Certificacion[] = () => {
	const demoProfesionista = getDemoProfesionista();
	return getDemoCertificaciones().filter((c) => c.idProfesionista === demoProfesionista.id);
};

export const getDemoEmpleadorById = (idEmpleador: string) => {
	const empleador = getDemoEmpleadores().find((e) => e.id === idEmpleador);

	if (!empleador) return null;

	return empleador;
};

export const getDemoCertificacionById = (idCertificacion: string) => {
	const certificacion = getDemoCertificaciones().find((c) => c.id === idCertificacion);

	if (!certificacion) return null;

	return certificacion;
};

export const getDemoProfesionistaById = (idProfesionista: string) => {
	const profesionista = getDemoProfesionistas().find((p) => p.id === idProfesionista);

	if (!profesionista) return null;

	return profesionista;
};

export const generateId = () => {
	const random: RandomReader = {
		read(bytes) {
			crypto.getRandomValues(bytes);
		}
	};
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	// 10-characters long string consisting of the upper case letters
	return generateRandomString(random, alphabet, 24);
};

export const newProcesoContacto = (
	empleador: Empleador,
	certificacion: Certificacion,
	profesionista: Profesionista
) => {
	if (certificacion.idProfesionista !== profesionista.id)
		throw new Error('mismatch profesionista & certificacion');

	const proceso: ProcesoContacto = {
		fechaInicio: new Date(),
		fechaFin: null,
		id: generateId(),
		idCalificacion: null,
		idCertificacion: certificacion.id,
		idEmpleador: empleador.id,
		idProfesionista: certificacion.idProfesionista,
		contacto: {
			empleador: empleador.correo,
			profesionista: profesionista.correo,
			tipo: 'email'
		}
	};

	return proceso;
};

export const newProcesosContacto = (idEmpleador: string, idsCerts: string[]) => {
	const empleador = getDemoEmpleadorById(idEmpleador);
	const procesos: ProcesoContacto[] = [];

	if (!empleador) throw new Error('empleador not found [id=' + idEmpleador + ']');

	for (let idCert of idsCerts) {
		const cert = getDemoCertificacionById(idCert);
		if (!cert) continue;

		const profesionista = getDemoProfesionistaById(cert.idProfesionista);
		if (!profesionista) continue;

		const proceso = newProcesoContacto(empleador, cert, profesionista);

		procesos.push(proceso);
	}

	return procesos;
};

export const getDemoProcesosContacto: () => ProcesoContacto[] = () => [
	{
		id: 'ZrWElEKLAxoec6aUAnKsxQ',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idProfesionista: PROFESIONISTA_DEMO_ID,
		contacto: {
			empleador: 'test-empleador@test.com',
			profesionista: 'test-profesionista@test.com',
			tipo: 'email'
		},
		fechaInicio: new Date(2025, 2, 15),
		fechaFin: null,
		idCalificacion: null,
		idCertificacion: 'yzE7vahMEhfynZYHzqzqUA'
	},
	{
		id: 'RHoZVhhVXDwm5LciscAB3g',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idProfesionista: 'hJAgH_96vYKEse56svK8Eg',
		contacto: {
			empleador: '+414433221122',
			profesionista: '+414433665533',
			tipo: 'whatsapp'
		},
		fechaInicio: new Date(2025, 3, 8),
		fechaFin: null,
		idCalificacion: null,
		idCertificacion: 'CXjtZgWa6_mMFe0zRbPoMw'
	},
	{
		id: 'WPfNt2Ci9J_OUBbyUmGDyA',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		contacto: {
			empleador: '+416669689483',
			profesionista: '+318889032321',
			tipo: 'whatsapp'
		},
		fechaInicio: new Date(2025, 3, 8),
		fechaFin: null,
		idCalificacion: null,
		idCertificacion: '5fuiE0rs02uc8j2jiX2RhQ'
	},
	{
		id: 'U4BLP3metaGZuYGjekNLOQ',
		idEmpleador: 'uEHLrPCnfnomFaD26VbcUw',
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		contacto: {
			empleador: '+416669689483',
			profesionista: '+318889032321',
			tipo: 'whatsapp'
		},
		fechaInicio: new Date(2025, 3, 8),
		fechaFin: new Date(2025, 3, 15),
		idCalificacion: 'zvX4wZ97-t2RUf70uwvDWw',
		idCertificacion: '5fuiE0rs02uc8j2jiX2RhQ'
	},
	{
		id: 'Bp9cxscAcaMYXJaodSSpjA',
		idEmpleador: EMPLEADOR_DEMO_ID,
		idProfesionista: 'I_ijr3ITGtJX3Rns1QIjAQ',
		contacto: {
			empleador: '+416669689483',
			profesionista: '+318889032321',
			tipo: 'whatsapp'
		},
		fechaInicio: new Date(2025, 2, 8),
		fechaFin: new Date(2025, 2, 15),
		idCalificacion: 'qFAT9GjwgCi5nEtUwAjLtA',
		idCertificacion: '5YWM779iJ7xc9_Soy6q7sw'
	}
];

export const getDemoCalificacionesProceso: () => CalificacionProceso[] = () => [
	{
		id: 'zvX4wZ97-t2RUf70uwvDWw',
		idProceso: 'U4BLP3metaGZuYGjekNLOQ',
		empleador: {
			id: 'uEHLrPCnfnomFaD26VbcUw',
			tipo: 'estrella-5',
			valor: 5
		},
		profesionista: {
			id: 'I_ijr3ITGtJX3Rns1QIjAQ',
			tipo: 'estrella-5',
			valor: 4
		}
	},
	{
		id: 'qFAT9GjwgCi5nEtUwAjLtA',
		idProceso: 'Bp9cxscAcaMYXJaodSSpjA',
		empleador: {
			id: 'test-empleador',
			tipo: 'estrella-5',
			valor: 4
		},
		profesionista: {
			id: 'I_ijr3ITGtJX3Rns1QIjAQ',
			tipo: 'estrella-5',
			valor: 4
		}
	}
];

export function getDefaultPrecioCertificacion(): PrecioCertificacion {
	return {
		centena: 180,
		decena: 15,
		unidad: 1
	};
}

export function getDefaultFormaPago(): FormaPago {
	return {
		tarjeta: '1111 2222 3333 4444',
		verificado: false,
		cvc: '000',
		año: 2025,
		mes: 1,
		nombreTitular: 'Nombre'
	};
}

export function getDefaultAdmin(): Admin {
	return {
		correo: 'admin@test.com',
		id: ADMIN_DEMO_ID,
		nombre: 'Admon'
	};
}

export const getDefaultAdmins = () => [getDefaultAdmin()];
