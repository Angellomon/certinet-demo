<script lang="ts">
	import ListProcesos from '$lib/components/lists/list-procesos.svelte';
	import { getCurrentEmpleadorContext } from '$lib/context.svelte';

	const currentEmpleadorStore = getCurrentEmpleadorContext();
</script>

<div class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<a href="/empleador"><li>Dashboard</li></a>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos Recientes</h2>
	<ListProcesos
		baseUrl="/empleador/procesos"
		limit={10}
		id={currentEmpleadorStore.id}
		currentType="empleador"
		showCalificacionEmpleador
	/>
</div>
