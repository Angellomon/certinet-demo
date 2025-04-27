<script lang="ts">
	import { Funnel, MagnifyingGlass, X } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		searchTerm?: string;
		placeholder?: string;
		filters?: Snippet;
		showFiltersSelect?: boolean;
		onSearch: (searchTerm: string) => void;
	}

	let {
		searchTerm = $bindable(''),
		onSearch,
		filters,
		showFiltersSelect = $bindable(false),
		placeholder = 'Buscar...'
	}: Props = $props();

	function toggleFilterList() {
		showFiltersSelect = !showFiltersSelect;
	}

	function handleSearch() {
		onSearch(searchTerm);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === 'Enter') handleSearch();
	}
</script>

<div class="relative w-full">
	<div class="join w-full">
		{#if filters}
			<div class="indicator">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<div
					class="tooltip tooltip-right"
					data-tip={showFiltersSelect ? 'Cerrar Filtros' : 'Abrir Filtros'}
				>
					<button class="btn join-item" onclick={toggleFilterList}>
						Filtros
						{#if showFiltersSelect}
							<X class="size-5" />
						{:else}
							<Funnel class="size-5" />
						{/if}
					</button>
				</div>
			</div>

			<div class="indicator">
				{#if showFiltersSelect}
					<div class="join-item absolute top-10 left-0 z-10 w-full sm:m-auto">
						{@render filters()}
					</div>
				{/if}
			</div>
		{/if}

		<label class="input w-full">
			<input
				class="w-full"
				bind:value={searchTerm}
				{placeholder}
				type="search"
				required
				onkeydown={handleKeyDown}
			/>
		</label>

		<buttton
			role="button"
			tabindex="0"
			class="btn btn-neutral"
			onkeydown={handleKeyDown}
			onclick={handleSearch}
		>
			Buscar
			<MagnifyingGlass class="size-5" />
		</buttton>
	</div>
</div>
