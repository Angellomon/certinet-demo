<script lang="ts">
	import { page } from '$app/state';
	import { getCertificacionContext } from '$lib/context.svelte';
	import { error } from '@sveltejs/kit';
	import DataCertificacion from './data-certificacion.svelte';

	const certificacion = getCertificacionContext(page.params.idCertificacion);

	if (!certificacion) error(404, { message: '[404] Certificación no encontrada' });

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

</main>
