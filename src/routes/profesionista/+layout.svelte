<script lang="ts">
	import { page } from '$app/state';
	import {
		newCurrentEmpleadorStore,
		newCurrentProfesionistaStore,
	} from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import ProfesionistaHeader from './profesionista-header.svelte';
	import { goto } from '$app/navigation';
	import SettingsSvg from '$lib/components/settings-svg.svelte';
	import { getCertificacionesContext, getProcesosContext } from '$lib/context.svelte';

	const { children } = $props();

	const currentProfesionistaStore = newCurrentProfesionistaStore();
	setContext('profesionista', currentProfesionistaStore);

	const procesosContactoStore = getProcesosContext()

	const certificacionesStore = getCertificacionesContext()

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
		{totalProcesos}
		{totalCertificaciones}
	/>

	<div class="flex-row-flex-wrap flex-col sm:flex-row flex items-center justify-between">
		<ul class="menu justify-around menu-horizontal bg-base-200 rounded-box">
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
