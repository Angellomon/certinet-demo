import type { BreadcrumbsData } from './entities';

export class BreadcrumbsState {
	#value: BreadcrumbsData = $state([]);

	constructor(data: BreadcrumbsData) {
		this.#value = data;
	}

	pushBreadcrumbs(...data: BreadcrumbsData) {
		this.#value.push(...data);
	}

	popBreadcrumbs(...data: BreadcrumbsData) {
		for (let _ of data) {
			this.#value.pop();
		}
	}

	public get value() {
		return this.#value;
	}
}

export function newBreadcrumbsState(data?: BreadcrumbsData) {
	if (!data) return new BreadcrumbsState([]);

	return new BreadcrumbsState(data);
}
