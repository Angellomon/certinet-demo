<script lang="ts">
	import { page } from '$app/state';
	import {
		newCalificacionesProcesoStore,
		newCertificacionesStore,
		newCurrentEmpleadorStore,
		newCurrentProfesionistaStore,
		newEmpleadoresStore,
		newProcesosContactoStore
	} from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import ProfesionistaHeader from './profesionista-header.svelte';

	const { children } = $props();

	const currentProfesionistaStore = newCurrentProfesionistaStore();
	setContext('profesionista', currentProfesionistaStore);

	const procesosContactoStore = newProcesosContactoStore();
	setContext('procesos-contacto', procesosContactoStore);

	const certificacionesStore = newCertificacionesStore();
	setContext('certificaciones', certificacionesStore);

	const empleadoresStore = newEmpleadoresStore();
	setContext('empleadores', empleadoresStore);

	const calificacionesStore = newCalificacionesProcesoStore();
	setContext('calificaciones-proceso', calificacionesStore);

	const currentEmpleadorStore = newCurrentEmpleadorStore();
	setContext('empleador-store', currentEmpleadorStore);

	const totalCertificaciones = $derived(
		certificacionesStore.value.filter(
			(c) => c.idProfesionista === currentProfesionistaStore.value.id
		).length
	);

	const totalProcesos = $derived(
		procesosContactoStore.value.filter(
			(p) => p.idProfesionista === currentProfesionistaStore.value.id
		).length
	);
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<ul class="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
		<li>
			<a class={page.url.pathname === '/profesionista' ? 'menu-active' : ''} href="/profesionista"
				>Dashboard</a
			>
		</li>
		<li>
			<a
				class={page.url.pathname.includes('/procesos') ? 'menu-active' : ''}
				href="/profesionista/procesos">Procesos</a
			>
		</li>
		<li>
			<a
				class={page.url.pathname.includes('/certificaciones') ? 'menu-active' : ''}
				href="/profesionista/certificaciones">Certificaciones</a
			>
		</li>
		<!-- <li><a>Configuración</a></li> -->
	</ul>

	<ProfesionistaHeader
		profesionista={currentProfesionistaStore.value}
		{totalProcesos}
		{totalCertificaciones}
	/>

	{@render children()}
</main>
