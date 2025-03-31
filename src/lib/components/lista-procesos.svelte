<script lang="ts">
	import {
		getCertificacionesContext,
		getEmpleadorContext,
		getProcesosContext
	} from '$lib/context.svelte';
	import { getDemoEmpleadores, getDemoProfesionistas } from '$lib/demo-data';
	import type {
		Certificacion,
		ProcesoContacto,
	} from '$lib/entities';

	interface Props {
		baseUrl: string;
		limit?: number;
	}

	const { baseUrl, limit }: Props = $props();

	const certificacionesStore = getCertificacionesContext();
	const empleadorStore = getEmpleadorContext();

	const certificacionesDataMap = $derived.by(() => {
		const map: Record<string, Certificacion> = {};

		for (let cert of certificacionesStore.value) {
			map[cert.id] = cert;
		}

		return map;
	});

	const procesosContactoStore = $derived.by(() =>
		getProcesosContext().value.filter((p) => p.idEmpleador === empleadorStore.value.id)
	);

	function getNombreEmpleador(idEmpleador: string) {
		const empleador = getDemoEmpleadores().find((e) => e.id === idEmpleador);

		return empleador ? empleador.razonSocial : '';
	}

	function getNombreProfesionista(idProfesionista: string) {
		const profesionista = getDemoProfesionistas().find((p) => p.id === idProfesionista);

		return profesionista ? profesionista.nombre + ' ' + profesionista.apellidos : '';
	}
</script>

{#snippet listRow(proceso: ProcesoContacto)}
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
{/snippet}

<ul class="list bg-base-200 rounded-box shadow-md">
	{#if limit}
		{#each procesosContactoStore.slice(0, limit) as proceso, i}
			{@render listRow(proceso)}
		{/each}
	{:else}
		{#each procesosContactoStore as proceso, i}
			{@render listRow(proceso)}
		{/each}
	{/if}
</ul>
