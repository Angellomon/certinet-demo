<script lang="ts">
	import type { Compra } from '$lib/entities';

	interface Props {
		compras: Compra[];
	}

	const { compras = [] }: Props = $props();
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

<div class="flex flex-col">
	{#each compras as compra}
		<button
			class="hover:bg-base-300 bg-base-200 border-b-accent-content rounded-box my-1 flex cursor-pointer flex-row flex-wrap items-end justify-between p-5 md:items-center"
		>
			<div class="self-start">
				<div class="text-xl underline">{compra.id}</div>
			</div>
      <div class="divider divider-vertical"></div>

			<div>
				{@render stat('Monto', `$ ${compra.monto.toFixed(2)}`)}
				{@render stat('Fecha', compra.fecha.toISOString().substring(0, 10))}
				{@render stat('# de Certificaciones', `${compra.idsProcesosContacto.length}`)}

				{#if compra.status == 'completado'}
					{@render statusStat('Estatus Pago', 'success', compra.status)}
				{:else if compra.status == 'en proceso'}
					{@render statusStat('Estatus Pago', 'warning', compra.status)}
				{:else if compra.status == 'rechazado'}
					{@render statusStat('Estatus Pago', 'error', compra.status)}
				{/if}
			</div>
		</button>
	{/each}
</div>
