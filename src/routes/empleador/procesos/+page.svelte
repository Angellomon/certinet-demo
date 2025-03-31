<script lang="ts">
	import ListaProcesos from '$lib/components/lista-procesos.svelte';
	import { getEmpleadorContext } from '$lib/context.svelte';

	const currentEmpleadorStore = getEmpleadorContext()
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos de Contacto</h2>
	<ListaProcesos baseUrl="/empleador/procesos" id={currentEmpleadorStore.value.id} currentType="empleador" />
</main>
