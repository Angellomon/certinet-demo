<script lang="ts">
	import {
		getCertificacionesContext,
		getIndexCertificacionesContext,
		getProfesionistasContext
	} from '$lib/context.svelte';
	import type { Certificaciones, ID, Profesionista } from '$lib/entities';
	import {
		BooleanFilter,
		EqualFilter,
		LessThanFilter,
		MoreThanFilter,
		type Filter
	} from '$lib/filters.svelte';
	import { ArrowSquareOut, Hash } from 'phosphor-svelte';
	import FiltersCertificaciones from '../filters/filters-certificaciones.svelte';
	import FiltersList from '../filters/filters-list.svelte';
	import Search from '../search.svelte';

	interface Props {
		limit?: number;
		showActions?: boolean;
		showVerifyActions?: boolean;
		idProfesionista?: ID;
		showSearch?: boolean;
		baseURL?: string;
		idsCerts?: string[];
	}

	const {
		limit,
		showActions,
		showVerifyActions,
		idProfesionista,
		idsCerts,
		showSearch = false,
		baseURL
	}: Props = $props();

	let searchIds: string[] = $state([]);
	let filteredIds: string[] = $state([]);
	let showFiltersSelect = $state(false);
	let filtersList: Filter[] = $state([]);
	let searchTerm = $state('');

	let noResults = $derived(
		searchIds.length === 0 &&
			filteredIds.length === 0 &&
			(filtersList.length > 0 || searchTerm.length > 0)
	);

	const indexCertificaciones = getIndexCertificacionesContext();
	const storeCertificaciones = getCertificacionesContext();
	const storeProfesionistas = getProfesionistasContext();

	const mapCertIdsYOE = $derived.by(() => {
		const map: Map<string, number> = new Map();
		const mapIdsProfesionista: Map<string, Profesionista> = new Map();

		for (let cert of storeCertificaciones.value) {
			let profesionista: Profesionista | null | undefined;

			if (map.has(cert.id)) continue;

			if (!mapIdsProfesionista.has(cert.idProfesionista)) {
				profesionista = storeProfesionistas.value.find((p) => p.id === cert.id);
				if (profesionista) mapIdsProfesionista.set(cert.id, profesionista);
				else continue;
			} else {
				profesionista = mapIdsProfesionista.get(cert.idProfesionista);
			}

			let date: Date;

			const firstJob: Date = profesionista?.trayectoria.laboral[0]
				? profesionista?.trayectoria.laboral[0].fechaInicio
				: new Date();
			const firstProj: Date = profesionista?.trayectoria.proyectos[0]
				? profesionista?.trayectoria.proyectos[0].fechaInicio
				: new Date();

			if (firstJob.getFullYear() >= firstProj.getFullYear()) date = firstJob;
			else date = firstProj;

			const yoe = calcDateDiffYears(date);

			map.set(cert.id, yoe);
		}

		return map;
	});

	const mapIdsCertsNumProyects = $derived.by(() => {
		const map: Map<string, number> = new Map();
		const mapIdsProfesionista: Map<string, Profesionista> = new Map();

		for (let cert of storeCertificaciones.value) {
			let profesionista: Profesionista | null | undefined;

			if (map.has(cert.id)) continue;

			if (!mapIdsProfesionista.has(cert.idProfesionista)) {
				profesionista = storeProfesionistas.value.find((p) => p.id === cert.idProfesionista);
				if (profesionista) mapIdsProfesionista.set(cert.idProfesionista, profesionista);
				else continue;
			} else {
				profesionista = mapIdsProfesionista.get(cert.idProfesionista);
			}

			const numberOfProyects = profesionista?.trayectoria.proyectos.length || 0;

			map.set(cert.id, numberOfProyects);
		}

		return map;
	});

	$effect(() => {
		if (searchTerm.length <= 2) {
			searchIds = [];
			// noResults = false;
		}
	});

	$inspect({ mapIdsCertsNumProyects });

	$effect(() => {
		if (filtersList.length === 0) filteredIds = [];
	});

	function handleSearch(searchTerm: string) {
		if (!searchTerm) {
			searchIds = [];
			handleApplyFilters();

			return;
		}

		searchIds = indexCertificaciones.search(searchTerm);

		handleApplyFilters();
	}

	function hideFilters() {
		showFiltersSelect = false;
	}

	function handleApplyFilters() {
		let ids: string[] = [];

		for (let filter of filtersList) {
			if (filter instanceof BooleanFilter) {
				ids = ids.concat(
					...filter.filterIds(results.map((c) => ({ id: c.id, value: c.verificado })))
				);

				continue;
			}

			if (
				filter instanceof LessThanFilter ||
				filter instanceof MoreThanFilter ||
				filter instanceof EqualFilter
			) {
				if (filter.type === 'yearsofexperience')
					ids = ids.concat(
						...filter.filterIds(
							results.map((c) => ({
								id: c.id,
								value: mapCertIdsYOE.get(c.id) || 0
							}))
						)
					);
				else if (filter.type === 'numberofprojects')
					ids = ids.concat(
						...filter.filterIds(
							results.map((c) => ({
								id: c.id,
								value: mapIdsCertsNumProyects.get(c.id) || 0
							}))
						)
					);

				continue;
			}
		}

		filteredIds = Array.from(new Set(ids));
	}

	function handleRemoveFilter() {
		handleSearch(searchTerm);
		handleApplyFilters();
	}

	function handleFilterSelect(filter: Filter) {
		hideFilters();
		filtersList.push(filter);
	}

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

	function filterCertificaciones() {
		if (searchIds.length === 0 && filteredIds.length === 0) {
			if (idProfesionista)
				return limit
					? storeCertificaciones.value
							.filter((c) => c.idProfesionista === idProfesionista)
							.slice(limit)
					: storeCertificaciones.value.filter((c) => c.idProfesionista === idProfesionista);
			else if (idsCerts) return storeCertificaciones.value.filter((c) => idsCerts.includes(c.id));
			else return limit ? storeCertificaciones.value.slice(limit) : storeCertificaciones.value;
		}

		let certificacionesSearch: Certificaciones | undefined = undefined;
		let certificacionesFilters: Certificaciones | undefined = undefined;

		if (searchIds.length > 0)
			certificacionesSearch = storeCertificaciones.value.filter((c) => searchIds.includes(c.id));

		if (filteredIds.length > 0)
			certificacionesFilters = storeCertificaciones.value.filter((c) => filteredIds.includes(c.id));

		if (certificacionesSearch?.length == 0 && certificacionesFilters?.length == 0) return [];

		const searchIdsCertificaciones = new Set(
			certificacionesSearch ? certificacionesSearch.map((c) => c.id) : []
		);
		const filteredIdsCertificaciones = new Set(
			certificacionesFilters ? certificacionesFilters.map((c) => c.id) : []
		);

		let resultIds: string[];

		if (filteredIdsCertificaciones.size > 0 && searchIdsCertificaciones.size > 0)
			resultIds = Array.from(searchIdsCertificaciones.intersection(filteredIdsCertificaciones));
		else if (searchIdsCertificaciones.size > 0) resultIds = Array.from(searchIdsCertificaciones);
		else if (filteredIdsCertificaciones.size > 0)
			resultIds = Array.from(filteredIdsCertificaciones);
		else resultIds = [];

		const resultCertificaciones = storeCertificaciones.value.filter((c) =>
			resultIds.includes(c.id)
		);

		return limit ? resultCertificaciones.slice(limit) : resultCertificaciones;
	}

	let results = $derived.by(filterCertificaciones);
