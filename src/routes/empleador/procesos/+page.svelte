<script lang="ts">
	import ListaProcesos from '$lib/components/lista-procesos.svelte';

	const { data } = $props();

	const { procesosContacto, certificacionesDataMap } = data;
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos de Contacto</h2>
	<ListaProcesos baseUrl="/empleador/procesos" {certificacionesDataMap} {procesosContacto} />
</main>
