<script lang="ts">
	import JsonData from '$lib/components/JsonData.svelte';

	const { data } = $props();
	const { proceso } = data;
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/procesos">Procesos</a></li>
		</ul>

		<JsonData title="Raw Data Proceso" jsonData={proceso} />
	</div>
</main>
