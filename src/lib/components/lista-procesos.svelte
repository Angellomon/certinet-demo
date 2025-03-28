<script lang="ts">
	import { getDemoEmpleadores, getDemoProfesionistas } from '$lib/demo-data';
	import type { Certificacion, ProcesoContacto } from '$lib/entities';

	const { procesosContacto, certificacionesDataMap, baseUrl } = $props<{
		procesosContacto: ProcesoContacto[];
		certificacionesDataMap: Record<string, Certificacion>;
		baseUrl: string;
	}>();

	function getNombreEmpleador(idEmpleador: string) {
		const empleador = getDemoEmpleadores().find((e) => e.id === idEmpleador);

		return empleador ? empleador.razonSocial : '';
	}

	function getNombreProfesionista(idProfesionista: string) {
		const profesionista = getDemoProfesionistas().find((p) => p.id === idProfesionista);

		return profesionista ? profesionista.nombre + ' ' + profesionista.apellidos : '';
	}
</script>

<ul class="list bg-base-200 rounded-box shadow-md">
	{#each procesosContacto as proceso, i}
		{@const cert = certificacionesDataMap[proceso.idCertificacion]}
		{@const concluido = !!proceso.fechaFin}
		<a href={baseUrl + '/' + proceso.id}>
			<li class="list-row hover:bg-base-300">
				<div>
					<div class="flex flex-col items-center md:flex-row">
						<div class="text-lg font-bold">{cert.nombre}</div>
						<div class="divider lg:divider-horizontal">|</div>
						<div class="">{getNombreEmpleador(proceso.idEmpleador)}</div>
						<div class="divider lg:divider-horizontal">&</div>
						<div class="">{getNombreProfesionista(proceso.idProfesionista)}</div>
					</div>
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
