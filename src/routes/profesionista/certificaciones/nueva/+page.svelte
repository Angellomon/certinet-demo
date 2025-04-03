<script lang="ts">
	import { generateId } from '$lib/demo-data';
	import type { Certificacion } from '$lib/entities';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { goto } from '$app/navigation';
	import {
		getCertificacionesContext,
		getCurrentProfesionistaContext
	} from '$lib/context.svelte.js';

	const currentProfesionistaStore = getCurrentProfesionistaContext();
	const certificacionesStore = getCertificacionesContext();

	let certificacion: Certificacion = $state({
		id: '',
		fechaObtencion: new Date(),
		nombre: '',
		idProfesionista: currentProfesionistaStore.id,
		organizacion: '',
		serie: '',
		verificado: false,
		vigencia: 0
	});

	let vigenciaToggle = $state(false);

	$effect(() => {
		if (vigenciaToggle) {
			certificacion.vigencia = -1;
		} else {
			certificacion.vigencia = 1;
		}
	});

	const handleDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		certificacion.fechaObtencion = new Date(e.currentTarget.value);
	};

	function createCertificacion() {
		certificacion.id = generateId();

		certificacionesStore.value.push(certificacion);

		goto('/profesionista/certificaciones');
	}
</script>

<main>
	<fieldset class="fieldset">
		<legend class="fieldset-legend text-2xl">Nueva Certificación</legend>
		<div class="flex flex-col justify-around md:flex-row md:justify-center">
			<div class="flex grow flex-col justify-around">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Nombre</label>
				<input type="text" class="input" placeholder="Nombre" bind:value={certificacion.nombre} />

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Organización</label>
				<input
					type="text"
					class="input"
					placeholder="Organización"
					bind:value={certificacion.organizacion}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Serie</label>
				<input type="text" class="input" placeholder="Serie" bind:value={certificacion.serie} />
			</div>

			<div class="flex grow flex-col justify-around">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Fecha de Obtención</label>
				<input
					type="date"
					class="input"
					placeholder="Fecha de Obtención"
					onchange={handleDateChange}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Vigencia en años</label>
				<input
					disabled={vigenciaToggle}
					type="number"
					class="input"
					placeholder="Vigencia (años)"
					min="0"
					bind:value={certificacion.vigencia}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Vigencia Vitalicia</label>
				<input type="checkbox" bind:checked={vigenciaToggle} class="toggle toggle-secondary" />
			</div>
		</div>
		<button onclick={createCertificacion} class="btn btn-primary md:w-xs">Crear</button>
	</fieldset>
</main>
