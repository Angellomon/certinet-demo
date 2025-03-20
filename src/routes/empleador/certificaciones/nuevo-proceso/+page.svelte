<script lang="ts">
	import { goto } from '$app/navigation';
	import FormPayment from '$lib/components/form-payment.svelte';
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';

	const { data } = $props();

	const { certificaciones } = data;

	function onSubmit() {
		const idsCerts = certificaciones.map((c) => c.id).join(',');
		goto(`/empleador/procesos?idsCerts=${idsCerts}`);
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
			<ListaCertificaciones {certificaciones} />
		</div>
		<div class="mx-3 flex flex-col gap-5">
			<h2 class="text-right text-xl">Info Pago</h2>
			<FormPayment {onSubmit} />
		</div>
	</div>
</main>
