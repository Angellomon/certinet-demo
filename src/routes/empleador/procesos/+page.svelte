<script lang="ts">
	import ListProcesos from '$lib/components/lists/list-procesos.svelte';
	import { getCurrentEmpleadorContext } from '$lib/context.svelte';

	const currentEmpleadorStore = getCurrentEmpleadorContext();
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos de Contacto</h2>
	<ListProcesos
		showCalificacionEmpleador
		baseUrl="/empleador/procesos"
		id={currentEmpleadorStore.id}
		currentType="empleador"
	/>
</main>
