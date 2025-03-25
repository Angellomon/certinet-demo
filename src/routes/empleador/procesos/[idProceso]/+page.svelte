<script lang="ts">
	import { page } from '$app/state';
	import ProcesoData from '$lib/components/proceso-data.svelte';

	const { data } = $props();
	const { proceso, empleador, profesionista, certificacion } = data;
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
			<li>
				<a href={`/empleador/procesos/${proceso.id}`}
					>{empleador.razonSocial}
					<div class="divider-horizontal">&</div>
					{profesionista.nombre}
					{profesionista.apellidos}
					({certificacion.nombre})</a
				>
			</li>
		</ul>

		<h3 class="text-xl">Datos Profesionista</h3>

		<ProcesoData {profesionista} {certificacion} />

		<a href={`${page.url.pathname}/calificar`}>

			<button class="btn btn-primary">Calificar</button>
		</a>
	</div>
</main>
