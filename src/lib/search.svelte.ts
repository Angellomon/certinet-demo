import { generateId } from './demo-data';

type LocationFilterType = 'location';
type YearsOfExperienceFilterType = 'yearsofexperience';
type NumberOfProjectsFilterType = 'numberofprojects';
type TagFilterType = 'tag';

export type FilterType =
	| LocationFilterType
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| TagFilterType;

export const FilterNameMap: Record<FilterType, string> = {
	location: 'Ubicación',
	numberofprojects: '# de Proyectos',
	tag: 'Etiqueta',
	yearsofexperience: 'Años de Experiencia'
};
export interface Filter {
	id: string;
	type: FilterType;
	value: number | string | [number, number] | string[];
	isValid: () => boolean;
}

export class LessThanFilter implements Filter {
	id: string;
	type: YearsOfExperienceFilterType | NumberOfProjectsFilterType;
	value: number = $state(0);
	// value: number = $state(0)

	constructor(type: YearsOfExperienceFilterType | NumberOfProjectsFilterType, value: number) {
		this.type = type;
		this.value = value;
		this.id = generateId();
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

export class MoreThanFilter implements Filter {
	id: string;
	type: YearsOfExperienceFilterType | NumberOfProjectsFilterType;
	value: number = $state(0);

	constructor(type: YearsOfExperienceFilterType | NumberOfProjectsFilterType, value: number) {
		this.type = type;
		this.value = value;
		this.id = generateId();
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

export class EqualFilter implements Filter {
	id: string;
	type: YearsOfExperienceFilterType | NumberOfProjectsFilterType;
	value: number = $state(0);

	constructor(type: YearsOfExperienceFilterType | NumberOfProjectsFilterType, value: number) {
		this.type = type;
		this.value = value;
		this.id = generateId();
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

export class RangeFilter implements Filter {
	id: string;
	type: YearsOfExperienceFilterType | NumberOfProjectsFilterType;
	value: [number, number] = $state([0, 0]);

	constructor(
		type: YearsOfExperienceFilterType | NumberOfProjectsFilterType,
		value: [number, number]
	) {
		this.type = type;
		this.value = value;
		this.id = generateId();
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

export class LocationFilter implements Filter {
	id: string;
	type: LocationFilterType;
	value: string = $state('');

	constructor(value: string) {
		this.type = 'location';
		this.value = value;
		this.id = generateId();
	}

	isValid() {
		if (typeof this.value !== 'string') return false;

		return true;
	}
}

export class TagFilter implements Filter {
	id: string;
	type: TagFilterType;
	value: string[];

	constructor(value: string | string[]) {
		let val;
		if (typeof value === 'string') val = [value];
		else val = value;

		this.type = 'tag';
		this.value = val;
		this.id = generateId();
	}

	isValid() {
		if (this.value.length === 0) return false;

		return true;
	}
}
