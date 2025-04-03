<script lang="ts">
	import ProcesoData from '../proceso-data.svelte';
	import RateInput from '$lib/components/rate-input.svelte';
	import {
		getCalificacionesProcesoContext,
		getCalificacionProceso,
		getCertificacionContext,
		getCurrentEmpleadorContext,
		getCurrentProfesionistaContext,
		getProcesoContext,
		getProcesosContext
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

	const currentProfesionista = getCurrentProfesionistaContext();

	const calificacionesStore = getCalificacionesProcesoContext();
	const calificacionProceso = getCalificacionProceso(proceso.idCalificacion);
	const procesosStore = getProcesosContext();

	const empleadorStore = getCurrentEmpleadorContext();
	let calificacion = $state(calificacionProceso?.profesionista?.valor || 0);

	$effect(() => {
		for (let i = 0; i < procesosStore.value.length; i++) {
			if (procesosStore.value[i].id == proceso.id) {
				procesosStore.value[i] = proceso;
			}
		}
	});

	function createCalificacionProceso() {
		if (!proceso) return;

		const nuevaCalificacionProfesionista: Calificacion = {
			id: generateId(),
			tipo: 'estrella-5',
			valor: calificacion
		};

		const indexProceso = procesosStore.value.findIndex((p) => p.id === proceso.id);

		let indexCalificacion = calificacionesStore.value.findIndex(
			(c) => c.id === proceso.idCalificacion
		);

		if (!calificacionProceso || !proceso.idCalificacion) {
			const nuevaCalificacionProceso: CalificacionProceso = {
				id: generateId(),
				empleador: null,
				profesionista: nuevaCalificacionProfesionista,
				idProceso: proceso.id
			};

			calificacionesStore.value.push(nuevaCalificacionProceso);

			proceso.idCalificacion = nuevaCalificacionProceso.id;
			procesosStore.value.splice(indexProceso, 1, proceso);

			return;
		}

		if (!calificacionProceso.profesionista)
			calificacionProceso.profesionista = nuevaCalificacionProfesionista;
		else calificacionProceso.profesionista.valor = calificacion;

		calificacionesStore.value.splice(indexCalificacion, 1, calificacionProceso);
	}

	function handleCalificar() {
		createCalificacionProceso();
	}
</script>

<main class="flex flex-col gap-2">
	<div class="flex flex-col justify-center md:flex-row md:justify-between">
		<h1 class="text-2xl">Calificar</h1>

		<div class="flex flex-row gap-5">
			<RateInput color="profesionista" bind:value={calificacion} />
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
			{currentProfesionista.nombre}
			{currentProfesionista.apellidos}
		</div>
	</div>

	<ProcesoData {certificacion} empleador={empleadorStore} />
</main>
