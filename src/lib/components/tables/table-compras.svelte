<script lang="ts">
	import {
		getCalificacionesProcesoContext,
		getCertificacionesContext,
		getComprasContext,
		getEmpleadoresContext,
		getIndexComprasContext,
		getProcesosContext,
		getProfesionistasContext
	} from '$lib/context.svelte';
	import type { Compras, StatusCompra } from '$lib/entities';
	import { ArrowSquareOut, Hash } from 'phosphor-svelte';
	import SearchInput from '../search.svelte';
	import FiltersList from '../filters/filters-list.svelte';
	import {
		DateAfterFilter,
		DateBeforeFilter,
		DateEqualFilter,
		EqualFilter,
		LessThanFilter,
		MoreThanFilter,
		SingleTagSelectFilter,
		StatusFilter,
		type Filter
	} from '$lib/filters.svelte';
	import { buildMap } from '$lib/utils';
	import FiltersAdminCompras from '../filters/filters-admin-compras.svelte';
	import { formatISO } from 'date-fns';

	interface Props {
		limit?: number;
		baseURL?: string;
		showSearch?: boolean;
	}

	const { limit, showSearch = false, baseURL }: Props = $props();

	const indexCompras = getIndexComprasContext();
	const empleadoresStore = getEmpleadoresContext();
	const comprasStore = getComprasContext();

	let searchIds: string[] = $state([]);
	let filteredIds: string[] = $state([]);
	let searchTerm = $state('');
	let filtersList: Filter[] = $state([]);

	let noResults = $derived(
		searchIds.length === 0 &&
			filteredIds.length === 0 &&
			(filtersList.length > 0 || searchTerm.length > 0)
	);

	let showFiltersSelect = $state(false);

	$effect(() => {
		if (searchTerm.length <= 2) {
			searchIds = [];
		}
	});

	$effect(() => {
		if (filtersList.length === 0) filteredIds = [];
	});

	const mapEmpleadores = buildMap(empleadoresStore.value);

	function formatDate(date: Date) {
		return formatISO(date, {
			representation: 'date'
		});
	}
	function formatMonto(monto: number) {
		return monto.toFixed(2);
	}

	function handleSearch(searchTerm: string) {
		if (!searchTerm) {
			searchIds = [];
			handleApplyFilters();

			return;
		}

		const results = indexCompras.search(searchTerm);

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
			// if (filter instanceof BooleanFilter) {
			// 	ids = ids.concat(
			// 		...filter.filterIds(procesos.value.map((p) => ({ id: p.id, value: p.verificado })))
			// 	);
			// }

			if (
				filter instanceof LessThanFilter ||
				filter instanceof MoreThanFilter ||
				filter instanceof EqualFilter
			) {
				ids = ids.concat(
					...filter.filterIds(resultados.map((c) => ({ id: c.id, value: c.monto })))
				);
			} else if (
				filter instanceof DateAfterFilter ||
				filter instanceof DateBeforeFilter ||
				filter instanceof DateEqualFilter
			) {
				ids = ids.concat(
					...filter.filterIds(resultados.map((p) => ({ id: p.id, value: p.fecha })))
				);
			} else if (filter instanceof StatusFilter) {
				ids = ids.concat(
					...filter.filterIds(resultados.map((p) => ({ id: p.id, value: p.status })))
				);
			} else if (filter instanceof SingleTagSelectFilter) {
				ids = ids.concat(
					...filter.filterIds(resultados.map((p) => ({ id: p.id, value: p.status })))
				);
			}
		}

		filteredIds = Array.from(new Set(ids));
	}

	function handleRemoveFilter() {
		handleSearch(searchTerm);
		handleApplyFilters();
	}

	function filterCompras(): Compras {
		if (searchIds.length === 0 && filteredIds.length === 0)
			return limit ? comprasStore.value.slice(limit) : comprasStore.value;

		let comprasSearch: Compras | undefined = undefined;
		let comprasFilters: Compras | undefined = undefined;

		if (searchIds.length > 0)
			comprasSearch = comprasStore.value.filter((p) => searchIds.includes(p.id));

		if (filteredIds.length > 0)
			comprasFilters = comprasStore.value.filter((p) => filteredIds.includes(p.id));

		if (!comprasSearch && !comprasFilters) {
			return [];
		}

		const searchIdsCompras = new Set(comprasSearch ? comprasSearch.map((p) => p.id) : []);
		const filteredIdsCompras = new Set(comprasFilters ? comprasFilters.map((p) => p.id) : []);

		let resultIds: string[];

		if (filteredIdsCompras.size > 0 && searchIdsCompras.size > 0) {
			resultIds = Array.from(searchIdsCompras.intersection(filteredIdsCompras));
		} else if (filteredIdsCompras.size > 0) {
			resultIds = Array.from(filteredIdsCompras);
		} else if (searchIdsCompras.size > 0) {
			resultIds = Array.from(searchIdsCompras);
		} else {
			resultIds = [];
		}

		const resultCompras = comprasStore.value.filter((c) => resultIds.includes(c.id));

		return limit ? resultCompras.slice(limit) : resultCompras;
	}

	let resultados: Compras = $derived.by(filterCompras);
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

{#snippet statusCompra(status: StatusCompra)}
	{#if status === 'completado'}
		<div class="badge badge-success">{status}</div>
	{:else if status === 'en proceso'}
		<div class="badge badge-warning">{status}</div>
	{:else}
		<div class="badge badge-error">{status}</div>
	{/if}
{/snippet}

{#snippet header()}
	<thead>
		<tr>
			<th><Hash class="size-5" /></th>
			<th>Id</th>
			<th>Empelador</th>
			<th>Ids Procesos</th>
			<th>Fecha</th>
			<th>Monto</th>
			<th>Estatus</th>
		</tr>
	</thead>
{/snippet}

{#snippet body()}
	<tbody>
		{#each resultados as compra, i}
			{@const empelador = mapEmpleadores[compra.idEmpleador]}
			{@const idsProcesos = compra.idsProcesosContacto}

			<tr class="hover:bg-base-300">
				<th>
					{#if baseURL}
						<a href={`${baseURL}/${compra.id}`}>
							<div class="join items-center gap-2">
								{i + 1}
								<ArrowSquareOut class="size-5" />
							</div>
						</a>
					{:else}
						<div class="join items-center gap-2">
							{i + 1}
							<!-- <NotePencil class="size-5" /> -->
						</div>
					{/if}
				</th>
				<td>
					<div class="badge badge-neutral tooltip break-keep" data-tip="Id Compra">
						{compra.id}
					</div>
				</td>
				<td>{empelador.razonSocial}</td>
				<td>
					<div class="flex flex-wrap items-center gap-2">
						{#each idsProcesos as idProceso}
							<div class="badge badge-info tooltip break-keep" data-tip="Id Proceso">
								{idProceso}
							</div>
						{/each}
					</div>
				</td>
				<td>{formatDate(compra.fecha)}</td>
				<td>{formatMonto(compra.monto)}</td>
				<td>
					{@render statusCompra(compra.status)}
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
				<FiltersAdminCompras onClose={hideFilters} onSelect={handleFilterSelect} />
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