</script>

{#snippet header()}
	<thead>
		<tr>
			<th><Hash class="size-5" /></th>
			<th>Nombre</th>
			<th># de Serie</th>
			<th>Organización</th>
			<th>Fecha de Obtención</th>
			<th>Vigencia</th>
			<th>Estatus Verificación</th>

			{#if showActions}
				<th>Acciones</th>
			{/if}
		</tr>
	</thead>
{/snippet}

{#snippet badgeVerificado(verified: boolean)}
	<div class={`badge ${verified ? 'badge-success' : 'badge-warning'}`}>
		{#if verified}
			Verificado
		{:else}
			Pendiente
		{/if}
	</div>
{/snippet}

{#snippet body()}
	<tbody>
		{#each results as cert, i}
			<tr class="hover:bg-base-300">
				<th>
					{#if baseURL}
						<a href={`${baseURL}/${cert.id}`}>
							<div class="join items-center gap-2">
								{i + 1}
								<ArrowSquareOut class="size-5" />
							</div>
						</a>
					{:else}
						{i + 1}
					{/if}
				</th>
				<td>{cert.nombre}</td>
				<td>
					<div
						class="badge badge-neutral tooltip tooltip-right flex-nowrap font-mono break-keep"
						data-tip="# de Serie"
					>
						<Hash class="size-5" />
						{cert.serie}
					</div>
				</td>
				<td>{cert.organizacion}</td>
				<td>{cert.fechaObtencion.toISOString().slice(0, 10)}</td>
				<td>
					{cert.vigencia < 0
						? 'Vitalicia'
						: cert.vigencia === 1
							? `${cert.vigencia} año`
							: `${cert.vigencia} años`}
				</td>
				<td>
					<div class="join items-center gap-2">
						{@render badgeVerificado(cert.verificado)}
						{#if showVerifyActions}
							<label class="toggle text-base-content my-2 self-center">
								<input type="checkbox" bind:checked={cert.verificado} />
								<svg
									aria-label="disabled"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="4"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
								<svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<g
										stroke-linejoin="round"
										stroke-linecap="round"
										stroke-width="4"
										fill="none"
										stroke="currentColor"
									>
										<path d="M20 6 9 17l-5-5"></path>
									</g>
								</svg>
							</label>
						{/if}
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
{/snippet}

{#if showSearch}
	<div class="flex justify-center">
		<Search
			placeholder="Buscar por nombre, apellidos, correo, palabras clave..."
			onSearch={handleSearch}
			bind:searchTerm
			bind:showFiltersSelect
		>
			{#snippet filters()}
				<FiltersCertificaciones onClose={hideFilters} onSelect={handleFilterSelect} />
			{/snippet}
		</Search>
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
