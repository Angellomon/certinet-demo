<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import type { Empleador } from '$lib/entities';
	import { LocalObjectStore } from '$lib/localstore.svelte';
	import { getContext } from 'svelte';

	interface Props {
		totalProcesos: number;
	}

	const { totalProcesos }: Props = $props();

	const empleadorStore: LocalObjectStore<Empleador> = getContext('empleador-store');

	const localEmpleador = getContext<LocalObjectStore<Empleador>>('empleador-store');
</script>

<div class="flex flex-col items-start justify-between md:flex-row">
	<div>
		<h1 class="text-4xl">{localEmpleador.value.razonSocial}</h1>
		<div class="flex flex-col justify-start gap-10 md:flex-row md:items-center">
			<div class="link link-primary text-xl italic">{empleadorStore.value.correo}</div>

			<VerifiedStatus verified={empleadorStore.value.verificado}>
				{empleadorStore.value.verificado ? 'Verificado' : 'Verificación Pendiente'}
			</VerifiedStatus>
		</div>
	</div>
	<CountStat count={totalProcesos} title="Total Procesos" />
</div>
