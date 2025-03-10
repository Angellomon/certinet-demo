<script lang="ts">
	import type { Certificacion, ProcesoContacto } from '$lib/entities';

	const { procesosContacto, certificacionesDataMap } = $props<{
		procesosContacto: ProcesoContacto[];
		certificacionesDataMap: Record<string, Certificacion>;
	}>();
</script>

<ul class="list bg-base-100 rounded-box shadow-md">
	{#each procesosContacto as proceso, i}
		{@const cert = certificacionesDataMap[proceso.idCertificacion]}
		{@const concluido = !!proceso.fechaFin}
		<a href={'/empleador/procesos/' + proceso.id}>
			<li class="list-row hover:border">
				<div>
					<div class="hover:font-bold">{cert.nombre}</div>
					{#if concluido}
						<div aria-label="status" class="status status-success"></div>
						Concluído
					{:else}
						<div aria-label="status" class="status status-primary"></div>
						En Proceso
					{/if}
				</div>
			</li>
		</a>
	{/each}
</ul>
