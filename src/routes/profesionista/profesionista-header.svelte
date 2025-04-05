<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import { getCurrentProfesionistaContext } from '$lib/context.svelte';
	import type { Profesionista } from '$lib/entities';

	const { totalProcesos, totalCertificaciones } = $props<{
		totalProcesos: number;
		totalCertificaciones: number;
	}>();

	const profesionista = getCurrentProfesionistaContext()
</script>

<div class="flex flex-col items-start justify-between md:flex-row">
	<div class="flex flex-col gap-3">
		<h1 class="text-4xl">{profesionista.nombre} {profesionista.apellidos}</h1>
		<div class="flex flex-col justify-start gap-10 md:flex-row md:items-center">
			<div class="link link-accent text-xl italic">{profesionista.correo}</div>

			<VerifiedStatus verified={profesionista.verificado}>
				{profesionista.verificado ? 'Verificado' : 'Verificación Pendiente'}
			</VerifiedStatus>
		</div>
	</div>
	<div class="flex flex-row flex-wrap">

		<CountStat count={totalCertificaciones} title="Total Certificaciones" />
		<CountStat count={totalProcesos} title="Total Procesos" />
	</div>
</div>
