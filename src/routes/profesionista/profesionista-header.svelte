<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import type { Profesionista } from '$lib/entities';

	const { profesionista, totalProcesos, totalCertificaciones } = $props<{ profesionista: Profesionista; totalProcesos: number, totalCertificaciones: number }>();

</script>

<div class="flex flex-col md:flex-row items-start justify-between">
	<div>
		<h1 class="text-4xl">{profesionista.nombre} {profesionista.apellidos}</h1>
		<div class="flex flex-col md:items-center justify-start gap-10 md:flex-row">
			<div class="link link-primary text-xl italic">{profesionista.correo}</div>

			{#if profesionista.verificado}
				<VerifiedStatus verified text="Verificado" />
			{:else}
				<VerifiedStatus verified={false} text="Verificación Pendiente" />
			{/if}
		</div>
	</div>
	<CountStat count={totalCertificaciones} title="Total Certificaciones" />
	<CountStat count={totalProcesos} title="Total Procesos" />
</div>
