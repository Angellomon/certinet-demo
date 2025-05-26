<script lang="ts">
	import ButtonStripe from '$lib/components/button-stripe.svelte';
	import { getCurrentEmpleadorContext } from '$lib/context.svelte';
	import { getDefaultFormaPago, getDefaultPrecioCertificacion } from '$lib/demo-data';
	import { newLocalStore } from '$lib/localstore.svelte';
	import { Hash, NotePencil, X } from 'phosphor-svelte';
	import * as v from 'valibot';

	const empleadorStore = getCurrentEmpleadorContext();

	const seccionSchema = v.union([
		v.literal('datos'),
		v.literal('forma pago'),
		v.literal('precio certificacion')
	]);
	type Seccion = v.InferOutput<typeof seccionSchema>;

	const seccionObjSchema = v.object({
		seccion: seccionSchema
	});
	type SeccionObjType = v.InferOutput<typeof seccionObjSchema>;
	const seccionStore = newLocalStore(
		'seccion-empleador-config',
		{
			seccion: 'datos'
		},
		seccionObjSchema
	);

	let edit: Record<Seccion, boolean> = $state({
		datos: false,
		'forma pago': false,
		'precio certificacion': false
	});

	function toggleEdit(s: Seccion) {
		edit[s] = !edit[s];
	}

	function handleAgregarFormaPago() {
		empleadorStore.formaPago = getDefaultFormaPago();
	}

	function handleEliminarFormaPago() {
		empleadorStore.formaPago = null;
	}

	function setSeccion(s: Seccion) {
		seccionStore.value.seccion = s;
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

			<NotePencil class="size-5" />
		</button>
	</div>
{/snippet}

{#snippet formaPago()}
	<div class="flex flex-col gap-5">
		{#if empleadorStore.idPagoExterno}
			<div
				class="badge badge-neutral tooltip tooltip-right flex-nowrap text-nowrap"
				data-tip="ID Método de Pago"
			>
				<Hash class="size-5" />
				ID
				{empleadorStore.idPagoExterno}
			</div>
		{/if}
		<ButtonStripe idEmpelador={empleadorStore.id} />
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
