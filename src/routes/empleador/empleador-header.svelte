<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import type { Empleador } from '$lib/entities';

	const { empleador, totalProcesos } = $props<{ empleador: Empleador; totalProcesos: number }>();
</script>

<div class="flex flex-row items-start justify-between">
	<div>
		<h1 class="text-4xl">{empleador.razonSocial}</h1>
		<div class="flex flex-col items-center justify-start gap-10 lg:flex-row">
			<div class="link link-primary text-xl italic">{empleador.correo}</div>

			{#if empleador.verificado}
				<VerifiedStatus verified text="Verificado" />
			{:else}
				<VerifiedStatus verified={false} text="Verificación Pendiente" />
			{/if}
		</div>
	</div>
	<CountStat count={totalProcesos} title="Total Procesos" />
</div>
