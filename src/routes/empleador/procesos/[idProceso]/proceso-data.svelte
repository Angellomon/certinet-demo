<script lang="ts">
	import type { Certificacion, Empleador, ProcesoContacto, Profesionista } from '$lib/entities';

	const {
		proceso,
		certificacion,
		empleador,
		profesionista
	}: {
		profesionista: Profesionista;
		proceso?: ProcesoContacto;
		certificacion: Certificacion;
		empleador?: Empleador;
	} = $props();
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

<div class="flex flex-col md:flex-row">
	<div class="flex grow flex-col">
		{@render field('Nombre', profesionista.nombre)}
		{@render field('Apellidos', profesionista.apellidos)}
		{@render field('Contacto', profesionista.correo)}
	</div>

	<div class="flex grow flex-col">
		{@render field('Certificación', certificacion.nombre)}
		{@render field('#', certificacion.id)}
		{@render field('Fecha de obtención', certificacion.fechaObtencion.toISOString())}

		{#if certificacion.vigencia > 1}
			{@render field('Vigencia', `${certificacion.vigencia} años`)}
		{:else if certificacion.vigencia == 1}
			{@render field('Vigencia', `1 año`)}
		{:else if certificacion.vigencia <= -1}
			{@render field('Vigencia', 'Vitalicia')}
		{/if}
	</div>
</div>
