<script lang="ts">
	import { getEmpleadorContext } from '$lib/context.svelte';

	interface Props {
		idEmpleador: string;
		edit?: boolean;
	}

	const { idEmpleador, edit = false }: Props = $props();

	const empleadorStore = getEmpleadorContext(idEmpleador);
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

<fieldset class="fieldset">
	<legend class="legend text-xl">Datos</legend>

	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="fieldset-label">Razón Social</label>
	<input
		type="text"
		class="input"
		placeholder="Razón Social"
		bind:value={empleadorStore.razonSocial}
		disabled={!edit}
	/>

	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="fieldset-label">Correo</label>
	<input
		type="email"
		class="input"
		placeholder="Razón Social"
		bind:value={empleadorStore.correo}
		disabled={!edit}
	/>

	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="fieldset-label">Giro</label>
	<input
		type="text"
		class="input"
		placeholder="Giro"
		bind:value={empleadorStore.giro}
		disabled={!edit}
	/>

	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="fieldset-label">Fecha de Establecimiento</label>
	<input
		type="date"
		class="input"
		placeholder="Fecha de Establecimiento"
		onchange={(e) => {
			if (!e.currentTarget.value) return;

			empleadorStore.fechaEstablecimiento = new Date(e.currentTarget.value);
		}}
		value={empleadorStore.fechaEstablecimiento.toISOString().slice(0, 10)}
		disabled={!edit}
	/>

	{@render field(
		'Estatus Verificación',
		empleadorStore.verificado ? 'Verificado' : 'Verificación Pendiente'
	)}
</fieldset>
