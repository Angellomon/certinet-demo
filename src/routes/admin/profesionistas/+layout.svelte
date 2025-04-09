<script lang="ts">
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import { getSeccionAdminProfesionistasContext } from '$lib/context.svelte';

	let { children } = $props();

	const seccionAdminProfesionistasStore = getSeccionAdminProfesionistasContext();

	const dataMenu = [
		{
			seccion: 'dashboard',
			title: 'General',
			url: '/admin/profesionistas'
		},
		{
			seccion: 'verificacion',
			title: 'Verificación',
			url: '/admin/profesionistas/verificacion'
		},
		{
			seccion: 'listado',
			title: 'Listado',
			url: '/admin/profesionistas/listado'
		}
	];

	$effect(() => {
		return () => {
			seccionAdminProfesionistasStore.value = 'dashboard';
		};
	});
</script>

<h1 class="text-2xl">Profesionistas</h1>

<main class="flex justify-start">
	<div class="flex flex-col md:flex-row">
		<MenuSeccion bind:current={seccionAdminProfesionistasStore.value} data={dataMenu} urlMode />
		<div class="px-10 py-1">
			{@render children()}
		</div>
	</div>
</main>
