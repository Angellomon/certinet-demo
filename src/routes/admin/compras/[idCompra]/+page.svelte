<script lang="ts">
	import { page } from '$app/state';
	import { getCompraContext, getProcesosContext } from '$lib/context.svelte';
	import { formatISO } from 'date-fns';
	import { Hash } from 'phosphor-svelte';

	const { idCompra } = page.params;

	const compraStore = getCompraContext(idCompra);

	const procesosStore = getProcesosContext().value.filter((p) =>
		compraStore.idsProcesosContacto.includes(p.id)
	);

	function formatDate(date: Date) {
		return formatISO(date, {
			representation: 'date'
		});
	}
</script>

<main class="flex flex-col gap-5">
	<div>
		<div class="badge badge-neutral tooltip tooltip-right font-mono" data-tip="ID Compra">
			<Hash class="size-5" />
			ID
			{compraStore.id}
		</div>
	</div>

	<div class="flex flex-col justify-between gap-5">
		<div class="flex flex-wrap gap-10">
			<div class="flex flex-col">
				<h2>Fecha</h2>
				<p class="text-xl">{formatDate(compraStore.fecha)}</p>
			</div>

			<div class="flex flex-col">
				<h2>Monto</h2>
				<p class="text-xl">{compraStore.monto.toFixed(2)}</p>
			</div>
		</div>

		<div class="flex flex-col">
			<h2>IDs Procesos</h2>

			<div class="flex flex-wrap gap-2">
				{#each compraStore.idsProcesosContacto as idProceso}
					<div class="badge badge-accent break-keep">{idProceso}</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col">
			<h2>IDs Certificaciones</h2>
			<div class="flex flex-wrap gap-2">
				{#each procesosStore as proceso}
					<div class="badge badge-info break-keep">{proceso.idCertificacion}</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col">
			<h2>Estatus Compra</h2>

			<select
				class="select"
				class:select-success={compraStore.status === 'completado'}
				class:select-warning={compraStore.status === 'en proceso'}
				class:select-error={compraStore.status === 'rechazado'}
				name="status-compra"
				id={`status-${idCompra}`}
				bind:value={compraStore.status}
			>
				<option value="en proceso">En proceso</option>
				<option value="completado">Completado</option>
				<option value="rechazado">Rechazado</option>
			</select>
		</div>
	</div>
</main>
