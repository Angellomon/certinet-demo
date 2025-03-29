<script lang="ts">
	import ListaCompras from '$lib/components/lista-compras.svelte';

	const { data } = $props();

	const { compras } = data;
</script>

<main>
	<ListaCompras {compras} links />
</main>
