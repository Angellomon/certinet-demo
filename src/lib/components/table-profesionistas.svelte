<script lang="ts">
	import { getIndexProfesionistasContext, getProfesionistasContext } from '$lib/context.svelte';
	import type { ID, Profesionista } from '$lib/entities';
	import { ArrowSquareOut, NotePencil, X } from 'phosphor-svelte';
	import SearchInput from './search-input.svelte';

	interface Props {
		limit?: number;
		showActions?: boolean;
		showVerifyActions?: boolean;
		baseURL?: string;
		showSearch?: boolean;
	}

	const {
		limit,
		showActions = false,
		showSearch = false,
		showVerifyActions,
		baseURL
	}: Props = $props();

	let searchIds: string[] = $state([]);
	let noResults = $state(false);

	const indexProfesionistas = getIndexProfesionistasContext();

	const profesionistas = getProfesionistasContext();

	let editProfesionista: Profesionista | undefined = $state();
	let deleteID: ID | undefined = $state();
	let searchTerm = $state('');

	$effect(() => {
		if (searchTerm.length <= 2) {
			searchIds = [];
			noResults = false;
		} else {
			handleSearch(searchTerm);
		}
	});

	$effect(() => {
		if (searchTerm.length > 2 && searchIds.length == 0) noResults = true;
		else noResults = false;
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

	function handleEditClick(idProfesionista: ID) {
		editProfesionista = profesionistas.value.find((p) => p.id === idProfesionista);

		if (!editProfesionista) return;

		(document.getElementById('modal_edit_profesionista') as any)?.showModal();
	}

	function handleModalSave() {}

	function handleDeleteProfesionista() {
		if (!deleteID) return;

		const index = profesionistas.value.findIndex((p) => p.id === deleteID);

		if (index < 0) return;

		profesionistas.value.splice(index, 1);

		deleteID = undefined;
	}

	function handleDeleteClick(idProfesionista: ID) {
		deleteID = idProfesionista;
		(document.getElementById('modal_delete_profesionista') as any)?.showModal();
	}

	function handleSearch(searchTerm: string) {
		if (!searchTerm) return;

		const results = indexProfesionistas.search(searchTerm);

		searchIds = results;
	}
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
			<th>#</th>
			<th>Nombre</th>
			<th>Apellidos</th>
			<th>Correo</th>
			<th>Profesión</th>
			<th>Años de Exp.</th>
			<th>Edad</th>
			<th>Estatus Verificación</th>

			{#if showActions}
				<th>Acciones</th>
			{/if}
		</tr>
	</thead>
{/snippet}

{#snippet body()}
	<tbody>
		{#each searchIds.length > 0 ? profesionistas.value.filter( (p) => searchIds.includes(p.id) ) : limit ? profesionistas.value.slice(0, limit) : profesionistas.value as profesionista, i}
			{@const firstJob =
				profesionista.trayectoria.laboral[0] || profesionista.trayectoria.proyectos[0]}
			{@const yoe = firstJob ? calcDateDiffYears(firstJob.fechaInicio) : 0}
			{@const age = calcAge(profesionista.fechaNacimeinto)}

			<tr class="hover:bg-base-300">
				<th>
					{#if baseURL}
						<a href={`${baseURL}/${profesionista.id}`}>
							<div class="join gap-2">
								{i + 1}
								<ArrowSquareOut class="h-5" />
							</div>
						</a>
					{:else}
						<div class="join gap-2">
							{i + 1}
							<NotePencil class="h-5" />
						</div>
					{/if}
				</th>
				<td>{profesionista.nombre}</td>
				<td>{profesionista.apellidos}</td>
				<td>
					<a class="link link-accent" href={`mailto:${profesionista.correo}`}>
						{profesionista.correo}
					</a>
				</td>
				<td>{profesionista.profesion}</td>
				<td>{yoe}</td>
				<td>{age}</td>
				<td class="join items-center gap-2">
					{@render badgeVerificado(profesionista.verificado)}

					{#if showVerifyActions}
						<label class="toggle text-base-content my-2 self-center">
							<input type="checkbox" bind:checked={profesionista.verificado} />
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
				</td>

				{#if showActions}
					<td>
						<div class="join">
							<button class="btn" onclick={() => handleEditClick(profesionista.id)}>
								<NotePencil class="h-5" />
							</button>
							<button class="btn btn-error" onclick={() => handleDeleteClick(profesionista.id)}>
								<X class="fill-base-content h-5" />
							</button>
						</div>
					</td>
				{/if}
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
		/>
	</div>
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

<dialog id="modal_edit_profesionista" class="modal">
	{#if editProfesionista}
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
					<X />
				</button>
			</form>

			<fieldset class="fieldset">
				<legend class="legend text-xl">Datos</legend>

				<div class="flex flex-col md:flex-row md:gap-5">
					<div class="flex-flex-col">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="fieldset-label">Nombre</label>
						<input
							type="text"
							class="input"
							placeholder="Nombre"
							bind:value={editProfesionista.nombre}
						/>

						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="fieldset-label">Apellidos</label>
						<input
							type="text"
							class="input"
							placeholder="Apellidos"
							bind:value={editProfesionista.apellidos}
						/>

						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="fieldset-label">Correo</label>
						<input
							type="email"
							class="input"
							placeholder="Razón Social"
							bind:value={editProfesionista.correo}
						/>
					</div>

					<div class="flex flex-col">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="fieldset-label">Profesión</label>
						<input
							type="text"
							class="input"
							placeholder="Profesion"
							bind:value={editProfesionista.profesion}
						/>

						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="fieldset-label">Fecha de Nacimiento</label>
						<input
							type="date"
							class="input"
							placeholder="Fecha de Establecimiento"
							onchange={(e) => {
								if (!e.currentTarget.value || !editProfesionista) return;

								editProfesionista.fechaNacimeinto = new Date(e.currentTarget.value);
							}}
							value={editProfesionista.fechaNacimeinto.toISOString().slice(0, 10)}
						/>
					</div>
				</div>

				{@render field(
					'Estatus Verificación',
					editProfesionista.verificado ? 'Verificado' : 'Verificación Pendiente'
				)}
			</fieldset>

			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn" onclick={handleModalSave}>Guardar</button>
				</form>
			</div>
		</div>
	{/if}
</dialog>

{#if deleteID}
	<dialog class="modal" id="modal_delete_profesionista">
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
					<X class="h-5" />
				</button>
			</form>

			<h3 class="my-5 text-lg font-bold">Confirmar Eliminción de Profesionista</h3>

			<div class="modal-action">
				<form method="dialog" class=" join">
					<button class="btn btn-error" onclick={handleDeleteProfesionista}> Confirmar </button>
					<button class="btn"> Cancelar </button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
