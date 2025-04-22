import { breadcrumbsDataSchema, type BreadcrumbsData } from './entities';
import { parse } from 'valibot';

export class Store<T> {
	value = $state<T>() as T;
	#schema: any | null = null;

	constructor(value: T, schema: any = null) {
		this.#schema = schema;
		this.value = value;
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
