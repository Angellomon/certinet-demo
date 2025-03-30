<script lang="ts">
	import { goto } from '$app/navigation';
	import FormPayment from '$lib/components/form-payment.svelte';
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';
	import { generateId } from '$lib/demo-data.js';
	import type { Empleador, ProcesosContacto } from '$lib/entities.js';
	import type { LocalObjectStore } from '$lib/localstore.svelte.js';
	import { getContext } from 'svelte';

	const { data } = $props();

	const empleador: LocalObjectStore<Empleador> = getContext('empleador-store');
	const procesos: LocalObjectStore<ProcesosContacto> = getContext('procesos-contacto');

	const { certificaciones: certs } = data;

	let certificaciones = $state(certs);

	let monto = $derived(certificaciones.length * (empleador.value.precioCertificacion?.unidad || 1));

	function onSubmit() {
		// const idsCerts = certificaciones.map((c) => c.id).join(',');

		goto(`/empleador/procesos`);
	}
</script>

<main>
	<div class="mb-3">
		{#if certificaciones.length > 1}
			<h1 class="text-3xl">Nuevo Proceso de Contacto</h1>
		{:else}
			<h1 class="text-3xl">Nuevos Procesos de Contacto</h1>
		{/if}
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="mx-3">
			<h2 class="text-right text-xl">Certificaciones Seleccionadas</h2>
			<ListaCertificaciones bind:certificaciones />
		</div>
		<div class="mx-3 flex flex-col gap-5">
			<h2 class="text-right text-xl">Info Pago</h2>
			<FormPayment {monto} {onSubmit} />

			<button class="btn m1l-5" onclick={() => history.back()}>Cancelar</button>
		</div>
	</div>
</main>
