<script lang="ts">
	import DataCertificacion from './data-certificacion.svelte';
	import DataProfesionista from './data-profesionista.svelte';

	const { data } = $props();

	const { certificacion, profesionista } = data;
</script>

<main class="flex flex-col gap-5">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/profesionista"> Dashboard </a>
			</li>
			<li>
				<a href="/profesionista/certificaciones"> Certificaciones </a>
			</li>
			<li>
				<a href={`/profesionista/certificaciones/${certificacion.id}`}>
					{certificacion.nombre}
				</a>
			</li>
		</ul>
	</div>

	<h2 class="text-xl font-bold">{certificacion.nombre}</h2>

	<DataCertificacion {certificacion} />
	<DataProfesionista {profesionista} />
</main>
