import { Index } from 'flexsearch';

export abstract class SearchIndex<T> {
	protected index: Index;

	constructor() {
		this.index = new Index({ tokenize: 'forward' });
	}

	abstract addToIndex(...data: T[]): void;
	abstract search(searchTerm: string): string[];
	abstract updateIndex(data: T): void;
	abstract removeFromIndex(id: string): void;

	escapeRegExp(text: string) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}
}
