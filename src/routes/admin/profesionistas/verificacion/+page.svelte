<script lang="ts">
	import TableProfesionistas from "$lib/components/table-profesionistas.svelte";

</script>

<main class="flex flex-col gap-5 overflow-scroll">
	<h1 class="text-2xl">Verificación</h1>

	<TableProfesionistas showVerifyActions />
</main>
