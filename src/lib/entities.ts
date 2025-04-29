import * as v from 'valibot';

export const idSchema = v.string();
export type ID = v.InferOutput<typeof idSchema>;

export interface Identificable {
	id: ID;
}

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

export const certificacionesSchema = v.array(certificacionSchema);
export type Certificaciones = v.InferOutput<typeof certificacionesSchema>;

export const dataCurriculum = v.object({
	nombre: v.string(),
	empresa: v.nullable(v.string()),
	fechaInicio: dateSchema,
	fechaFin: v.nullable(dateSchema),
	descripcion: v.string(),
	tech: v.fallback(v.array(v.string()), [])
});

export type Curriculum = v.InferOutput<typeof dataCurriculum>;

export const curriculumProfesionistaSchema = v.object({
	laboral: v.fallback(v.array(dataCurriculum), []),
	proyectos: v.fallback(v.array(dataCurriculum), [])
});

export const profesionistaSchema = v.object({
	id: idSchema,
	correo: emailSchema,
	nombre: v.string(),
	apellidos: v.string(),
	fechaNacimeinto: dateSchema,
	profesion: v.string(),
	verificado: v.boolean(),
	trayectoria: v.fallback(curriculumProfesionistaSchema, { laboral: [], proyectos: [] })
});
export type Profesionista = v.InferOutput<typeof profesionistaSchema>;

export const profesionistasSchema = v.array(profesionistaSchema);
export type Profesionistas = v.InferOutput<typeof profesionistasSchema>;

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

export const procesosContactoSchema = v.array(procesoContactoSchema);
export type ProcesosContacto = v.InferOutput<typeof procesosContactoSchema>;

export const precioCertificacionSchema = v.object({
	unidad: positiveNumberSchema,
	decena: positiveNumberSchema,
	centena: positiveNumberSchema
});

export type PrecioCertificacion = v.InferOutput<typeof precioCertificacionSchema>;

export const compraSchema = v.object({
	id: idSchema,
	idEmpleador: idSchema,
	idsProcesosContacto: v.array(idSchema),
	fecha: dateSchema,
	monto: positiveNumberSchema,
	promocion: v.optional(v.nullable(v.string())),
	precio: precioCertificacionSchema,
	status: v.union([v.literal('en proceso'), v.literal('completado'), v.literal('rechazado')])
});

export type Compra = v.InferOutput<typeof compraSchema>;

export const comprasSchema = v.array(compraSchema);
export type Compras = v.InferOutput<typeof comprasSchema>;

export const formaPagoSchema = v.object({
	nombreTitular: v.fallback(v.string(), ''),
	tarjeta: v.string(),
	cvc: v.string(),
	verificado: v.boolean(),
	mes: v.fallback(v.number(), 1),
	año: v.fallback(v.number(), 2025)
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

export const empleadoresSchema = v.array(empleadorSchema);

export type Empleadores = v.InferOutput<typeof empleadoresSchema>;

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

export const calificacionesProcesoSchema = v.array(calificacionProcesoSchema);

export type CalificacionesProceso = v.InferOutput<typeof calificacionesProcesoSchema>;

export const themeSchema = v.union([v.literal('dark'), v.literal('light')]);
export type Theme = v.InferOutput<typeof themeSchema>;

export const entities = v.union([
	v.literal('profesionistas'),
	v.literal('empleadores'),
	v.literal('admins')
]);

export const adminSchema = v.object({
	id: idSchema,
	nombre: v.string(),
	correo: emailSchema
});
export type Admin = v.InferOutput<typeof adminSchema>;

export const adminsSchema = v.array(adminSchema);
export type Admins = v.InferOutput<typeof adminsSchema>;

export const seccionAdminSchema = v.union([
	v.literal('dashboard'),
	v.literal('profesionistas'),
	v.literal('empleadores'),
	v.literal('certificaciones'),
	v.literal('procesos'),
	v.literal('compras'),
	v.literal('config')
]);
export type SeccionAdmin = v.InferOutput<typeof seccionAdminSchema>;

export const seccionAdminConfigSchema = v.union([v.literal('datos'), v.literal('avanzado')]);
export type SeccionAdminConfig = v.InferOutput<typeof seccionAdminConfigSchema>;

export const seccionAdminProfesionistasSchema = v.union([
	v.literal('dashboard'),
	v.literal('verificacion'),
	v.literal('listado')
]);
export type SeccionAdminProfesionistas = v.InferOutput<typeof seccionAdminProfesionistasSchema>;

export const seccionAdminProfesionistaSchema = v.union([
	v.literal('datos'),
	v.literal('certificaciones'),
	v.literal('verificacion')
]);
export type SeccionAdminProfesionista = v.InferOutput<typeof seccionAdminProfesionistaSchema>;

export const seccionAdminEmpleador = v.union([
	v.literal('datos'),
	v.literal('compras'),
	v.literal('verificacion')
]);
export type SeccionAdminEmpleador = v.InferOutput<typeof seccionAdminEmpleador>;

export const breadcrumbDataSchema = v.object({
	title: v.string(),
	url: v.optional(v.string()),
	icon: v.optional(v.string())
});

export type BeadrcrumbData = v.InferOutput<typeof breadcrumbDataSchema>;

export const breadcrumbsDataSchema = v.array(breadcrumbDataSchema);
export type BreadcrumbsData = v.InferOutput<typeof breadcrumbsDataSchema>;
