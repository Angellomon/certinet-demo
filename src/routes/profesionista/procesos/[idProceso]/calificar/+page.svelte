<script lang="ts">
	import ProcesoData from '../proceso-data.svelte';
	import RateInput from '$lib/components/rate-input.svelte';

	const { data } = $props();

	const { proceso, empleador, profesionista, certificacion } = data;

	let calificacion = $state(0);
</script>

<main class="flex flex-col gap-2">
	<div class="flex flex-col justify-center md:flex-row md:justify-between">
		<h1 class="text-2xl">Calificar</h1>

		<div class="flex flex-row gap-5">
			<RateInput bind:value={calificacion} />
			<button class="btn btn-primary" disabled={calificacion == 0}> Calificar </button>
		</div>
	</div>

	<div class="flex flex-col md:flex-row">
		<div class="grid h-20 grow place-items-center">
			{certificacion.nombre}
		</div>
		<div class="divider divider-horizontal">|</div>
		<!-- <div class="divider divider-horizontal">&</div> -->
		<div class="grid h-20 grow place-items-center">
			{empleador.razonSocial}
		</div>
	</div>

	<ProcesoData {certificacion} {profesionista} {empleador} {proceso} />
</main>
