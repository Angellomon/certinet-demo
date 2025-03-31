<script lang="ts">
	import ListaCompras from '$lib/components/lista-compras.svelte';
	import { getEmpleadorContext } from '$lib/context.svelte';
	import type { Compras } from '$lib/entities.js';
	import { getContext } from 'svelte';

	const empleador = getEmpleadorContext()
	const getComprasEmpleador: (id: string) => Compras = getContext('get-compras-empleador');

	const comprasEmpleador = $derived.by(() => getComprasEmpleador(empleador.value.id));
</script>

<main>
	<ListaCompras compras={comprasEmpleador} links />
</main>
