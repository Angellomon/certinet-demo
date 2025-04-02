<script lang="ts">
	import { page } from '$app/state';
	import ProcesoData from './proceso-data.svelte';
	import { error } from '@sveltejs/kit';
	import {
		getCertificacionContext,
		getCurrentEmpleadorContext,
		getProcesoContext,
		getProfesionistaContext
	} from '$lib/context.svelte';
	import DataTimeline from './data-timeline.svelte';

	const empleadorStore = getCurrentEmpleadorContext();
	const proceso = getProcesoContext(page.params.idProceso);

	if (!proceso) error(404, `[404] Proceso no encontrado (p.id=${page.params.idProceso})`);

	const certificacion = getCertificacionContext(proceso.idCertificacion);

	if (!certificacion)
		error(404, `[404] Certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);

	const profesionista = getProfesionistaContext(certificacion.idProfesionista);

	if (!profesionista)
		error(404, `[404] Profesionista no encontrado (p.idProfesionista=${proceso.idProfesionista})`);
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
			<li>
				<a href={`/empleador/procesos/${proceso.id}`}>
					{empleadorStore.value.razonSocial}
					<div class="divider-horizontal">&</div>
					{profesionista.nombre}
					{profesionista.apellidos}
					({certificacion.nombre})</a
				>
			</li>
		</ul>

		<div class="divider"></div>

		<h3 class="text-xl">Datos Profesionista</h3>

		<ProcesoData {profesionista} {certificacion} />

		<div class="divider divider-start text-2xl">Expreiencia Laboral</div>

		<div>
			<DataTimeline timeline={profesionista.trayectoria.laboral} />
		</div>
		<div class="divider divider-start text-2xl">Proyectos</div>

		<div>
			<DataTimeline timeline={profesionista.trayectoria.proyectos} />
		</div>

		<a href={`${page.url.pathname}/calificar`}>
			<button class="btn btn-primary">Calificar</button>
		</a>
	</div>
</main>
