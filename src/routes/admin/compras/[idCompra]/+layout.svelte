<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getBreadcrumbsContext,
		getCompraContext,
		getSeccionAdminCompraContext
	} from '$lib/context.svelte';
	import type { SeccionAdminCompra } from '$lib/entities';

	const { children } = $props();

	const { idCompra } = page.params;

	const compraStore = getCompraContext(idCompra);

	const seccionAdminCompraStore = getSeccionAdminCompraContext();

	const menuData: {
		seccion: SeccionAdminCompra;
		title: string;
		url: string;
	}[] = [
		{
			seccion: 'datos',
			title: 'Datos',
			url: `/admin/compras/${idCompra}`
		},
		{
			seccion: 'empleador',
			title: 'Empleador',
			url: `/admin/compras/${idCompra}/empleador`
		},
		{
			seccion: 'procesos',
			title: 'Procesos de Contacto',
			url: `/admin/compras/${idCompra}/procesos`
		},
		{
			seccion: 'certificaciones',
			title: 'Certificaciones',
			url: `/admin/compras/${idCompra}/certificaciones`
		}
	];

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: `${idCompra} | ${compraStore.monto.toFixed(2)}`,
			url: `/admin/profesionistas/${idCompra}`
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			seccionAdminCompraStore.value = 'datos';

			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<main class="flex flex-col gap-5 md:flex-row">
	<MenuSeccion urlMode vertical bind:current={seccionAdminCompraStore.value} data={menuData} />
	{@render children()}
</main>
