<script lang="ts">
	import JsonData from '$lib/components/JsonData.svelte';

	const { data } = $props();
	const { proceso } = data;
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
		</ul>

		<JsonData jsonData={proceso} />
	</div>
</main>
