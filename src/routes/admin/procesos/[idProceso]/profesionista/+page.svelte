<script lang="ts">
	import { page } from '$app/state';
	import { Hash } from 'phosphor-svelte';
	import InputProfesionista from '$lib/components/inputs/inputs-profesionista.svelte';
	import { getProcesoContext, getProfesionistaContext } from '$lib/context.svelte';
	import TimelineProfesionista from '$lib/components/timeline-profesionista.svelte';

	const { idProceso } = page.params;

	const procesoStore = getProcesoContext(idProceso);
	const profesionista = getProfesionistaContext(procesoStore.idProfesionista);
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<h1 class="text-2xl underline">{profesionista.nombre} {profesionista.apellidos}</h1>

		{#if profesionista.verificado}
			<button class="btn btn-success"> Verificado </button>
		{:else}
			<button class="btn btn-warning"> Pendiente de Verificar </button>
		{/if}
	</div>

	<div
		class="badge badge-neutral tooltip tooltip-right flex-nowrap font-mono text-nowrap"
		data-tip="ID Profesionista"
	>
		<Hash class="size-5" />
		ID
		{profesionista.id}
	</div>

	<InputProfesionista idProfesionista={procesoStore.idProfesionista} />

	<div class="divider">Experiencia Laboral</div>
	<TimelineProfesionista startOdd idProfesionista={procesoStore.idProfesionista} type="laboral" />

	<div class="divider">Proyectos</div>
	<TimelineProfesionista startOdd idProfesionista={procesoStore.idProfesionista} type="proyectos" />
</main>
