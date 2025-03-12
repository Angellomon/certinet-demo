<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Search from '$lib/components/search.svelte';
	import EmpleadorHeader from './empleador-header.svelte';

	const { data, children } = $props();
	const { currentEmpleador, totalProcesos } = data;

	let searchTerm = $state('');

	function handleSearch() {
		goto('/empleador/certificaciones?search=' + searchTerm);
	}
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<div class="flex flex-col gap-5 md:flex-row md:items-center">
		<ul class="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
			<li>
				<a class={page.url.pathname === '/empleador' ? 'menu-active' : ''} href="/empleador"
					>Dashboard</a
				>
			</li>
			<li>
				<a
					class={page.url.pathname.includes('/empleador/procesos') ? 'menu-active' : ''}
					href="/empleador/procesos">Procesos</a
				>
			</li>
			<li>
				<a
					class={page.url.pathname.includes('/empleador/certificaciones') ? 'menu-active' : ''}
					href="/empleador/certificaciones">Buscador</a
				>
			</li>
			<!-- <li><a>Configuración</a></li> -->
		</ul>

		<div class="grow">
			<Search bind:searchTerm onsearch={handleSearch} />
		</div>
	</div>

	<EmpleadorHeader empleador={currentEmpleador} {totalProcesos} />

	{@render children()}
</main>
