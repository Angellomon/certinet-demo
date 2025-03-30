<script lang="ts">
	import { goto } from '$app/navigation';
	import SelectCertificaciones from '$lib/components/select-certificaciones.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let selectedIds: Set<string> = $state(new SvelteSet());
	let totalSelected = $derived(selectedIds.size);

	function handleNewProcess() {
		goto(`/empleador/certificaciones/nuevo-proceso/?certIds=${Array.from(selectedIds).join(',')}`);
	}
</script>

{#snippet stat(title: string, value: string, desc?: string)}
	<div class="stats mx-2 text-right">
		<div class="">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value text-2xl">
				{value}
			</div>
			{#if desc}
				<div class="stat-desc">
					{desc}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<main class="relative">
	<div class="relative">
		<h1 class=" mb-5 text-xl">Resultados de Búsqueda</h1>

		<p>Seleccione las <u>certificaciones</u> adecuadas</p>

		<div class=" bottom:5 text-right md:absolute md:top-0 md:right-10">
			{@render stat('Total Seleccionados', `${totalSelected}`)}
		</div>
	</div>
	<div class="divider"></div>

	<SelectCertificaciones bind:selectedIds />

	{#if selectedIds.size > 0}
		<button onclick={handleNewProcess} class="btn btn-primary fixed right-5 bottom-5"
			>Proceder</button
		>
	{/if}
</main>
