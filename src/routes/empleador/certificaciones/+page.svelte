<script lang="ts">
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';
	import SelectCertificaciones from '$lib/components/select-certificaciones.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	const { data } = $props();

	const { certificaciones } = data;

	let selectedIds: Set<string> = $state(new SvelteSet());
</script>

<main>
	<h1 class="text-xl">Resultados de Búsqueda</h1>

	<SelectCertificaciones {certificaciones} bind:selectedIds />
</main>
