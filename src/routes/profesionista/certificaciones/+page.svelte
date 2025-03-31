<script>
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/certificaciones">Certificaciones</a></li>
		</ul>
	</div>

	<div class="flex flex-col justify-around gap-5 md:flex-row md:justify-between">
		<h2 class="text-2xl">Certificaciones</h2>
		<a href="/profesionista/certificaciones/nueva">
			<button class="btn btn-primary">Nueva Certificación</button>
		</a>
	</div>
	<ListaCertificaciones basePath="/profesionista/certificaciones" />
</main>
