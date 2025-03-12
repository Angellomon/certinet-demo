<script lang="ts">
	import CountStat from '$lib/components/count-stat.svelte';
	import VerifiedStatus from '$lib/components/verified-status.svelte';
	import type { Profesionista } from '$lib/entities';

	const { profesionista, totalProcesos, totalCertificaciones } = $props<{
		profesionista: Profesionista;
		totalProcesos: number;
		totalCertificaciones: number;
	}>();
</script>

<div class="flex flex-col items-start justify-between md:flex-row">
	<div>
		<h1 class="text-4xl">{profesionista.nombre} {profesionista.apellidos}</h1>
		<div class="flex flex-col justify-start gap-10 md:flex-row md:items-center">
			<div class="link link-primary text-xl italic">{profesionista.correo}</div>

			<VerifiedStatus verified={profesionista.verificado}>
				{profesionista.verificado ? 'Verificado' : 'Verificación Pendiente'}
			</VerifiedStatus>
		</div>
	</div>
	<CountStat count={totalCertificaciones} title="Total Certificaciones" />
	<CountStat count={totalProcesos} title="Total Procesos" />
</div>
