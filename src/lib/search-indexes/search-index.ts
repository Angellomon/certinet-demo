import type { Identificable } from '$lib/entities';
import { Index } from 'flexsearch';

export abstract class SearchIndex<T extends Identificable> {
	protected index: Index;

	constructor() {
		this.index = new Index({ tokenize: 'forward' });
	}

	abstract convert(data: T): string;

	search(searchTerm: string): string[] {
		const text = this.escapeRegExp(searchTerm);
		return this.index.search(text) as any;
	}

	addToIndex(...data: T[]) {
		for (let el of data) {
			const elStr = this.convert(el);
			this.index.add(el.id, elStr);
		}
	}

	updateIndex(data: T) {
		if (this.index.contain(data.id)) this.index.update(data.id, this.convert(data));
		else this.addToIndex(data);
	}

	removeFromIndex(id: string): void {
		if (this.index.contain(id)) this.index.remove(id);
	}

	escapeRegExp(text: string) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}
}
