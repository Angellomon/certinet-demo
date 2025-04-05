<script lang="ts">
	import CrossSvg from '$lib/components/cross-svg.svelte';
	import EditSvg from '$lib/components/edit-svg.svelte';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import { getCurrentEmpleadorContext, getSeccionAdminConfigContext } from '$lib/context.svelte';
	import { getDefaultFormaPago, getDefaultPrecioCertificacion } from '$lib/demo-data';
	import type { SeccionAdminConfigSchema } from '$lib/entities';

	const empleadorStore = getCurrentEmpleadorContext();
	const seccionAdminConfigStore = getSeccionAdminConfigContext();

	const dataMenu = [
		{
			seccion: 'datos',
			title: 'Datos'
		},
		{
			seccion: 'avanzado',
			title: 'Avanzado'
		}
	];

	let edit: Record<SeccionAdminConfigSchema, boolean> = $state({
		datos: false,
		avanzado: false
	});

	function toggleEdit(s: SeccionAdminConfigSchema) {
		edit[s] = !edit[s];
	}

	function handleAgregarFormaPago() {
		empleadorStore.formaPago = getDefaultFormaPago();
	}

	function handleResetData() {
		localStorage.clear();
		location.reload();
	}

	$effect(() => {
		if (!empleadorStore.precioCertificacion)
			empleadorStore.precioCertificacion = getDefaultPrecioCertificacion();
	});
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

{#snippet statusStat(title: string, type: 'success' | 'error' | 'warning', value: string)}
	<div class="stats mx-2 w-40 text-right">
		<div class="">
			<div class="stat-title">
				{title}
			</div>
			<div class="stat-value text-lg">
				<div class="items inline-grid *:[grid-area:1/1]">
					{#if type == 'error'}
						<div aria-label="error" class="status status-md status-error animate-ping"></div>
						<div class="status status-md status-error"></div>
					{:else if type == 'success'}
						<div aria-label="success" class="status status-md status-success"></div>
						<div class="status status-md status-success"></div>
					{:else if type == 'warning'}
						<div aria-label="success" class="status status-md status-warning"></div>
						<div class="status status-md status-warning"></div>
					{/if}
				</div>
				{value}
			</div>
		</div>
	</div>
{/snippet}

{#snippet datos()}
	<div class="flex flex-col md:flex-row">
		<fieldset class="fieldset">
			<legend class="legend text-xl">Datos</legend>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Razón Social</label>
			<input
				type="text"
				class="input"
				placeholder="Razón Social"
				bind:value={empleadorStore.razonSocial}
				disabled={!edit['datos']}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Correo</label>
			<input
				type="email"
				class="input"
				placeholder="Razón Social"
				bind:value={empleadorStore.correo}
				disabled={!edit['datos']}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Giro</label>
			<input
				type="text"
				class="input"
				placeholder="Giro"
				bind:value={empleadorStore.giro}
				disabled={!edit['datos']}
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
				disabled={!edit['datos']}
			/>

			{@render field(
				'Estatus Verificación',
				empleadorStore.verificado ? 'Verificado' : 'Verificación Pendiente'
			)}
		</fieldset>
		<button class="btn" onclick={() => toggleEdit('datos')}>
			{#if edit['datos']}
				Guardar
			{:else}
				Editar
			{/if}
			<EditSvg />
		</button>
	</div>
{/snippet}

{#snippet avanzado()}
	<div class="flex flex-col gap-10">
		<button onclick={handleResetData} class="btn btn-neutral"> Reset Datos </button>
	</div>
{/snippet}

{#snippet precioCertificacion()}
	{#if empleadorStore.precioCertificacion}
		<div class="flex flex-row flex-wrap gap-5">
			{@render field('Unidad', empleadorStore.precioCertificacion.unidad.toFixed(2))}
			{@render field('Decena', empleadorStore.precioCertificacion.decena.toFixed(2))}
			{@render field('Centena', empleadorStore.precioCertificacion.centena.toFixed(2))}
		</div>
	{/if}
{/snippet}

<h1 class="text-2xl">Configuración</h1>
<main class="flex justify-start">
	<div class="flex flex-col md:flex-row">
		<MenuSeccion bind:current={seccionAdminConfigStore.value} data={dataMenu} />

		<div class="grow px-0 py-5 md:px-5 md:py-0">
			{#if seccionAdminConfigStore.value == 'datos'}
				{@render datos()}
			{:else if seccionAdminConfigStore.value === 'avanzado'}
				{@render avanzado()}
			{/if}
		</div>
	</div>
</main>
