<script>
	import TableProfesionistas from '$lib/components/table-profesionistas.svelte';
	
</script>

<h1 class="text-2xl pb-5">Profesionistas</h1>

<main class="flex flex-col gap-5">
	<TableProfesionistas showSearch baseURL="/admin/profesionistas"   />
</main>
