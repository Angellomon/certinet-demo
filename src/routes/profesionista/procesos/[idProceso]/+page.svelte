<script lang="ts">
	import { page } from '$app/state';
	import ProcesoData from './proceso-data.svelte';

	const { data } = $props();
	const { proceso, empleador, profesionista, certificacion } = data;
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/procesos">Procesos</a></li>
			<li>
				<a href={`/profesionista/procesos/${proceso.id}`}
					>{empleador.razonSocial}
					<div class="divider-horizontal">&</div>
					{profesionista.nombre}
					{profesionista.apellidos}
					({certificacion.nombre})</a
				>
			</li>
		</ul>

		<h3 class="text-xl">Datos Profesionista</h3>

		<ProcesoData {empleador} {certificacion} />

		<a href={`${page.url.pathname}/calificar`}>

			<button class="btn btn-primary">Calificar</button>
		</a>
	</div>
</main>
