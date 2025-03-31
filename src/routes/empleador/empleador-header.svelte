<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import { getEmpleadorContext } from '$lib/context.svelte';

	interface Props {
		totalProcesos: number;
	}

	const { totalProcesos }: Props = $props();

	const empleadorStore = getEmpleadorContext();
</script>

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

<div class="flex flex-col items-start justify-between md:flex-row">
	<div>
		<h1 class="text-4xl">{empleadorStore.value.razonSocial}</h1>
		<div class="flex flex-col justify-start gap-10 md:flex-row md:items-center">
			<div class="link link-primary text-xl italic">{empleadorStore.value.correo}</div>
		</div>
	</div>

	<div>
		{@render statusStat(
			'Estatus',
			empleadorStore.value.verificado ? 'success' : 'warning',
			empleadorStore.value.verificado ? 'Verificado' : 'Pendiente de Verificar'
		)}
	
		{#if !empleadorStore.value.formaPago}
			{@render statusStat('Forma de Pago', 'error', 'No Establecida')}
		{/if}
	
		<CountStat count={totalProcesos} title="Total Procesos" />
	</div>
</div>
