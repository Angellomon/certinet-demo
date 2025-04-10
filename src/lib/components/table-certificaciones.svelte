<script lang="ts">
	import { getCertificacionesContext } from '$lib/context.svelte';
	import type { Certificacion, ID } from '$lib/entities';

	interface Props {
		limit?: number;
		showActions?: boolean;
		showVerifyActions?: boolean;
		idProfesionista?: ID;
	}

	const { limit, showActions, showVerifyActions, idProfesionista }: Props = $props();

	const certificaciones = getCertificacionesContext();

	const certs = $derived(
		idProfesionista
			? certificaciones.value.filter((c) => c.idProfesionista === idProfesionista)
			: certificaciones.value
	);

	let editCert: Certificacion | undefined = $state();
	let deleteID: ID | undefined = $state();
</script>

{#snippet header()}
	<thead>
		<tr>
			<th></th>
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
		{#each limit ? certs.slice(0, limit) : certs as cert, i}
			<tr class="hover:bg-base-300">
				<th>
					{i + 1}
				</th>
				<td>{cert.nombre}</td>
				<td>
					<div class="badge badge-neutral tooltip" data-tip="# de Serie">
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
				</td>
			</tr>
		{/each}
	</tbody>
{/snippet}

<div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
	<table class="table-sm table">
		{@render header()}
		{@render body()}
	</table>
</div>
