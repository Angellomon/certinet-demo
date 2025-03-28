<script lang="ts">
	const { children, data } = $props();

	const { totalCertificacionesAdquiridas, totalCompras, ultimaCompra, empleador } = data;
</script>

{#snippet stat(title: string, value: string, desc?: string)}
	<div class="stats">
		<div class="stat">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value">
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

{#snippet statusStat(title: string, type: 'success' | 'error', value: string)}
	<div class="stats">
		<div class="stat">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value text-2xl">
				<div class="items inline-grid *:[grid-area:1/1]">
					{#if type == 'error'}
						<div aria-label="error" class="status status-lg status-error animate-ping"></div>
						<div class="status status-lg status-error"></div>
					{:else if type == 'success'}
						<div aria-label="success" class="status status-lg status-success"></div>
						<div class="status status-lg status-success"></div>
					{/if}
				</div>
				{value}
			</div>
		</div>
	</div>
{/snippet}

<main class="flex flex-col">
	<div class="flex flex-col">
		<h3 class="text-2xl">Compras</h3>

		<div class="flex flex-col gap-10 md:flex-row md:justify-start">
			<div class="felx-row flex flex-wrap justify-evenly">
				{@render stat('Certificaciones adquiridas', `${totalCertificacionesAdquiridas}`)}
				{@render stat('Compras realizadas', `${totalCompras}`)}
				{@render stat('Última compra', ultimaCompra.fecha.toISOString().substring(0, 10))}

				{#if !empleador.formaPago}
					{@render statusStat('Forma de Pago', 'error', 'No establecida.')}
				{:else if empleador.formaPago.verificado}
					{@render statusStat('Forma de Pago', 'success', 'Verificada.')}
				{:else}
					{@render statusStat('Forma de Pago', 'error', 'No verificada.')}
				{/if}
			</div>
		</div>
	</div>

  <div class="divider 1"></div>

	{@render children()}
</main>
