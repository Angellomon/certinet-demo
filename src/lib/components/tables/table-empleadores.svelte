<script lang="ts">
	import {
		getEmpleadoresContext,
		getIndexEmpleadoresContext,
	} from '$lib/context.svelte';
	import type { Empleadores } from '$lib/entities';
	import { ArrowSquareOut, Hash, NotePencil, X } from 'phosphor-svelte';
	import SearchInput from '../search.svelte';
	import FiltersAdminProfesionistas from '../filters/filters-admin-profesionistas.svelte';
	import FiltersList from '../filters/filters-list.svelte';
	import { BooleanFilter, type Filter } from '$lib/filters.svelte';

	interface Props {
		limit?: number;
		baseURL?: string;
		showSearch?: boolean;
	}

	const { limit, showSearch = false, baseURL }: Props = $props();

	const indexEmpleadores = getIndexEmpleadoresContext();
	const empleadores = getEmpleadoresContext();

	let searchIds: string[] = $state([]);
	let filteredIds: string[] = $state([]);
	let noResults = $state(false);

	let searchTerm = $state('');

	let showFiltersSelect = $state(false);
	let filtersList: Filter[] = $state([]);

	$effect(() => {
		if (searchTerm.length <= 2) {
			searchIds = [];
			noResults = false;
		}
	});

	$effect(() => {
		if (filtersList.length === 0) filteredIds = [];
	});

	function calcDateDiffYears(start: Date, end: Date = new Date()) {
		const startYear = start.getFullYear();
		const startMonth = start.getMonth();
		const startDay = start.getDate();

		const endYear = end.getFullYear();
		const endMonth = end.getMonth();
		const endDay = end.getDate();

		let exp = endYear - startYear;

		if (endMonth < startMonth) exp = exp - 1;

		if (startMonth - 1 == endMonth && endDay < startDay) exp = exp - 1;

		return exp;
	}

	function calcAge(birthday: Date) {
		return calcDateDiffYears(birthday, new Date());
	}

	function handleSearch(searchTerm: string) {
		if (!searchTerm) {
			searchIds = [];
			handleApplyFilters();

			return;
		}

		const results = indexEmpleadores.search(searchTerm);

		searchIds = results;

		handleApplyFilters();
	}

	function hideFilters() {
		showFiltersSelect = false;
	}

	function handleFilterSelect(filter: Filter) {
		hideFilters();
		filtersList.push(filter);
	}

	function handleApplyFilters() {
		let ids: string[] = [];

		for (let filter of filtersList) {
			if (filter instanceof BooleanFilter) {
				ids = ids.concat(
					...filter.filterIds(empleadores.value.map((p) => ({ id: p.id, value: p.verificado })))
				);
			}
		}

		filteredIds = Array.from(new Set(ids));
	}

	function handleRemoveFilter() {
		handleSearch(searchTerm);
		handleApplyFilters();
	}

	function filterEmpleadores(): Empleadores {
		if (searchIds.length === 0 && filteredIds.length === 0)
			return limit ? empleadores.value.slice(limit) : empleadores.value;

		let empleadoresSearch: Empleadores | undefined = undefined;
		let empleadoresFilters: Empleadores | undefined = undefined;

		if (searchIds.length > 0)
			empleadoresSearch = empleadores.value.filter((p) => searchIds.includes(p.id));

		if (filteredIds.length > 0)
			empleadoresFilters = empleadores.value.filter((p) => filteredIds.includes(p.id));

		if (!empleadoresSearch && !empleadoresFilters) {
			return [];
		}

		const searchIdsEmpleadores = new Set(
			empleadoresSearch ? empleadoresSearch.map((p) => p.id) : []
		);
		const filteredIdsEmpleadores = new Set(
			empleadoresFilters ? empleadoresFilters.map((p) => p.id) : []
		);

		let resultIds: string[];

		if (filteredIdsEmpleadores.size > 0 && searchIdsEmpleadores.size > 0) {
			resultIds = Array.from(searchIdsEmpleadores.intersection(filteredIdsEmpleadores));
		} else if (filteredIdsEmpleadores.size > 0) {
			resultIds = Array.from(filteredIdsEmpleadores);
		} else if (searchIdsEmpleadores.size > 0) {
			resultIds = Array.from(searchIdsEmpleadores);
		} else {
			resultIds = Array.from(searchIdsEmpleadores.union(filteredIdsEmpleadores));
		}

		const resultEmpleadores = empleadores.value.filter((p) => resultIds.includes(p.id));

		return limit ? resultEmpleadores.slice(limit) : resultEmpleadores;
	}

	let resultados = $derived.by(filterEmpleadores);
</script>

{#snippet badgeVerificado(verified: boolean)}
	<div class={`badge ${verified ? 'badge-success' : 'badge-warning'}`}>
		{#if verified}
			Verificado
		{:else}
			Pendiente
		{/if}
	</div>
{/snippet}

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

{#snippet header()}
	<thead>
		<tr>
			<th><Hash class="size-5" /></th>
			<th>Razón Social</th>
			<th>Correo</th>
			<th>Giro</th>
			<th>Fecha de Establecimiento</th>
			<th>Estatus Verificación</th>
		</tr>
	</thead>
{/snippet}

{#snippet body()}
	<tbody>
		{#each resultados as empleador, i}
			<tr class="hover:bg-base-300">
				<th>
					{#if baseURL}
						<a href={`${baseURL}/${empleador.id}`}>
							<div class="join items-center gap-2">
								{i + 1}
								<ArrowSquareOut class="size-5" />
							</div>
						</a>
					{:else}
						<div class="join gap-2">
							{i + 1}
							<NotePencil class="h-5" />
						</div>
					{/if}
				</th>
				<td>{empleador.razonSocial}</td>
				<td>
					<a class="link link-accent" href={`mailto:${empleador.correo}`}>
						{empleador.correo}
					</a>
				</td>
				<td>{empleador.giro}</td>
				<td>{empleador.fechaEstablecimiento.toISOString().slice(0, 10)}</td>
				<td class="join items-center gap-2">
					{@render badgeVerificado(empleador.verificado)}
				</td>
			</tr>
		{/each}
	</tbody>
{/snippet}

{#if showSearch}
	<div class="flex justify-center">
		<SearchInput
			placeholder="Buscar por nombre, apellidos, correo, palabras clave..."
			onSearch={handleSearch}
			bind:searchTerm
			bind:showFiltersSelect
		>
			{#snippet filters()}
				<FiltersAdminProfesionistas onClose={hideFilters} onSelect={handleFilterSelect} />
			{/snippet}
		</SearchInput>
	</div>

	<FiltersList
		onRemove={handleRemoveFilter}
		onApply={handleApplyFilters}
		bind:filters={filtersList}
	/>

	{#if noResults}
		<p>Sin resultados...</p>
	{/if}
{/if}

<div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
	<table class="table-xs md:table-sm lg:table-md 2xl:table-lg table">
		{@render header()}

		{@render body()}
	</table>
</div>
