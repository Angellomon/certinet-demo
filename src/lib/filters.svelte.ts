import { generateId } from './demo-data';

type LocationFilterType = 'location';
type YearsOfExperienceFilterType = 'yearsofexperience';
type NumberOfProjectsFilterType = 'numberofprojects';
type TagFilterType = 'tag';
type StatusBooleanFilterType = 'statusboolean';

export type FilterType =
	| LocationFilterType
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| TagFilterType
	| StatusBooleanFilterType;

export abstract class Filter {
	id: string;
	type: FilterType;
	name: string;
	value: number | string | [number, number] | string[] | boolean;

	abstract isValid(): boolean;
	abstract filterIds(ids: { id: string; value: any }[]): string[];

	constructor(type: FilterType, name: string, value: any) {
		this.id = generateId();
		this.type = type;
		this.name = name;
		this.value = value;
	}
}

export class LessThanFilter extends Filter {
	value: number = $state(0);

	constructor(
		type: YearsOfExperienceFilterType | NumberOfProjectsFilterType,
		name: string,
		value: number
	) {
		super(type, name, value);

		this.value = value;
	}

	isValid() {
		try {
			+this.value;
		} catch (e) {
			return false;
		}

		return true;
	}

	filterIds(ids: { id: string; value: number }[]): string[] {
		return ids.filter((i) => i.value < this.value).map((i) => i.id);
	}
}

export class MoreThanFilter extends Filter {
	value: number = $state(0);

	constructor(
		type: YearsOfExperienceFilterType | NumberOfProjectsFilterType,
		name: string,
		value: number
	) {
		super(type, name, value);

		this.value = value;
	}

	isValid() {
		try {
			+this.value;
		} catch (e) {
			return false;
		}

		return true;
	}

	filterIds(ids: { id: string; value: number }[]): string[] {
		return ids.filter((i) => i.value > this.value).map((i) => i.id);
	}
}

export class EqualFilter extends Filter {
	value: number = $state(0);

	constructor(
		type: YearsOfExperienceFilterType | NumberOfProjectsFilterType,
		name: string,
		value: number
	) {
		super(type, name, value);
		this.value = value;
	}

	isValid() {
		try {
			+this.value;
		} catch (e) {
			return false;
		}

		return true;
	}

	filterIds(ids: { id: string; value: number }[]): string[] {
		return ids.filter((i) => i.value === this.value).map((i) => i.id);
	}
}

export class RangeFilter extends Filter {
	value: [number, number] = $state([0, 0]);

	constructor(
		type: YearsOfExperienceFilterType | NumberOfProjectsFilterType,
		name: string,
		value: [number, number]
	) {
		super(type, name, value);

		this.value = value;
	}

	isValid() {
		if (this.value.length != 2) return false;

		try {
			+this.value[0];
			+this.value[1];
		} catch (e) {
			return false;
		}

		if (this.value[0] > this.value[1]) return false;

		return true;
	}

	filterIds(ids: { id: string; value: number }[]): string[] {
		return ids.filter((i) => i.value > this.value[0] && i.value < this.value[1]).map((i) => i.id);
	}
}

export class LocationFilter extends Filter {
	value: string = $state('');

	constructor(name: string, value: string) {
		super('location', value, name);

		this.value = value;
	}

	isValid() {
		if (typeof this.value !== 'string') return false;

		return true;
	}

	filterIds(ids: { id: string; value: string }[]): string[] {
		return ids.filter((i) => i.value === this.value).map((i) => i.id);
	}
}

export class TagFilter extends Filter {
	value: string[] = $state([]);

	constructor(name: string, value: string | string[]) {
		let val;
		if (typeof value === 'string') val = [value];
		else val = value;

		super('tag', name, val);

		this.value = val;
	}

	isValid() {
		if (this.value.length === 0) return false;

		return true;
	}

	filterIds(ids: { id: string; value: string }[]): string[] {
		return ids.filter((i) => this.value.includes(i.value)).map((i) => i.id);
	}
}

export class BooleanFilter extends Filter {
	value: boolean = $state(false);

	constructor(name: string, value: boolean) {
		super('statusboolean', name, value);

		this.value = value;
	}

	isValid() {
		return typeof this.value === 'boolean';
	}

	filterIds(ids: { id: string; value: boolean }[]): string[] {
		return ids.filter((i) => i.value === this.value).map((i) => i.id);
	}
}
