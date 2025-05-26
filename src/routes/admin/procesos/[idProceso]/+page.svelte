<script lang="ts">
	import { page } from '$app/state';
	import InputRate from '$lib/components/inputs/input-rate.svelte';
	import {
		getCalificacionProceso,
		getCertificacionContext,
		getEmpleadorContext,
		getProcesoContext,
		getProfesionistaContext
	} from '$lib/context.svelte';
	import { formatISO } from 'date-fns';
	import { Hash, Placeholder } from 'phosphor-svelte';

	const { idProceso } = page.params;

	const procesoStore = getProcesoContext(idProceso);
	const empleadorStore = getEmpleadorContext(procesoStore.idEmpleador);
	const profesionistaStore = getProfesionistaContext(procesoStore.idProfesionista);
	const certificacionStore = getCertificacionContext(procesoStore.idCertificacion);

	const calificacionStore = getCalificacionProceso(procesoStore.idCalificacion);

	const nombre = `${empleadorStore.razonSocial} & ${profesionistaStore.nombre} ${profesionistaStore.apellidos} | ${certificacionStore.nombre}`;

	function formatDate(date: Date) {
		return formatISO(date, {
			representation: 'date'
		});
	}
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row items-center justify-between gap-5">
		<h1 class="text-2xl">{nombre}</h1>
	</div>

	<div
		class="badge badge-neutral tooltip tooltip-right flex-nowrap font-mono text-nowrap"
		data-tip="ID Proceso"
	>
		<Hash class="size-5" />
		ID
		{procesoStore.id}
	</div>

	<div class="join items-center gap-5">
		<div>
			Fecha Inicio
			<p class="text-xl">{formatDate(procesoStore.fechaInicio)}</p>
		</div>

		<div class="flex flex-col">
			Fecha Fin
			{#if procesoStore.fechaFin}
				<p class="text-xl">{formatDate(procesoStore.fechaFin)}</p>
			{:else}
				<div class="tooltip" data-tip="Proceso no concluído">
					<Placeholder class="size-5" />
				</div>
			{/if}
		</div>
	</div>

	<h2>Calificaciones</h2>

	<div class="join items-center gap-5">
		<div class="flex flex-col">
			<p>Empleador</p>
			{#if calificacionStore && calificacionStore.empleador}
				<InputRate value={calificacionStore.empleador.valor} color="empleador" disableInput />
			{:else}
				<div class="tooltip" data-tip="Sin calificación">
					<Placeholder class="size-5" />
				</div>
			{/if}
		</div>

		<div class="flex flex-col">
			<p>Profesionista</p>
			{#if calificacionStore && calificacionStore.profesionista}
				<InputRate
					value={calificacionStore.profesionista.valor}
					color="profesionista"
					disableInput
				/>
			{:else}
				<div class="tooltip" data-tip="Sin calificación">
					<Placeholder class="size-5" />
				</div>
			{/if}
		</div>
	</div>
</main>
