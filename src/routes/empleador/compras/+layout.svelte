<script lang="ts">
	import type { Empleador } from '$lib/entities.js';
	import type { LocalObjectStore } from '$lib/localstore.svelte.js';
	import { getContext } from 'svelte';

	const { children, data } = $props();

	const { totalCertificacionesAdquiridas, totalCompras, ultimaCompra } = data;

	const empleador: LocalObjectStore<Empleador> = getContext('empleador-store');

	let metodoPagoHover = $state(false);

	function handleMetodoPagoMouseEnter() {
		metodoPagoHover = true;
	}

	function handleMetodoPagoMouseLeave() {
		metodoPagoHover = false;
	}
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

{#snippet statusStat(title: string, type: 'success' | 'error' | 'warning', value: string)}
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
					{:else if type == 'warning'}
						<div aria-label="warning" class="status status-lg status-warning"></div>
						<div class="status status-lg status-warning"></div>
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

				{#if !empleador.value.formaPago}
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a
						href="/empleador/config"
						class="bg-base-200 hover:bg-base-300 rounded-box cursor-pointer"
						onmouseenter={handleMetodoPagoMouseEnter}
						onmouseleave={handleMetodoPagoMouseLeave}
					>
						{#if metodoPagoHover}
							{@render statusStat('Forma de Pago', 'success', 'Configurar')}
						{:else}
							{@render statusStat('Forma de Pago', 'error', 'No establecida')}
						{/if}
					</a>
				{:else if empleador.value.formaPago.verificado}
					{@render statusStat('Forma de Pago', 'success', 'Verificada')}
				{:else}
					{@render statusStat('Forma de Pago', 'warning', 'No verificada')}
				{/if}
			</div>
		</div>
	</div>

	<div class="divider 1"></div>

	{@render children()}
</main>
