export type Certificacion = {
	nombre: string;
	serie: string;
	organizacion: string;
	fechaObtencion: Date;
	vigencia: number;
	idProfesionista: string;
};

export type Profesionista = {
	id: string;
	correo: string;
	nombre: string;
	apellidos: string;
	fechaNacimeinto: Date;
	profesion: string;
	cedula: string;
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
	idProfesionista: string;
	idEmpleador: string;
	fechaInicio: string;
	fechaFin: string | null;
	contacto: {
		tipo: 'email' | 'whatsapp' | 'otro';
		empleador: string;
		profesionista: string;
	};
};
