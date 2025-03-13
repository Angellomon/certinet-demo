<script lang="ts">
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';

	const { data } = $props();

	const { certificaciones } = data;
</script>

<main>
	{#if certificaciones.length > 1}
		<h1 class="text-2xl">Nuevo Proceso de Contacto</h1>
	{:else}
		<h1 class="text-2xl">Nuevos Procesos de Contacto</h1>
	{/if}

	<ListaCertificaciones {certificaciones} />
</main>
