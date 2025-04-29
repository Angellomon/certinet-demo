<script lang="ts">
	import {
		getCalificacionesProcesoContext,
		getCertificacionesContext,
		getEmpleadoresContext,
		getIndexEmpleadoresContext,
		getIndexProcesosContext,
		getProcesosContext,
		getProfesionistasContext
	} from '$lib/context.svelte';
	import type { Empleadores, ProcesosContacto } from '$lib/entities';
	import { ArrowSquareOut, Hash, NotePencil, X } from 'phosphor-svelte';
	import SearchInput from '../search.svelte';
	import FiltersAdminProfesionistas from '../filters/filters-admin-profesionistas.svelte';
	import FiltersList from '../filters/filters-list.svelte';
	import { BooleanFilter, type Filter } from '$lib/filters.svelte';
	import { buildMap } from '$lib/utils';
	import InputRate from '../inputs/input-rate.svelte';

	interface Props {
		limit?: number;
		baseURL?: string;
		showSearch?: boolean;
	}

	const { limit, showSearch = false, baseURL }: Props = $props();

	const indexProcesosContacto = getIndexProcesosContext();
	const procesos = getProcesosContext();
	const certificacionesStore = getCertificacionesContext();
	const profesionistasStore = getProfesionistasContext();
	const empleadoresStore = getEmpleadoresContext();
	const calificacionesStore = getCalificacionesProcesoContext();

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

	const mapCertificaciones = buildMap(certificacionesStore.value);
	const mapProfesionistas = buildMap(profesionistasStore.value);
	const mapEmpleadores = buildMap(empleadoresStore.value);
	const mapCalificaciones = buildMap(calificacionesStore.value);

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

		const results = indexProcesosContacto.search(searchTerm);

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
		}

		filteredIds = Array.from(new Set(ids));
	}

	function handleRemoveFilter() {
		handleSearch(searchTerm);
		handleApplyFilters();
	}

	function filterProcesosContacto(): ProcesosContacto {
		if (searchIds.length === 0 && filteredIds.length === 0)
			return limit ? procesos.value.slice(limit) : procesos.value;

		let empleadoresSearch: ProcesosContacto | undefined = undefined;
		let empleadoresFilters: ProcesosContacto | undefined = undefined;

		if (searchIds.length > 0)
			empleadoresSearch = procesos.value.filter((p) => searchIds.includes(p.id));

		if (filteredIds.length > 0)
			empleadoresFilters = procesos.value.filter((p) => filteredIds.includes(p.id));

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
			resultIds = [];
		}

		const resultEmpleadores = procesos.value.filter((p) => resultIds.includes(p.id));

		return limit ? resultEmpleadores.slice(limit) : resultEmpleadores;
	}

	let resultados = $derived.by(filterProcesosContacto);
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
			<th>Id</th>
			<th>Profesionista</th>
			<th>Empelador</th>
			<th>Certificación</th>
			<th>Fecha Inicio</th>
			<th>Fecha Fin</th>
			<th>Tipo Contacto</th>
			<th>Calificación Profesionista</th>
			<th>Calificación Empleador</th>
		</tr>
	</thead>
{/snippet}

{#snippet body()}
	<tbody>
		{#each resultados as proceso, i}
			{@const profesionista = mapProfesionistas[proceso.idProfesionista]}
			{@const empelador = mapEmpleadores[proceso.idEmpleador]}
			{@const certificacion = mapCertificaciones[proceso.idCertificacion]}
			{@const calificacion = proceso.idCalificacion
				? mapCalificaciones[proceso.idCalificacion]
				: null}

			<tr class="hover:bg-base-300">
				<th>
					{#if baseURL}
						<a href={`${baseURL}/${proceso.id}`}>
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
				<td>
					<div class="badge badge-neutral tooltip break-keep" data-tip="Id Proceso">
						{proceso.id}
					</div>
				</td>
				<td>{`${profesionista.nombre} ${profesionista.apellidos}`}</td>
				<td>{empelador.razonSocial}</td>
				<td>{certificacion.nombre}</td>
				<td>{proceso.fechaInicio.toISOString().slice(0, 10)}</td>
				<td>{proceso.fechaFin ? proceso.fechaFin.toISOString().slice(0, 10) : '-'}</td>
				<td>{proceso.contacto.tipo}</td>
				<td>
					{#if calificacion && calificacion.profesionista}
						<InputRate
							disableInput
							color="profesionista"
							value={calificacion.profesionista.valor}
						/>
					{:else}
						-
					{/if}
				</td>
				<td>
					{#if calificacion && calificacion.empleador}
						<InputRate disableInput color="empleador" value={calificacion.empleador.valor} />
					{:else}
						-
					{/if}
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
			<!-- {#snippet filters()}
				<FiltersAdminProfesionistas onClose={hideFilters} onSelect={handleFilterSelect} />
			{/snippet} -->
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
