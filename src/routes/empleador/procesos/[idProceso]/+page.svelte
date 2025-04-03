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
	import TimelineProfesionista from '$lib/components/timeline-profesionista.svelte';

	const currentEmpleador = getCurrentEmpleadorContext();

	const proceso = getProcesoContext(page.params.idProceso);
	if (!proceso) error(404, `[404] Proceso no encontrado (p.id=${page.params.idProceso})`);

	const certificacion = getCertificacionContext(proceso.idCertificacion);

	if (!certificacion)
		error(404, `[404] Certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);

	const profesionista = getProfesionistaContext(certificacion.idProfesionista);
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/empleador">Dashboard</a></li>
			<li><a href="/empleador/procesos">Procesos</a></li>
			<li>
				<a href={`/empleador/procesos/${proceso.id}`}>
					{currentEmpleador.razonSocial}
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
			<TimelineProfesionista idProfesionista={profesionista.id} type="laboral" />
		</div>
		<div class="divider divider-start text-2xl">Proyectos</div>

		<div>
			<TimelineProfesionista idProfesionista={profesionista.id} type="proyectos" />
		</div>

		<a href={`${page.url.pathname}/calificar`}>
			<button class="btn btn-primary">Calificar</button>
		</a>
	</div>
</main>
