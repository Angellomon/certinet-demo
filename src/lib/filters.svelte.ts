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
}

export class LocationFilter extends Filter {
	type: LocationFilterType;
	value: string = $state('');

	constructor(name: string, value: string) {
		super('location', value, name);
		this.type = 'location';
		this.value = value;
	}

	isValid() {
		if (typeof this.value !== 'string') return false;

		return true;
	}
}

export class TagFilter extends Filter {
	value: string[];

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
}

export class BooleanFilter extends Filter {
	value: boolean = $state() as boolean;

	constructor(name: string, value: boolean) {
		super('statusboolean', name, value);

		this.id = generateId();
	}

	isValid() {
		return typeof this.value === 'boolean';
	}
}
