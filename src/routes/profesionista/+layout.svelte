<script lang="ts">
	import { page } from '$app/state';
	import {
		newCalificacionesProcesoStore,
		newCertificacionesStore,
		newCurrentEmpleadorStore,
		newCurrentProfesionistaStore,
		newEmpleadoresStore,
		newProcesosContactoStore,
		newProfesionistasStore
	} from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import ProfesionistaHeader from './profesionista-header.svelte';
	import { goto } from '$app/navigation';
	import SettingsSvg from '$lib/components/settings-svg.svelte';

	const { children } = $props();

	const profesionistasStore = newProfesionistasStore();
	setContext('profesionistas', profesionistasStore);

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

	function handleConfigClick() {
		goto('/profesionista/config');
	}
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<ProfesionistaHeader
		profesionista={currentProfesionistaStore.value}
		{totalProcesos}
		{totalCertificaciones}
	/>

	<div class="flex-row-flex-wrap flex items-center justify-between">
		<ul class="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
			<li>
				<a
					class={page.url.pathname === '/profesionista' ? 'menu-active' : ''}
					href="/profesionista"
				>
					Dashboard
				</a>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/procesos')}
					href="/profesionista/procesos"
				>
					Procesos
				</a>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/certificaciones')}
					href="/profesionista/certificaciones"
				>
					Certificaciones
				</a>
			</li>
			<!-- <li><a>Configuración</a></li> -->
		</ul>

		<button
			class="btn"
			class:btn-neutral={page.url.pathname.includes('/config')}
			onclick={handleConfigClick}
		>
			<SettingsSvg />
			Configuración
		</button>
	</div>

	{@render children()}
</main>
