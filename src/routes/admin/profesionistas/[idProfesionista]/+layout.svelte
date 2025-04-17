<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getProfesionistaContext,
		getSeccionAdminProfesionistaContext,
		popBreadcrumbs,
		pushBreadcrumbs
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
		},
		{
			seccion: 'verificacion',
			title: 'Verificación',
			url: `/admin/profesionistas/${idProfesionista}/verificacion`
		}
	];

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

	$effect(() => {
		pushBreadcrumbs(...breadcrumbs);
		return () => {
			seccionAdminProfesionistaStore.value = 'datos';

			popBreadcrumbs(...breadcrumbs);
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
