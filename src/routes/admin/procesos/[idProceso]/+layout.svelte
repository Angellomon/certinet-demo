<script lang="ts">
	import { page } from '$app/state';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import {
		getBreadcrumbsContext,
		getCertificacionContext,
		getEmpleadorContext,
		getProcesoContext,
		getProfesionistaContext,
		getSeccionAdminProcesoContext
	} from '$lib/context.svelte';
	import type { SeccionAdminProceso } from '$lib/entities';

	const { idProceso } = page.params;

	const { children } = $props();

	const procesoStore = getProcesoContext(idProceso);
	const empleadorStore = getEmpleadorContext(procesoStore.idEmpleador);
	const profesionistaStore = getProfesionistaContext(procesoStore.idProfesionista);
	const certificacionStore = getCertificacionContext(procesoStore.idCertificacion);

	const seccionAdminProceso = getSeccionAdminProcesoContext();

	const nombre = `${empleadorStore.razonSocial} & ${profesionistaStore.nombre} ${profesionistaStore.apellidos} | ${certificacionStore.nombre}`;

	const menuData: {
		seccion: SeccionAdminProceso;
		title: string;
		url: string;
	}[] = [
		{
			seccion: 'datos',
			title: 'Datos',
			url: `/admin/procesos/${idProceso}`
		},
		{
			seccion: 'profesionista',
			title: 'Profesionista',
			url: `/admin/procesos/${idProceso}/profesionista`
		},
		{
			seccion: 'empleador',
			title: 'Empleador',
			url: `/admin/procesos/${idProceso}/empleador`
		}
	];
	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: nombre,
			url: `/admin/procesos/${idProceso}`
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			seccionAdminProceso.value = 'datos';

			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<main class="flex flex-col gap-5 md:flex-row">
	<MenuSeccion urlMode vertical bind:current={seccionAdminProceso.value} data={menuData} />
	{@render children()}
</main>
