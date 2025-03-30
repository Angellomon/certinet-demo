import { browser } from '$app/environment';
import { parse } from 'valibot';
import { getDemoCertificaciones, getDemoEmpleador } from './demo-data';
import { certificacionesSchema, empleadorSchema } from './entities';

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

export function newEmpleadorStore() {
	const demoData = getDemoEmpleador();

	return newLocalStore('empleador', demoData, empleadorSchema);
}

export function newCertificacionesStore() {
	const demoData = getDemoCertificaciones()

	return newLocalStore("certificaciones", demoData, certificacionesSchema) 
}