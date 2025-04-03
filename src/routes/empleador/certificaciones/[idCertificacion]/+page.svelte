<script lang="ts">
	import { page } from '$app/state';
	import {
		getCertificacionContext,
		getCurrentProfesionistaContext,
		getProfesionistaContext
	} from '$lib/context.svelte';
	import { error } from '@sveltejs/kit';
	import DataCertificacion from './data-certificacion.svelte';
	import DataProfesionista from './data-profesionista.svelte';

	const certificacion = getCertificacionContext(page.params.idCertificacion);

	if (!certificacion) error(404, '[404] Certificación no encontrada');

	const currentProfesionistaStore = getCurrentProfesionistaContext();

	if (!currentProfesionistaStore) error(404, '[404] Profesionista no encontrado');
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
	<DataProfesionista profesionista={currentProfesionistaStore} />
</main>
