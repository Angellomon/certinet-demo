<script lang="ts">
	import ListaCompras from '$lib/components/lists/lista-compras.svelte';
	import { getCurrentEmpleadorContext } from '$lib/context.svelte';
	import type { Compras } from '$lib/entities.js';
	import { getContext } from 'svelte';

	const empleador = getCurrentEmpleadorContext()
	const getComprasEmpleador: (id: string) => Compras = getContext('get-compras-empleador');

	const comprasEmpleador = $derived.by(() => getComprasEmpleador(empleador.id));
</script>

<main>
	<ListaCompras compras={comprasEmpleador} links />
</main>
