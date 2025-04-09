<script>
	import TableProfesionistas from '$lib/components/table-profesionistas.svelte';
</script>

<h1 class="text-2xl">General</h1>

<main class="flex flex-col gap-5 overflow-scroll">
	<h2 class="text-xl">Recientes</h2>
	<TableProfesionistas limit={10} />
</main>
