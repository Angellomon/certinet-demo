import { generateId } from './demo-data';
import {
	isEqual as isDateEqual,
	isAfter as isDateAfter,
	isBefore as isDateBefore,
	isValid as isDateValid
} from 'date-fns';

type LocationFilterType = 'location';
type YearsOfExperienceFilterType = 'yearsofexperience';
type NumberOfProjectsFilterType = 'numberofprojects';
type TagFilterType = 'tag';
type StatusBooleanFilterType = 'status-boolean';
type RateProfesionistaBooleanFilterType = 'rate-profesionista-boolean';
type RateEmpleadorBooleanFilterType = 'rate-empleador-boolean';
type DateFechaInicioFilterType = 'fecha-inicio';
type DateFechaFinFilterType = 'fecha-fin';
type DateRangeFilterType = 'date-range';
type RateFilterType = 'rate';
type RateProfesionistaFilterType = 'rate-profesionista';
type RateEmpleadorFilterType = 'rate-empleador';
type MontoFilterType = 'monto';
type StatusCompraFilterType = 'status-compra-boolean';

export type FilterType =
	| LocationFilterType
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| TagFilterType
	| StatusBooleanFilterType
	| DateFilterType
	| DateFechaInicioFilterType
	| DateFechaFinFilterType
	| DateRangeFilterType
	| RateFilterType
	| RateProfesionistaFilterType
	| RateEmpleadorFilterType
	| MontoFilterType
	| StatusCompraFilterType
	| RateEmpleadorBooleanFilterType
	| RateProfesionistaBooleanFilterType;

type DateRange = [Date, Date];

export abstract class Filter {
	id: string;
	type: FilterType;
	name: string;
	value: number | string | [number, number] | string[] | boolean | Date | DateRange;

	abstract isValid(): boolean;
	abstract filterIds(ids: { id: string; value: any }[]): string[];

	constructor(type: FilterType, name: string, value: any) {
		this.id = generateId();
		this.type = type;
		this.name = name;
		this.value = value;
	}
}

type LessThanFilterType =
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| RateEmpleadorFilterType
	| RateFilterType
	| RateProfesionistaFilterType
	| MontoFilterType;

export class LessThanFilter extends Filter {
	value: number = $state(0);

	constructor(type: LessThanFilterType, name: string, value: number) {
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

type MoreThanFilterType =
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| RateFilterType
	| RateEmpleadorFilterType
	| RateProfesionistaFilterType
	| MontoFilterType;

export class MoreThanFilter extends Filter {
	value: number = $state(0);

	constructor(type: MoreThanFilterType, name: string, value: number) {
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

type EqualFilterType =
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| RateFilterType
	| RateEmpleadorFilterType
	| RateProfesionistaFilterType
	| MontoFilterType;

export class EqualFilter extends Filter {
	value: number = $state(0);

	constructor(type: EqualFilterType, name: string, value: number) {
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

type RangeFilterType =
	| YearsOfExperienceFilterType
	| NumberOfProjectsFilterType
	| RateFilterType
	| RateEmpleadorFilterType
	| RateProfesionistaFilterType
	| MontoFilterType;

export class RangeFilter extends Filter {
	value: [number, number] = $state([0, 0]);

	constructor(type: RangeFilterType, name: string, value: [number, number]) {
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

type BooleanFilterType =
	| StatusBooleanFilterType
	| StatusCompraFilterType
	| RateEmpleadorBooleanFilterType
	| RateProfesionistaBooleanFilterType;

export class BooleanFilter extends Filter {
	value: boolean = $state(false);

	constructor(type: BooleanFilterType, name: string, value: boolean) {
		super(type, name, value);

		this.value = value;
	}

	isValid() {
		return typeof this.value === 'boolean';
	}

	filterIds(ids: { id: string; value: boolean }[]): string[] {
		return ids.filter((i) => i.value === this.value).map((i) => i.id);
	}
}

type DateFilterType = DateFechaFinFilterType | DateFechaInicioFilterType;

export class DateEqualFilter extends Filter {
	value: Date = $state() as Date;

	constructor(type: DateFilterType, name: string, value: Date) {
		super(type, name, value);

		this.value = value;
	}

	isValid(): boolean {
		return isDateValid(this.value);
	}

	filterIds(ids: { id: string; value: Date }[]): string[] {
		return ids.filter((i) => isDateEqual(i.value, this.value)).map((i) => i.id);
	}
}

export class DateAfterFilter extends Filter {
	value: Date = $state() as Date;

	constructor(type: DateFilterType, name: string, value: Date) {
		super(type, name, value);

		this.value = value;
	}

	isValid(): boolean {
		return isDateValid(this.value);
	}

	filterIds(ids: { id: string; value: any }[]): string[] {
		return ids.filter((i) => isDateAfter(i.value, this.value)).map((i) => i.id);
	}
}

export class DateBeforeFilter extends Filter {
	value: Date = $state() as Date;

	constructor(type: DateFilterType, name: string, value: Date) {
		super(type, name, value);

		this.value = value;
	}

	isValid(): boolean {
		return isDateValid(this.value);
	}

	filterIds(ids: { id: string; value: any }[]): string[] {
		return ids.filter((i) => isDateBefore(i.value, this.value)).map((i) => i.id);
	}
}

export class DateRangeFilter extends Filter {
	value: DateRange = $state() as DateRange;

	constructor(type: DateFilterType, name: string, value: DateRange) {
		super(type, name, value);

		this.value = value;
	}

	isValid(): boolean {
		return isDateValid(this.value);
	}

	filterIds(ids: { id: string; value: any }[]): string[] {
		return ids
			.filter((i) => isDateAfter(i.value, this.value[0]) && isDateBefore(i.value, this.value[1]))
			.map((i) => i.id);
	}
}

type StatusFilterType = StatusCompraFilterType;

export class StatusFilter extends Filter {
	value: string = $state() as string;

	constructor(type: StatusFilterType, name: string, value: string) {
		super(type, name, value);

		this.value = value;
	}

	isValid(): boolean {
		return typeof this.value == 'string';
	}

	filterIds(ids: { id: string; value: any }[]): string[] {
		return ids.filter((i) => i.value === this.value).map((i) => i.id);
	}
}
