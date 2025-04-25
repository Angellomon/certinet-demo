<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getBreadcrumbsContext,
		getEmpleadorContext,
		getSeccionAdminEmpleadorContext
	} from '$lib/context.svelte';
	import type { SeccionAdminEmpleador } from '$lib/entities';

	const { children } = $props();

	const { idEmpleador } = page.params;

	const empleador = getEmpleadorContext(idEmpleador);

	const seccionAdminEmpleador = getSeccionAdminEmpleadorContext();

	const menuData: {
		seccion: SeccionAdminEmpleador;
		title: string;
		url: string;
	}[] = [
		{
			seccion: 'datos',
			title: 'Datos',
			url: `/admin/profesionistas/${idEmpleador}`
		},
		{
			seccion: 'compras',
			title: 'Certificaciones',
			url: `/admin/profesionistas/${idEmpleador}/certificaciones`
		}
	];

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: `${empleador.razonSocial}`,
			url: `/admin/empleadores/${idEmpleador}`
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			seccionAdminEmpleador.value = 'datos';

			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<main class="flex flex-col gap-5 md:flex-row">
	<MenuSeccion urlMode vertical bind:current={seccionAdminEmpleador.value} data={menuData} />
	{@render children()}
</main>
