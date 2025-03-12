<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import type { Empleador } from '$lib/entities';

	const { empleador, totalProcesos } = $props<{ empleador: Empleador; totalProcesos: number }>();
</script>

<div class="flex flex-col items-start justify-between md:flex-row">
	<div>
		<h1 class="text-4xl">{empleador.razonSocial}</h1>
		<div class="flex flex-col justify-start gap-10 md:flex-row md:items-center">
			<div class="link link-primary text-xl italic">{empleador.correo}</div>

			<VerifiedStatus verified={empleador.verificado}>
				{empleador.verificado ? 'Verificado' : 'Verificación Pendiente'}
			</VerifiedStatus>
		</div>
	</div>
	<CountStat count={totalProcesos} title="Total Procesos" />
</div>
