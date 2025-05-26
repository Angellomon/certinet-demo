<script lang="ts">
	import { page } from '$app/state';
	import InputsEmpleador from '$lib/components/inputs/inputs-empleador.svelte';
	import { getCompraContext, getEmpleadorContext } from '$lib/context.svelte';
	import { ArrowSquareOut, Hash } from 'phosphor-svelte';

	const { idCompra } = page.params;
	const compraStore = getCompraContext(idCompra);

	const empleadorStore = getEmpleadorContext(compraStore.idEmpleador);
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<div class="flex flex-col">
			<a href={`/admin/empleadores/${empleadorStore.id}`}>
				<div class="join items-center gap-2">
					<ArrowSquareOut class="size-5" />
					<h1 class="text-2xl">{empleadorStore.razonSocial}</h1>
				</div>
			</a>
		</div>

		<div class="join gap-2">
			{#if empleadorStore.verificado}
				<div class="badge badge-success">Verificado</div>
			{:else}
				<div class="badge badge-warning">Pendiente de Verificar</div>
			{/if}
		</div>
	</div>

	<div
		class="badge badge-neutral tooltip tooltip-right flex-nowrap font-mono text-nowrap"
		data-tip="ID Empleador"
	>
		<Hash class="size-5" />
		ID
		{empleadorStore.id}
	</div>

	<InputsEmpleador idEmpleador={compraStore.idEmpleador} />
</main>
