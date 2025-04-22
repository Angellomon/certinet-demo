<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getBreadcrumbsContext,
		getProfesionistaContext,
		getSeccionAdminProfesionistaContext
	} from '$lib/context.svelte';
	import type { SeccionAdminProfesionista } from '$lib/entities';

	const { children } = $props();

	const { idProfesionista } = page.params;

	const profesionista = getProfesionistaContext(idProfesionista);

	const seccionAdminProfesionistaStore = getSeccionAdminProfesionistaContext();

	const menuData: {
		seccion: SeccionAdminProfesionista;
		title: string;
		url: string;
	}[] = [
		{
			seccion: 'datos',
			title: 'Datos',
			url: `/admin/profesionistas/${idProfesionista}`
		},
		{
			seccion: 'certificaciones',
			title: 'Certificaciones',
			url: `/admin/profesionistas/${idProfesionista}/certificaciones`
		}
	];

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: 'Profesionistas',
			url: '/admin/profesionistas'
		},
		{
			title: `${profesionista.nombre} ${profesionista.apellidos}`,
			url: `/admin/profesionistas/${idProfesionista}`
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			seccionAdminProfesionistaStore.value = 'datos';

			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<main class="flex flex-col gap-5 md:flex-row">
	<MenuSeccion
		urlMode
		vertical
		bind:current={seccionAdminProfesionistaStore.value}
		data={menuData}
	/>
	{@render children()}
</main>
