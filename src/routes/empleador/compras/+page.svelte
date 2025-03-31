<script lang="ts">
	import ListaCompras from '$lib/components/lista-compras.svelte';
	import type { Compras, Empleador } from '$lib/entities.js';
	import type { LocalObjectStore } from '$lib/localstore.svelte.js';
	import { getContext } from 'svelte';

	const empleador: LocalObjectStore<Empleador> = getContext('empleador-store');
	const getComprasEmpleador: (id: string) => Compras = getContext('get-compras-empleador');

	const comprasEmpleador = $derived.by(() => getComprasEmpleador(empleador.value.id));
</script>

<main>
	<ListaCompras compras={comprasEmpleador} links />
</main>
