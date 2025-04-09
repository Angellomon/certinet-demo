<script lang="ts">
	import { getProfesionistasContext } from '$lib/context.svelte';
	import CrossSvg from './cross-svg.svelte';
	import EditSvg from './edit-svg.svelte';

	interface Props {
		limit?: number;
		showActions?: boolean;
		showVerifyActions?: boolean;
	}

	const { limit, showActions = false, showVerifyActions }: Props = $props();

	const profesionistas = getProfesionistasContext();

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

<div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
	<table class="table-sm table">
		<thead>
			<tr>
				<th></th>
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

		<tbody>
			{#each limit ? profesionistas.value.slice(0, limit) : profesionistas.value as profesionista, i}
				{@const firstJob =
					profesionista.trayectoria.laboral[0] || profesionista.trayectoria.proyectos[0]}
				{@const yoe = firstJob ? calcDateDiffYears(firstJob.fechaInicio) : 0}
				{@const age = calcAge(profesionista.fechaNacimeinto)}

				<tr class="hover:bg-base-300">
					<th>{i + 1}</th>
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
					<td>
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
								<button class="btn">
									<EditSvg />
								</button>
								<button class="btn btn-error">
									<CrossSvg />
								</button>
							</div>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
