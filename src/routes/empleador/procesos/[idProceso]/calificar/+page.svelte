<script lang="ts">
	import ProcesoData from '../proceso-data.svelte';
	import RateInput from '$lib/components/rate-input.svelte';
	import {
		getCalificacionesProcesoContext,
		getCalificacionProceso,
		getCertificacionContext,
		getEmpleadorContext,
		getProcesoContext,
		getProcesosContext,
		getProfesionistaContext
	} from '$lib/context.svelte';
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import type { Calificacion, CalificacionProceso } from '$lib/entities';
	import { generateId } from '$lib/demo-data';

	const proceso = $state(getProcesoContext(page.params.idProceso));
	if (!proceso) error(404, `[404] Proceso no encontrado (p.id=${page.params.idProceso})`);

	const certificacion = getCertificacionContext(proceso.idCertificacion);
	if (!certificacion)
		error(404, `[404] Certificación no encontrada (p.idCertificacion=${proceso.idCertificacion})`);

	const profesionista = getProfesionistaContext(proceso.idProfesionista);
	if (!profesionista)
		error(404, `[404] Profesionista no encontrado (p.idProfesionista=${proceso.idProfesionista})`);

	const calificacionesStore = getCalificacionesProcesoContext();
	const calificacionProceso = getCalificacionProceso(proceso.idCalificacion);
	const procesos = getProcesosContext();

	const empleadorStore = getEmpleadorContext();
	let calificacion = $state(calificacionProceso?.empleador?.valor || 0);

	$effect(() => {
		for (let i = 0; i < procesos.value.length; i++) {
			if (procesos.value[i].id == proceso.id) {
				procesos.value[i] = proceso;
			}
		}
	});

	function createCalificacionProceso() {
		if (!proceso) return;

		const nuevaCalificacionEmpleador: Calificacion = {
			id: generateId(),
			tipo: 'estrella-5',
			valor: calificacion
		};
		const nuevaCalificacionProceso: CalificacionProceso = {
			id: generateId(),
			empleador: nuevaCalificacionEmpleador,
			profesionista: null,
			idProceso: proceso.id
		};

		const indexProceso = procesos.value.findIndex((p) => p.id === proceso.id);

		let indexCalificacion = calificacionesStore.value.findIndex(
			(c) => c.id === proceso.idCalificacion
		);
		const calificacionResult = calificacionesStore.value[indexCalificacion];

		if (!calificacionResult || !proceso.idCalificacion) {
			calificacionesStore.value.push(nuevaCalificacionProceso);

			indexCalificacion = calificacionesStore.value.length;
		}
		
		proceso.idCalificacion = nuevaCalificacionProceso.id;
		calificacionesStore.value.splice(indexCalificacion, 1, nuevaCalificacionProceso);
		procesos.value.splice(indexProceso, 1, proceso);
	}

	function handleCalificar() {
		createCalificacionProceso();
	}
</script>

<main class="flex flex-col gap-2">
	<div class="flex flex-col justify-center md:flex-row md:justify-between">
		<h1 class="text-2xl">Calificar</h1>

		<div class="flex flex-row gap-5">
			<RateInput bind:value={calificacion} />
			<button onclick={handleCalificar} class="btn btn-primary" disabled={calificacion == 0}>
				Calificar
			</button>
		</div>
	</div>

	<div class="flex flex-col md:flex-row">
		<div class="grid h-20 grow place-items-center">
			{certificacion.nombre}
		</div>
		<div class="divider divider-horizontal">|</div>
		<!-- <div class="divider divider-horizontal">&</div> -->
		<div class="grid h-20 grow place-items-center">
			{profesionista.nombre}
			{profesionista.apellidos}
		</div>
	</div>

	<ProcesoData {certificacion} {profesionista} empleador={empleadorStore.value} {proceso} />
</main>
