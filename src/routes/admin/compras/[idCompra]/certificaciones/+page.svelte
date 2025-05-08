<script>
	import { page } from '$app/state';
	import TableCertificaciones from '$lib/components/tables/table-certificaciones.svelte';
	import { getCompraContext, getProcesosContext } from '$lib/context.svelte';

	const { idCompra } = page.params;

	const compraStore = getCompraContext(idCompra);
	const procesosStore = getProcesosContext().value.filter((p) =>
		compraStore.idsProcesosContacto.includes(p.id)
	);

	const idsCerts = procesosStore.map((p) => p.idCertificacion);
</script>

<main class="flex flex-col gap-5">
	<h1 class="pb-5 text-2xl">Certificaciones</h1>
	<TableCertificaciones {idsCerts} baseURL="/admin/certificaciones" />
</main>
