import type {
	CalificacionProceso,
	Certificacion,
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
		vigencia: -1
	},
	{
		id: '5YWM779iJ7xc9_Soy6q7sw',
		fechaObtencion: new Date(2015, 2, 12),
		idProfesionista: 'I_ijr3ITGtJX3Rns1QIjAQ',
		nombre: 'Cloud Architect',
		organizacion: 'Google',
		serie: 'Yt4s6iH_W_oKehZAAXey4Q',
		vigencia: 5
	},
	{
		id: '2vGis39bF6aEFMRGILSI0A',
		fechaObtencion: new Date(2010, 7, 25),
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Certified Ethical Hacker',
		organizacion: 'eccouncil.org',
		serie: 'iQuymvZRkvVfPK3zApS_TQ',
		vigencia: 3
	},
	{
		id: '5fuiE0rs02uc8j2jiX2RhQ',
		fechaObtencion: new Date(2020, 5, 5),
		idProfesionista: 'lkgQiHQXwnpAxpdJb0mygg',
		nombre: 'Web DEV Certified',
		organizacion: 'W3 Schools',
		serie: '3T56TJQRMVdZHoa0PJS2Kg',
		vigencia: 2
	},
	{
		id: 'CXjtZgWa6_mMFe0zRbPoMw',
		idProfesionista: 'hJAgH_96vYKEse56svK8Eg',
		fechaObtencion: new Date(2021, 9, 8),
		nombre: 'Oracle DB Advocate',
		organizacion: 'Oracle',
		serie: 'VUtEUoDg_5U_KE7PmsTgqQ',
		vigencia: 1
	},
	{
		id: 'SkcIwQFhVQsDm27q5WaAlA',
		idProfesionista: 'hJAgH_96vYKEse56svK8Eg',
		fechaObtencion: new Date(2023, 4, 20),
		nombre: 'Kubernetes Fundamentals',
		organizacion: 'Google',
		serie: 'yOWXZVM2CRpX4U8D9T-zJw',
		vigencia: 2
	},
	{
		id: 'Q3qI4-XPmLUGWSahHbZgig',
		idProfesionista: PROFESIONISTA_DEMO_ID,
		fechaObtencion: new Date(2024, 6, 6),
		nombre: 'Microsoft Certified: Azure Fundamentals',
		organizacion: 'Microsoft',
		serie: '12Yexw5WiJCVtwL04dyYsg',
		vigencia: 5
	},
	{
		id: 'yzE7vahMEhfynZYHzqzqUA',
		idProfesionista: PROFESIONISTA_DEMO_ID,
		fechaObtencion: new Date(2024, 9, 10),
		nombre: 'Data Analyst Associate',
		organizacion: 'Microsoft',
		serie: 'rao7KCE4XojvfiIFTGNhHA',
		vigencia: 5
	}
];

export const getCurrentProfesionistaDemoCertificates: () => Certificacion[] = () => {
	const demoProfesionista = getDemoProfesionista();
	return getDemoCertificaciones().filter((c) => c.idProfesionista === demoProfesionista.id);
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
		id: 'RHoZVhhVXDwm5LciscAB3g',
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
		idEmpleador: 'test-empleador',
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
