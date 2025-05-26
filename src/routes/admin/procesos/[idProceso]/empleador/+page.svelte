<script lang="ts">
	import { page } from '$app/state';
	import InputsEmpleador from '$lib/components/inputs/inputs-empleador.svelte';
	import { getEmpleadorContext, getProcesoContext } from '$lib/context.svelte';
	import { Hash } from 'phosphor-svelte';

	const { idProceso } = page.params;

	const procesoStore = getProcesoContext(idProceso);
	const empleadorStore = getEmpleadorContext(procesoStore.idEmpleador);
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<div>
			<h1 class="text-2xl">{empleadorStore.razonSocial}</h1>
		</div>

		{#if empleadorStore.verificado}
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
		{empleadorStore.id}
	</div>

	<InputsEmpleador idEmpleador={procesoStore.idEmpleador} />
</main>
