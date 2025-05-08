<script>
	import TableCertificaciones from "$lib/components/tables/table-certificaciones.svelte";

</script>

<h1 class="pb-5 text-2xl">Certificaciones</h1>

<main class="flex flex-col gap-5">
	<TableCertificaciones showSearch baseURL="/admin/certificaciones" />
</main>
