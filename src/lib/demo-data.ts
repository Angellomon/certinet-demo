import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';

import type {
	CalificacionProceso,
	Certificacion,
	Compra,
	Empleador,
	ProcesoContacto,
	Profesionista
} from './entities';

const PROFESIONISTA_DEMO_ID = 'test-profesionista';
const EMPLEADOR_DEMO_ID = 'test-empleador';

export const getDemoProfesionista: () => Profesionista = () =>
	getDemoProfesionistas().filter((p) => p.id == PROFESIONISTA_DEMO_ID)[0];

export const getDemoEmpleador: () => Empleador = () =>
	getDemoEmpleadores().filter((e) => e.id === EMPLEADOR_DEMO_ID)[0];

export const getDemoProfesionistas: () => Profesionista[] = () => [
	{
		id: PROFESIONISTA_DEMO_ID,
		nombre: 'Juan',
		apellidos: 'Pérez Casas',
		correo: 'profesionista@test.com',
		fechaNacimeinto: new Date(1996, 6, 3),
		profesion: 'Programador',
		verificado: true
	},
	{
		id: 'I_ijr3ITGtJX3Rns1QIjAQ',
		nombre: 'Summer',
		apellidos: 'Rodriguez Graves',
		correo: 'summer-rodriguez@test.com',
		fechaNacimeinto: new Date(1996, 6, 3),
		profesion: 'Programador',
		verificado: true
	},
	{
		id: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Miles',
		apellidos: 'Holloway Deleon',
		correo: 'miles-holloway@test.com',
		fechaNacimeinto: new Date(1987, 3, 12),
		profesion: 'Ingeniería Electrónica',
		verificado: false
	},
	{
		id: 'hJAgH_96vYKEse56svK8Eg',
		nombre: 'Laurie',
		apellidos: 'Griffith Hebert',
		correo: 'lauerie-griffith@test.com',
		fechaNacimeinto: new Date(1995, 8, 26),
		profesion: 'Administrador de Base de Datos',
		verificado: true
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

export const getDemoPagos: () => Compra[] = () => [
	{
		fecha: new Date(2025, 1, 14),
		id: generateId(),
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
		id: generateId(),
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
		id: generateId(),
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
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	// 10-characters long string consisting of the upper case letters
	return generateRandomString(random, alphabet, 10);
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
