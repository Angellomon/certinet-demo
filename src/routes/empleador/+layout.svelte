<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FiltersList from '$lib/components/filters-list.svelte';
	import Search from '$lib/components/search.svelte';
	import type { Filter } from '$lib/search.svelte';
	import { setContext } from 'svelte';
	import EmpleadorHeader from './empleador-header.svelte';
	import {
		newCalificacionesProcesoStore,
		newCertificacionesStore,
		newComprasStore,
		newCurrentEmpleadorStore,
		newCurrentProfesionistaStore,
		newProcesosContactoStore,
		newProfesionistasStore
	} from '$lib/localstore.svelte';
	import SettingsSvg from '$lib/components/settings-svg.svelte';
	import { getComprasContext, getProcesosContext } from '$lib/context.svelte';

	const { children } = $props();

	let searchTerm = $state('');
	let filters: Filter[] = $state([]);

	const empleadorStore = newCurrentEmpleadorStore();

	setContext('empleador-store', empleadorStore);

	const currentProfesionistaStore = newCurrentProfesionistaStore();
	setContext('profesionista', currentProfesionistaStore);

	const procesosContactoStore = getProcesosContext();

	const comprasStore = getComprasContext();

	const getComprasEmpleador = (idEmpleador: string) => {
		return comprasStore.value.filter((c) => c.idEmpleador === idEmpleador);
	};
	setContext('get-compras-empleador', getComprasEmpleador);

	function handleSearch() {
		goto('/empleador/certificaciones?search=' + searchTerm);
	}
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<EmpleadorHeader totalProcesos={procesosContactoStore.value.length} />

	<div class="flex flex-row flex-wrap gap-5 md:items-center">
		<ul class="menu menu-horizontal bg-base-200 rounded-box justify-around">
			<li>
				<a class:menu-active={page.url.pathname === '/empleador'} href="/empleador">Dashboard</a>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/empleador/procesos')}
					href="/empleador/procesos">Procesos</a
				>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/empleador/certificaciones')}
					href="/empleador/certificaciones">Buscador</a
				>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/empleador/compras')}
					href="/empleador/compras">Compras</a
				>
			</li>
			<!-- <li><a>Configuración</a></li> -->
		</ul>

		<div class="grow">
			<Search bind:filters bind:searchTerm onsearch={handleSearch} />
		</div>

		<button
			class={`btn ${page.url.pathname.includes('/empleador/config') ? 'btn-neutral' : ''}`}
			onclick={() => goto('/empleador/config')}
		>
			Configuración <SettingsSvg />
		</button>
	</div>

	{#if filters.length > 0}
		<FiltersList bind:filters />
	{/if}

	{@render children()}
</main>
