<script lang="ts">
	import JsonData from '$lib/components/JsonData.svelte';
	import DataCertificacion from './data-certificacion.svelte';

	const { data } = $props();

	const { certificacion } = data;
	let certState = $state(certificacion);
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

	<DataCertificacion bind:certificacion={certState} />

	<JsonData title="Raw Data Certificación" jsonData={certState} />
</main>
