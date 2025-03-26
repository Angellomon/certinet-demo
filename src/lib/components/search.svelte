<script lang="ts">
	import type { Filter, FilterType } from '$lib/search.svelte';
	import CrossSvg from './cross-svg.svelte';
	import FilterSvg from './filter-svg.svelte';
	import FiltersSelect from './filters-select.svelte';
	import SearchSvg from './search-svg.svelte';

	let {
		searchTerm = $bindable(''),
		onsearch = () => {},
		filters = $bindable([])
	}: {
		searchTerm: string;
		onsearch?: () => void;
		filters: Filter[];
	} = $props();

	let showFiltersList = $state(false);

	function toggleFilterList() {
		showFiltersList = !showFiltersList;
	}

	function handleFilterSelect(filter: Filter) {
		filters.push(filter);

		showFiltersList = false;
	}
</script>

<div class="relative">
	<div class="join">
		<label class="input">
			<SearchSvg />
			<input
				type="search"
				class="grow"
				placeholder="Buscar Certificaciones..."
				bind:value={searchTerm}
			/>
			<!-- <kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd> -->
		</label>

		<div class="indicator">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<div class="tooltip" data-tip={showFiltersList ? 'Cerrar Filtros' : 'Abrir Filtros'}>
				<button class="btn join-item" onclick={toggleFilterList}>
					{#if showFiltersList}
						<CrossSvg />
					{:else}
						<FilterSvg />
					{/if}
				</button>
			</div>
		</div>

		<div class="indicator">
			{#if showFiltersList}
				<div class="join-item fixed right-10 z-10 mt-12 sm:right-auto sm:m-auto sm:mr-5">
					<FiltersSelect onSelect={handleFilterSelect} />
				</div>
			{:else}
				<!-- <span class="indicator-item badge badge-secondary">new</span> -->
				<button onclick={onsearch} class="btn join-item">Buscar</button>
			{/if}
		</div>
	</div>
</div>
