<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getBreadcrumbsContext,
		getCertificacionContext,
		getSeccionAdminCertificacionContext
	} from '$lib/context.svelte';
	import type { SeccionAdminCertificacion } from '$lib/entities';

	const { idCertificacion } = page.params;

	const { children } = $props();

	const certificacionStore = getCertificacionContext(idCertificacion);

	const seccionAdminCertificacion = getSeccionAdminCertificacionContext();

	const menuData: {
		seccion: SeccionAdminCertificacion;
		title: string;
		url: string;
	}[] = [
		{
			seccion: 'datos',
			title: 'Datos',
			url: `/admin/certificaciones/${idCertificacion}`
		},
		{
			seccion: 'profesionista',
			title: 'Profesionista',
			url: `/admin/certificaciones/${idCertificacion}/profesionista`
		}
	];

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: `${certificacionStore.nombre}`,
			url: `/admin/certificaciones/${idCertificacion}`
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			seccionAdminCertificacion.value = 'datos';

			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<main class="flex flex-col gap-5 md:flex-row">
	<MenuSeccion urlMode vertical bind:current={seccionAdminCertificacion.value} data={menuData} />
	{@render children()}
</main>
