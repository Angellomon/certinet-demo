<script lang="ts">
	import ListProcesos from '$lib/components/lists/list-procesos.svelte';
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
	<ListProcesos
		baseUrl="/profesionista/procesos"
		id={currentProfesionistaStore.id}
		currentType="profesionista"
	/>
</div>
