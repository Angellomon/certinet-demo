<script lang="ts">
	import { page } from '$app/state';
	import EmpleadorHeader from './empleador-header.svelte';

	const { data, children } = $props();
	const { currentEmpleador, totalProcesos } = data;
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
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
		<!-- <li><a>Configuración</a></li> -->
	</ul>

	<EmpleadorHeader empleador={currentEmpleador} {totalProcesos} />

	{@render children()}
</main>
