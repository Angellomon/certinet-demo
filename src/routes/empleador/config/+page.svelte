<script lang="ts">
	import CrossSvg from '$lib/components/cross-svg.svelte';
	import EditSvg from '$lib/components/edit-svg.svelte';
	import { getDefaultFormaPago, getDefaultPrecioCertificacion } from '$lib/demo-data';
	import type { Empleador } from '$lib/entities';
	import { newLocalStore, LocalStore } from '$lib/localstore.svelte';
	import { getContext } from 'svelte';
	import { value } from 'valibot';

	const empleadorStore = getContext<LocalStore<Empleador>>('empleador-store');

	type Seccion = 'datos' | 'forma pago' | 'precio certificacion';
	const seccionStore = newLocalStore('seccion-empleador-config', {
		seccion: 'datos'
	});

	let edit: Record<Seccion, boolean> = $state({
		datos: false,
		'forma pago': false,
		'precio certificacion': false
	});

	function toggleEdit(s: Seccion) {
		edit[s] = !edit[s];
	}

	function handleAgregarFormaPago() {
		empleadorStore.value.formaPago = getDefaultFormaPago();
	}

	function handleEliminarFormaPago() {
		empleadorStore.value.formaPago = null;
	}

	function setSeccion(s: Seccion) {
		seccionStore.value.seccion = s;
	}

	$effect(() => {
		if (!empleadorStore.value.precioCertificacion)
			empleadorStore.value.precioCertificacion = getDefaultPrecioCertificacion();
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

{#snippet menu()}
	<ul class="menu menu-vertical bg-base-200 rounded-box w-56">
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'datos'}
				onclick={() => setSeccion('datos')}>Datos</button
			>
		</li>
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'forma pago'}
				onclick={() => setSeccion('forma pago')}>Forma de Pago</button
			>
		</li>
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'precio certificacion'}
				onclick={() => setSeccion('precio certificacion')}>Pricing</button
			>
		</li>
	</ul>
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
				bind:value={empleadorStore.value.razonSocial}
				disabled={!edit['datos']}
			/>

			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="fieldset-label">Giro</label>
			<input
				type="text"
				class="input"
				placeholder="Giro"
				bind:value={empleadorStore.value.giro}
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

					empleadorStore.value.fechaEstablecimiento = new Date(e.currentTarget.value);
				}}
				value={empleadorStore.value.fechaEstablecimiento.toISOString().slice(0, 10)}
				disabled={!edit['datos']}
			/>

			{@render field(
				'Estatus Verificación',
				empleadorStore.value.verificado ? 'Verificado' : 'Verificación Pendiente'
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

{#snippet formaPago()}
	<div class="flex flex-col gap-5 md:flex-row">
		{#if empleadorStore.value.formaPago}
			<fieldset class="fieldset">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Tarjeta</label>
				<input
					type="text"
					class="input"
					placeholder="Razón Social"
					bind:value={empleadorStore.value.formaPago.tarjeta}
					disabled={!edit['forma pago']}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Giro</label>
				<input
					type="text"
					class="input"
					placeholder="Giro"
					bind:value={empleadorStore.value.giro}
					disabled={!edit['forma pago']}
				/>
			</fieldset>

			<div class="join join-vertical">
				<button class="btn" onclick={() => toggleEdit('forma pago')}>
					{#if edit['forma pago']}
						Guardar
					{:else}
						Editar
					{/if}
					<EditSvg />
				</button>
				<button class="btn" onclick={handleEliminarFormaPago}>
					<CrossSvg />
				</button>
			</div>
		{:else}
			<button class="btn btn-dash block w-full" onclick={handleAgregarFormaPago}
				>Agregar forma de pago</button
			>
		{/if}
	</div>
{/snippet}

{#snippet precioCertificacion()}
	{#if empleadorStore.value.precioCertificacion}
		<div class="flex flex-row flex-wrap gap-5">
			{@render field('Unidad', empleadorStore.value.precioCertificacion.unidad.toFixed(2))}
			{@render field('Decena', empleadorStore.value.precioCertificacion.decena.toFixed(2))}
			{@render field('Centena', empleadorStore.value.precioCertificacion.centena.toFixed(2))}
		</div>
	{/if}
{/snippet}

<h1 class="text-2xl">Configuración</h1>
<main class="flex justify-start">
	<div class="flex flex-col md:flex-row">
		{@render menu()}

		<div class="grow px-0 py-5 md:px-5 md:py-0">
			{#if seccionStore.value.seccion == 'datos'}
				{@render datos()}
			{:else if seccionStore.value.seccion == 'forma pago'}
				{@render formaPago()}
			{:else if seccionStore.value.seccion == 'precio certificacion'}
				{@render precioCertificacion()}
			{/if}
		</div>
	</div>
</main>
