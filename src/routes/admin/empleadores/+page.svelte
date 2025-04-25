<script>
	import TableEmpleadores from '$lib/components/tables/table-empleadores.svelte';
</script>

<h1 class="pb-5 text-2xl">Empleadores</h1>

<main class="flex flex-col gap-5">
	<TableEmpleadores showSearch baseURL="/admin/empleadores" />
</main>
