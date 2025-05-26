<script lang="ts">
	import { getCertificacionContext } from '$lib/context.svelte';
	import { formatISO, parseISO } from 'date-fns';

	interface Props {
		idCertificacion: string;
		edit?: boolean;
	}

	const { idCertificacion, edit = false }: Props = $props();

	const certificacionStore = getCertificacionContext(idCertificacion);

	function formatDate(date: Date) {
		return formatISO(date, { representation: 'date' });
	}

	function parseDate(date: string) {
		return parseISO(date);
	}
</script>

<fieldset class="fieldset" disabled={!edit}>
	<div class="flex flex-wrap justify-evenly gap-5">
		<div class="flex grow flex-col">
			<div>
				<legend class="fieldset-legend">Fecha de Obtención</legend>
				<input
					class="input"
					type="date"
					placeholder="YYYY-MM-DD"
					value={formatDate(certificacionStore.fechaObtencion)}
					onchange={(e) => {
						certificacionStore.fechaObtencion = parseDate(e.currentTarget.value);
					}}
				/>
			</div>

			<div>
				<legend class="fieldset-legend">Organización</legend>
				<input class="input" type="text" bind:value={certificacionStore.organizacion} />
			</div>

			<div>
				<legend class="fieldset-legend">Nombre</legend>
				<input type="text" class="input" bind:value={certificacionStore.nombre} />
			</div>
		</div>

		<div class="flex grow flex-col">
			<div>
				<legend class="fieldset-legend">Serie</legend>
				<input class="input" type="text" bind:value={certificacionStore.serie} />
			</div>

			<div>
				<legend class="fieldset-legend">Vigencia</legend>
				<input class="input" type="number" bind:value={certificacionStore.vigencia} />
			</div>
		</div>
	</div>
</fieldset>
