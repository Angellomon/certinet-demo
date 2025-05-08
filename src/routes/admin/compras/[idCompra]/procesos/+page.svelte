<script>
	import { page } from '$app/state';
	import TableProcesos from '$lib/components/tables/table-procesos-contacto.svelte';
	import { getCompraContext } from '$lib/context.svelte';

	const { idCompra } = page.params;

	const compraStore = getCompraContext(idCompra);
</script>

<main class="flex flex-col gap-5">
	<h1 class="pb-5 text-2xl">Procesos Contacto</h1>

	<TableProcesos baseURL="/admin/procesos" idsProcesos={compraStore.idsProcesosContacto} />
</main>
