import { browser } from '$app/environment';
import { parse } from 'valibot';
import {
	getDemoCalificacionesProceso,
	getDemoCertificaciones,
	getDemoCompras,
	getDemoEmpleador,
	getDemoEmpleadores,
	getDemoProcesosContacto,
	getDemoProfesionista,
	getDemoProfesionistas
} from './demo-data';
import {
	calificacionesProcesoSchema,
	certificacionesSchema,
	comprasSchema,
	empleadoresSchema,
	empleadorSchema,
	procesosContactoSchema,
	profesionistaSchema,
	profesionistasSchema,
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
