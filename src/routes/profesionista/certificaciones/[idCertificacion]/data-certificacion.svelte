<script lang="ts">
	import type { Certificacion } from '$lib/entities';
	const { certificacion } = $props<{ certificacion: Certificacion }>();

	let editMode = $state(false);

	function toggleEdit() {
		editMode = !editMode;
	}
</script>

<fieldset class="fieldset" disabled={!editMode}>
	<div class="flex flex-wrap justify-evenly gap-5">
		<div class="flex grow flex-col">
			<div>
				<legend class="fieldset-legend">Fecha de Obtención</legend>
				<input
					class="input"
					type="date"
					placeholder="YYYY-MM-DD"
					value={certificacion.fechaObtencion.toISOString().substr(0, 10)}
					onchange={(e) => {
						certificacion.fechaObtencion = new Date(e.currentTarget.value);
					}}
				/>
			</div>

			<div>
				<legend class="fieldset-legend">Organización</legend>
				<input class="input" type="text" bind:value={certificacion.organizacion} />
			</div>

			<div>
				<legend class="fieldset-legend">Nombre</legend>
				<input type="text" class="input" bind:value={certificacion.nombre} />
			</div>
		</div>

		<div class="flex grow flex-col">
			<div>
				<legend class="fieldset-legend">Serie</legend>
				<input class="input" type="text" bind:value={certificacion.serie} />
			</div>

			<div>
				<legend class="fieldset-legend">Organización</legend>
				<input class="input" type="number" bind:value={certificacion.vigencia} />
			</div>
		</div>
	</div>
</fieldset>

<button
	class={editMode ? 'btn btn-primary md:max-w-20' : 'btn btn-dash md:max-w-20'}
	onclick={toggleEdit}>{editMode ? 'Guardar' : 'Editar'}</button
>
