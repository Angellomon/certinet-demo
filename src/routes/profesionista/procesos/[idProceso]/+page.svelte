<script lang="ts">
	import { page } from '$app/state';
	import { getCertificacionContext, getCurrentEmpleadorContext, getCurrentProfesionistaContext, getEmpleadorContext, getProcesoContext } from '$lib/context.svelte';
	import { error } from '@sveltejs/kit';
	import ProcesoData from './proceso-data.svelte';


	const proceso = getProcesoContext(page.params.idProceso)
	if (!proceso) error(404, { message: '[404] Proceso no encontrado...' });

	const empleador = getEmpleadorContext(proceso.idEmpleador)
	if (!empleador) error(404, `[404] empelador no encontrado (p.idEmpleador=${proceso.idEmpleador})`);

	const certificacion = getCertificacionContext(proceso.idCertificacion)
	if (!certificacion) error(404, `[404] certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);

	const currentProfesionistaStore = getCurrentProfesionistaContext();
	const procesoContacto = getProcesoContext(page.params.idProceso);

	if (!procesoContacto) error(404, { message: '[404] Proceso no encontrado...' });
</script>

<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/profesionista">Dashboard</a></li>
			<li><a href="/profesionista/procesos">Procesos</a></li>
			<li>
				<a href={`/profesionista/procesos/${procesoContacto.id}`}
					>{empleador.razonSocial}
					<div class="divider-horizontal">&</div>
					{currentProfesionistaStore.value.nombre}
					{currentProfesionistaStore.value.apellidos}
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
