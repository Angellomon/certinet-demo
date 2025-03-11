export type Certificacion = {
	id: string;
	nombre: string;
	serie: string;
	organizacion: string;
	fechaObtencion: Date;
	vigencia: number;
	idProfesionista: string;
	verificado: boolean
};

export type Profesionista = {
	id: string;
	correo: string;
	nombre: string;
	apellidos: string;
	fechaNacimeinto: Date;
	profesion: string;
	verificado: boolean;
};

export type Empleador = {
	id: string;
	correo: string;
	razonSocial: string;
	giro: string;
	fechaEstablecimiento: Date;
	verificado: boolean;
};

export type ProcesoContacto = {
	id: string;
	idCertificacion: string;
	idProfesionista: string;
	idEmpleador: string;
	idCalificacion: string | null;
	fechaInicio: Date;
	fechaFin: Date | null;
	contacto: {
		tipo: 'email' | 'whatsapp' | 'otro';
		empleador: string;
		profesionista: string;
	};
};

export type TipoCalificacion = 'estrella-5' | 'ponderacion-5' | 'ponderacion-10';

export type Calificacion = {
	id: string;
	tipo: TipoCalificacion;
	valor: number;
};

export type CalificacionProceso = {
	id: string;
	idProceso: string;
	empleador: Calificacion | null;
	profesionista: Calificacion | null;
};
