import * as v from 'valibot';

const idSchema = v.string();
const emailSchema = v.pipe(v.string(), v.trim(), v.email());
const positiveNumberSchema = v.pipe(v.number(), v.minValue(0));
const dateSchema = v.pipe(
	v.string(),
	v.transform((value) => new Date(value)),
	v.date()
);
type DateType = v.InferOutput<typeof dateSchema>;

const certificacionSchema = v.object({
	id: idSchema,
	nombre: v.string(),
	serie: v.string(),
	organizacion: v.string(),
	fechaObtencion: dateSchema,
	vigencia: v.number(),
	idProfesionista: v.string(),
	verificado: v.boolean()
});
export type Certificacion = v.InferOutput<typeof certificacionSchema>;

export const certificacionesSchema = v.array(certificacionSchema)
export type Certificaciones = v.InferOutput<typeof certificacionesSchema>

const profesionistaSchema = v.object({
	id: idSchema,
	correo: emailSchema,
	nombre: v.string(),
	apellidos: v.string(),
	fechaNacimeinto: dateSchema,
	profesion: v.string(),
	verificado: v.boolean()
});
export type Profesionista = v.InferOutput<typeof profesionistaSchema>;

const dataContactoSchema = v.object({
	tipo: v.union([v.literal('email'), v.literal('whatsapp'), v.literal('otro')]),
	empleador: v.string(),
	profesionista: v.string()
});
type DataContacto = v.InferOutput<typeof dataContactoSchema>;

const procesoContactoSchema = v.object({
	id: idSchema,
	idCertificacion: idSchema,
	idProfesionista: idSchema,
	idEmpleador: idSchema,
	idCalificacion: v.nullable(idSchema),
	fechaInicio: dateSchema,
	fechaFin: v.nullable(dateSchema),
	contacto: dataContactoSchema
});
export type ProcesoContacto = v.InferOutput<typeof procesoContactoSchema>;

export type Compra = {
	id: string;
	idEmpleador: string;
	idsProcesosContacto: string[];
	fecha: Date;
	monto: number;
	promocion?: string | null;
	precio: PrecioCertificacion;
	status: 'en proceso' | 'completado' | 'rechazado';
};

export const precioCertificacionSchema = v.object({
	unidad: positiveNumberSchema,
	decena: positiveNumberSchema,
	centena: positiveNumberSchema
});

export type PrecioCertificacion = v.InferOutput<typeof precioCertificacionSchema>;

export const formaPagoSchema = v.object({
	tarjeta: v.string(),
	cvc: v.string(),
	verificado: v.boolean()
});

export type FormaPago = v.InferOutput<typeof formaPagoSchema>;

export const empleadorSchema = v.object({
	id: idSchema,
	correo: emailSchema,
	razonSocial: v.string(),
	giro: v.string(),
	fechaEstablecimiento: dateSchema,
	verificado: v.boolean(),
	precioCertificacion: v.optional(v.nullable(precioCertificacionSchema)),
	formaPago: v.optional(v.nullable(formaPagoSchema))
});

export type Empleador = v.InferOutput<typeof empleadorSchema>;

const tipoCalificacionSchema = v.union([
	v.literal('estrella-5'),
	v.literal('ponderacion-5'),
	v.literal('ponderacion-10')
]);

export type TipoCalificacion = v.InferOutput<typeof tipoCalificacionSchema>;

const calificacionSchema = v.object({
	id: idSchema,
	tipo: tipoCalificacionSchema,
	valor: positiveNumberSchema
});
export type Calificacion = v.InferOutput<typeof calificacionSchema>;

export const calificacionProcesoSchema = v.object({
	id: idSchema,
	idProceso: v.string(),
	empleador: v.nullable(calificacionSchema),
	profesionista: v.nullable(calificacionSchema)
});
export type CalificacionProceso = v.InferOutput<typeof calificacionProcesoSchema>;
