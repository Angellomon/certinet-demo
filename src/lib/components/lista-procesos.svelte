<script lang="ts">
	import {
		getCalificacionesProcesoContext,
		getCertificacionesContext,
		getComprasContext,
		getProcesosContext
	} from '$lib/context.svelte';
	import { getDemoEmpleadores, getDemoProfesionistas } from '$lib/demo-data';
	import type { Certificacion, ProcesoContacto } from '$lib/entities';

	interface Props {
		baseUrl: string;
		limit?: number;
		id: string;
		currentType: 'empleador' | 'profesionista';
		idsProcesos?: string[];
		showCalificacionProfesionista?: boolean;
		showCalificacionEmpleador?: boolean;
	}

	const {
		baseUrl,
		limit,
		id,
		currentType,
		idsProcesos,
		showCalificacionEmpleador,
		showCalificacionProfesionista
	}: Props = $props();

	const certificacionesStore = getCertificacionesContext();

	const certificacionesDataMap = $derived.by(() => {
		const map: Record<string, Certificacion> = {};

		for (let cert of certificacionesStore.value) {
			map[cert.id] = cert;
		}

		return map;
	});

	const procesosContactoStore = $derived.by(() =>
		getProcesosContext()
			.value.filter((p) =>
				currentType === 'empleador' ? p.idEmpleador === id : p.idProfesionista === id
			)
			.filter((p) => (idsProcesos ? idsProcesos.includes(p.id) : true))
	);

	const calificacionesStore = getCalificacionesProcesoContext();

	function getNombreEmpleador(idEmpleador: string) {
		const empleador = getDemoEmpleadores().find((e) => e.id === idEmpleador);

		return empleador ? empleador.razonSocial : '';
	}

	function getNombreProfesionista(idProfesionista: string) {
		const profesionista = getDemoProfesionistas().find((p) => p.id === idProfesionista);

		return profesionista ? profesionista.nombre + ' ' + profesionista.apellidos : '';
	}

	const rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
</script>

{#snippet rating(value: number, type: 'empleador' | 'profesionista')}
	<div
		class="tooltip flex flex-col justify-end justify-self-end"
		data-tip={currentType === 'profesionista'
			? 'Calificación al Empleador'
			: 'Calificación al Profesionista'}
	>
		<p class="text-end">Calificacion</p>
		<div class="rating rating-lg rating-half">
			<input type="radio" name="rating-11" class="rating-hidden" />

			{#each rates as rate, i}
				{@const checked = value >= rate}
				<input
					type="radio"
					name="rating-11"
					class="mask mask-star-2"
					class:bg-green-500={type === 'empleador'}
					class:bg-orange-500={type === 'profesionista'}
					class:mask-half-1={i % 2 == 0}
					class:mask-half-2={i % 2 != 0}
					aria-label={`${i + 1} star`}
					{checked}
				/>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet listRow(proceso: ProcesoContacto)}
	{@const cert = certificacionesDataMap[proceso.idCertificacion]}
	{@const concluido = !!proceso.fechaFin}
	<a href={baseUrl + '/' + proceso.id}>
		<li class="list-row hover:bg-base-300">
			<div class="w-full">
				<div class="text-lg font-bold">{cert.nombre}</div>
				<div class="flex w-full flex-row flex-wrap items-center gap-10">
					<div class="flex flex-row flex-wrap">
						<div class="">{getNombreEmpleador(proceso.idEmpleador)}</div>
						<div class="divider divider-horizontal divider-start">&</div>
						<div class="">{getNombreProfesionista(proceso.idProfesionista)}</div>
					</div>

					<div>
						{#if concluido}
							<div aria-label="status" class="status status-success"></div>
							Concluído
						{:else}
							<div aria-label="status" class="status status-primary"></div>
							En Proceso
						{/if}
					</div>

					{#if proceso.idCalificacion}
						{@const calificacion = calificacionesStore.value.find(
							(c) => c.id === proceso.idCalificacion
						)}

						{#if calificacion && showCalificacionEmpleador && calificacion.empleador}
							{@render rating(calificacion.empleador.valor, 'empleador')}
						{:else if calificacion && showCalificacionProfesionista && calificacion.profesionista}
							{@render rating(calificacion.profesionista.valor, 'profesionista')}
						{/if}
					{/if}
				</div>
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
