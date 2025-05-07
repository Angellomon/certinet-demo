import { browser } from '$app/environment';
import { parse } from 'valibot';
import {
	DEFAULT_SECCION_ADMIN_CERTIFICACION_STORE,
	DEFAULT_SECCION_ADMIN_CONFIG_STORE,
	DEFAULT_SECCION_ADMIN_EMPLEADOR_STORE,
	DEFAULT_SECCION_ADMIN_PROCESO_STOER,
	DEFAULT_SECCION_ADMIN_PROFESIONISTA_STORE,
	DEFAULT_SECCION_ADMIN_PROFESIONISTAS_STORE,
	DEFAULT_SECCION_ADMIN_STORE,
	EMPLEADOR_DEMO_ID,
	getDefaultAdmins,
	getDemoCalificacionesProceso,
	getDemoCertificaciones,
	getDemoCompras,
	getDemoEmpleador,
	getDemoEmpleadores,
	getDemoProcesosContacto,
	getDemoProfesionista,
	getDemoProfesionistas,
	PROFESIONISTA_DEMO_ID
} from './demo-data';
import {
	adminsSchema,
	calificacionesProcesoSchema,
	certificacionesSchema,
	comprasSchema,
	empleadoresSchema,
	empleadorSchema,
	idSchema,
	procesosContactoSchema,
	profesionistaSchema,
	profesionistasSchema,
	seccionAdminCertificacion,
	seccionAdminConfigSchema,
	seccionAdminEmpleador,
	seccionAdminProceso,
	seccionAdminProfesionistaSchema,
	seccionAdminProfesionistasSchema,
	seccionAdminSchema,
	themeSchema
} from './entities';

export class LocalObjectStore<T> {
	value = $state<T>() as T;
	#key = '';
	#schema: any | null;

	constructor(key: string, value: T, schema: any = null) {
		this.#key = key;
		this.#schema = schema;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.#key, this.serialize(this.value));
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		const rawData = JSON.parse(item);
		if (this.#schema) return parse(this.#schema, rawData);
		else return rawData;
	}
}

export function newLocalStore<T>(key: string, value: T, schema: any) {
	return new LocalObjectStore(key, value, schema);
}

export function newCurrentEmpleadorStore() {
	const demoData = getDemoEmpleador();

	return newLocalStore('empleador', demoData, empleadorSchema);
}

export function newCertificacionesStore() {
	const demoData = getDemoCertificaciones();

	return newLocalStore('certificaciones', demoData, certificacionesSchema);
}

export function newProcesosContactoStore() {
	const demoData = getDemoProcesosContacto();

	return newLocalStore('procesos-contacto', demoData, procesosContactoSchema);
}

export function newProfesionistasStore() {
	const demoData = getDemoProfesionistas();

	return newLocalStore('profesionistas', demoData, profesionistasSchema);
}

export function newComprasStore() {
	const demoData = getDemoCompras();

	return newLocalStore('compras', demoData, comprasSchema);
}

export function newCalificacionesProcesoStore() {
	const demoData = getDemoCalificacionesProceso();

	return newLocalStore('calificaciones-proceso', demoData, calificacionesProcesoSchema);
}

export function newCurrentProfesionistaStore() {
	const demoData = getDemoProfesionista();

	return newLocalStore('profesionista', demoData, profesionistaSchema);
}

export function newEmpleadoresStore() {
	const demoData = getDemoEmpleadores();

	return newLocalStore('empleadores', demoData, empleadoresSchema);
}

export function newThemeStore() {
	const defaultData = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	return newLocalStore('theme', defaultData, themeSchema);
}

export function newIdEmpleadorStore() {
	const defaultData = EMPLEADOR_DEMO_ID;
	return newLocalStore('id-empleador', defaultData, idSchema);
}

export function newIdProfesionistaStore() {
	const defaultData = PROFESIONISTA_DEMO_ID;
	return newLocalStore('id-profesionista', defaultData, idSchema);
}

export function newAdminsStore() {
	const defaultData = getDefaultAdmins();
	return newLocalStore('admins', defaultData, adminsSchema);
}

export function newSeccionAdminStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_STORE;
	return newLocalStore('seccion-admin', defaultData, seccionAdminSchema);
}

export function newSeccionAdminConfigStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_CONFIG_STORE;
	return newLocalStore('seccion-config-admin', defaultData, seccionAdminConfigSchema);
}

export function newSeccionAdminProfesionistasStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_PROFESIONISTAS_STORE;
	return newLocalStore(
		'seccion-admin-profesionistas',
		defaultData,
		seccionAdminProfesionistasSchema
	);
}

export function newSeccionAdminProfesionistaStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_PROFESIONISTA_STORE;
	return newLocalStore('seccion-admin-profesionista', defaultData, seccionAdminProfesionistaSchema);
}

export function newSeccionAdminEmpeladorStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_EMPLEADOR_STORE;
	return newLocalStore('seccion-admin-empleador', defaultData, seccionAdminEmpleador);
}

export function newSeccionAdminCertificacionStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_CERTIFICACION_STORE;
	return newLocalStore('seccion-admin-certificacion', defaultData, seccionAdminCertificacion);
}

export function newSeccionAdminProcesoStore() {
	const defaultData = DEFAULT_SECCION_ADMIN_PROCESO_STOER;
	return newLocalStore('seccion-admin-proceso', defaultData, seccionAdminProceso);
}
