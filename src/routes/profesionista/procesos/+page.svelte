<script lang="ts">
	import ListaProcesos from '$lib/components/lists/lista-procesos.svelte';
	import { getCurrentProfesionistaContext } from '$lib/context.svelte';

	const currentProfesionistaStore = getCurrentProfesionistaContext();
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/procesos">Procesos</a></li>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos de Contacto</h2>
	<ListaProcesos
		baseUrl="/profesionista/procesos"
		id={currentProfesionistaStore.id}
		currentType="profesionista"
		showCalificacionProfesionista
	/>
</main>
