<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FiltersList from '$lib/components/filters-list.svelte';
	import Search from '$lib/components/search.svelte';
	import type { Filter } from '$lib/search.svelte';
	import { setContext } from 'svelte';
	import EmpleadorHeader from './empleador-header.svelte';
	import {
		newCertificacionesStore,
		newEmpleadorStore,
		newProcesosContactoStore
	} from '$lib/localstore.svelte';
	import SettingsSvg from '$lib/components/settings-svg.svelte';

	const { data, children } = $props();
	const { totalProcesos } = data;

	let searchTerm = $state('');
	let filters: Filter[] = $state([]);

	const store = newEmpleadorStore();

	setContext('empleador-store', store);

	const certificacionesStore = newCertificacionesStore();
	setContext('certificaciones', certificacionesStore);

	const procesosContactoStore = newProcesosContactoStore();
	setContext('procesos-contacto', procesosContactoStore);

	function handleSearch() {
		goto('/empleador/certificaciones?search=' + searchTerm);
	}
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<div class="flex flex-col gap-5 md:flex-row md:items-center">
		<ul class="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
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

	<EmpleadorHeader {totalProcesos} />

	{@render children()}
</main>
