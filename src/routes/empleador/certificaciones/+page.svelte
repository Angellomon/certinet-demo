<script lang="ts">
	import { goto } from '$app/navigation';
	import SelectCertificaciones from '$lib/components/select-certificaciones.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	const { data } = $props();

	const { certificaciones } = data;

	let selectedIds: Set<string> = $state(new SvelteSet());

	function handleNewProcess() {
		goto(`/empleador/certificaciones/nuevo-proceso/?certIds=${Array.from(selectedIds).join(',')}`);
	}
</script>

<main class="relative">
	<h1 class="mb-5 text-xl">Resultados de Búsqueda</h1>

	<SelectCertificaciones {certificaciones} bind:selectedIds />

	{#if selectedIds.size > 0}
		<button onclick={handleNewProcess} class="btn btn-primary fixed right-5 bottom-5"
			>Proceder</button
		>
	{/if}
</main>
