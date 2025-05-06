<script lang="ts">
	import { page } from '$app/state';
	import TableCompras from '$lib/components/tables/table-compras.svelte';

	const { idEmpleador } = page.params;
</script>

<main class="flex flex-col gap-5">
	<TableCompras {idEmpleador} />
</main>
