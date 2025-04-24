<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FormPayment from '$lib/components/inputs/inputs-payment.svelte';
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';
	import {
		getCertificacionesContext,
		getComprasContext,
		getCurrentEmpleadorContext,
		getProcesosContext,
		getProfesionistasContext
	} from '$lib/context.svelte.js';
	import { generateId } from '$lib/demo-data.js';
	import type { Compra, FormaPago, ProcesosContacto } from '$lib/entities.js';
	import { error } from '@sveltejs/kit';

	const empleador = getCurrentEmpleadorContext();
	const procesos = getProcesosContext();
	const profesionistas = getProfesionistasContext();
	const compras = getComprasContext();

	const certIds: string[] = page.url.searchParams.get('certIds')?.split(',') || [];
	if (certIds.length < 1) error(400, 'too few certs');

	const certs = getCertificacionesContext();
	let certificaciones = $derived(certs.value.filter((c) => certIds.includes(c.id)));

	let monto = $derived(certificaciones.length * (empleador.precioCertificacion?.unidad || 1));

	function createNewProcesos() {
		const idsProfesionistas = certificaciones.map((c) => c.idProfesionista).join(',');

		const profesionistasResult = profesionistas.value.filter((p) =>
			idsProfesionistas.includes(p.id)
		);

		const procesosNuevos: ProcesosContacto = [];

		for (let certificacion of certificaciones) {
			const profesionistaResult = profesionistasResult.find(
				(p) => p.id == certificacion.idProfesionista
			);
			if (!profesionistaResult) continue;

			procesosNuevos.push({
				id: generateId(),
				contacto: {
					tipo: 'email',
					empleador: empleador.correo,
					profesionista: profesionistaResult.correo
				},
				fechaInicio: new Date(),
				fechaFin: null,
				idCalificacion: null,
				idCertificacion: certificacion.id,
				idEmpleador: empleador.id,
				idProfesionista: profesionistaResult.id
			});
		}

		procesos.value = procesos.value.concat(procesosNuevos);

		return procesosNuevos;
	}

	function createNewCompra(dataFormaPago: FormaPago, idsProcesosContacto: string[]) {
		if (!empleador.precioCertificacion) return;

		const compra: Compra = {
			fecha: new Date(),
			id: generateId(),
			idEmpleador: empleador.id,
			idsProcesosContacto,
			monto,
			precio: empleador.precioCertificacion,
			status: 'en proceso',
			promocion: null
		};

		compras.value.push(compra);
	}

	function onFormaPagoSubmit(dataFormaPago: FormaPago) {
		const procesosNuevos = createNewProcesos();

		createNewCompra(
			dataFormaPago,
			procesosNuevos.map((p) => p.id)
		);

		goto(`/empleador/compras`);
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
			<h2 class="mb-5 text-right text-xl">Certificaciones Seleccionadas</h2>
			<ListaCertificaciones {certificaciones} />
		</div>
		<div class="mx-3 flex flex-col gap-5">
			<div class="ml-5 flex flex-row justify-between">
				<h2 class="text-right text-xl font-bold">Monto: $ {monto.toFixed(2)}</h2>
				<h2 class="text-right text-xl">Info Pago</h2>
			</div>

			<FormPayment onSubmit={onFormaPagoSubmit} />

			<button class="btn ml-5" onclick={() => history.back()}>Cancelar</button>
		</div>
	</div>
</main>
