<script lang="ts">
	import ListaProcesos from '$lib/components/lista-procesos.svelte';
	import { getCurrentProfesionistaContext } from '$lib/context.svelte.js';

	const currentProfesionistaStore = getCurrentProfesionistaContext();
</script>

<div class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<a href="/profesionista"><li>Dashboard</li></a>
		</ul>
	</div>

	<h2 class="text-2xl">Procesos Recientes</h2>
	<ListaProcesos
		baseUrl="/profesionista/procesos"
		id={currentProfesionistaStore.value.id}
		currentType="profesionista"
	/>
</div>
