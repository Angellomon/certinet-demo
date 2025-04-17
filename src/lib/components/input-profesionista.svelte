<script lang="ts">
	import { getProfesionistaContext } from '$lib/context.svelte';

	interface Props {
		idProfesionista: string;
		edit?: boolean;
	}

	const { idProfesionista, edit = false }: Props = $props();

	const profesionista = getProfesionistaContext(idProfesionista);
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

<fieldset class="fieldset">
	<legend class="legend text-xl">Datos</legend>

	<div class="flex flex-col md:flex-row md:gap-5">
		<div class="flex-flex-col">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Nombre</label>
			<input
				disabled={!edit}
				type="text"
				class="input"
				placeholder="Nombre"
				bind:value={profesionista.nombre}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Apellidos</label>
			<input
				disabled={!edit}
				type="text"
				class="input"
				placeholder="Apellidos"
				bind:value={profesionista.apellidos}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Correo</label>
			<input
				disabled={!edit}
				type="email"
				class="input"
				placeholder="Razón Social"
				bind:value={profesionista.correo}
			/>
		</div>

		<div class="flex flex-col">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Profesión</label>
			<input
				disabled={!edit}
				type="text"
				class="input"
				placeholder="Profesion"
				bind:value={profesionista.profesion}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Fecha de Nacimiento</label>
			<input
				disabled={!edit}
				type="date"
				class="input"
				placeholder="Fecha de Establecimiento"
				onchange={(e) => {
					if (!e.currentTarget.value || !profesionista) return;

					profesionista.fechaNacimeinto = new Date(e.currentTarget.value);
				}}
				value={profesionista.fechaNacimeinto.toISOString().slice(0, 10)}
			/>
		</div>
	</div>

	{@render field(
		'Estatus Verificación',
		profesionista.verificado ? 'Verificado' : 'Verificación Pendiente'
	)}
</fieldset>
