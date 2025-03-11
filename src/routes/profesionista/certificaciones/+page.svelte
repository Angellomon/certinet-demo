<script>
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';

	const { data } = $props();
	const { certificaciones } = data;
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/certificaciones">Certificaciones</a></li>
		</ul>
	</div>

	<h2 class="text-2xl">Certificaciones</h2>

	<ListaCertificaciones {certificaciones} />
</main>
