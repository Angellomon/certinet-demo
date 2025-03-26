<script lang="ts">
	import ListaProcesos from '$lib/components/lista-procesos.svelte';

	const { data } = $props();
	const { currentEmpleador, procesosContacto, certificacionesDataMap } = data;
</script>

<div class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<a href="/empleador"><li>Dashboard</li></a>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos Recientes</h2>
	<ListaProcesos baseUrl="/empleador/procesos" {certificacionesDataMap} {procesosContacto} />
</div>
