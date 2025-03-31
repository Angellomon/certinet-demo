<script lang="ts">
	import { page } from '$app/state';
	import { getCertificacionesContext, getCompra } from '$lib/context.svelte.js';


	const idCompra = page.params.idCompra;

	const compra = getCompra(idCompra)
	const certificaciones = getCertificacionesContext()


</script>

{#snippet stat(title: string, value: string, desc?: string)}
	<div class="stats mx-2 text-right">
		<div class="">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value text-2xl">
				{value}
			</div>
			{#if desc}
				<div class="stat-desc">
					{desc}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet statusStat(title: string, type: 'success' | 'error' | 'warning', value: string)}
	<div class="stats mx-2 w-40 text-right">
		<div class="">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value text-lg">
				<div class="items inline-grid *:[grid-area:1/1]">
					{#if type == 'error'}
						<div aria-label="error" class="status status-md status-error animate-ping"></div>
						<div class="status status-md status-error"></div>
					{:else if type == 'success'}
						<div aria-label="success" class="status status-md status-success"></div>
						<div class="status status-md status-success"></div>
					{:else if type == 'warning'}
						<div aria-label="success" class="status status-md status-warning"></div>
						<div class="status status-md status-warning"></div>
					{/if}
				</div>
				{value}
			</div>
		</div>
	</div>
{/snippet}

<main class="bg-base-300 rounded-box p-5">
	<h3 class="tooltip tooltip-right text-xl underline" data-tip="ID Compra">{idCompra}</h3>

	<div class="divider"></div>
	{#if compra}
		<div class="flex flex-row flex-wrap gap-2">
			{@render stat('Monto', compra.monto.toFixed(2))}
			{@render stat('Fecha', compra.fecha.toISOString().slice(0, 10))}
			{@render stat('# de Certificaciones', `${certificaciones.value.length}`)}

			{#if compra.status == 'completado'}
				{@render statusStat('Estatus Pago', 'success', 'Completado')}
			{:else if compra.status == 'en proceso'}
				{@render statusStat('Estatus Pago', 'warning', 'En Proceso')}
			{:else if compra.status == 'rechazado'}
				{@render statusStat('Estatus Pago', 'error', 'Rechazado')}
			{/if}
		</div>
	{/if}
</main>
