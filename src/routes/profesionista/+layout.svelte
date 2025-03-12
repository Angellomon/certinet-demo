<script lang="ts">
	import { page } from '$app/state';
	import ProfesionistaHeader from './profesionista-header.svelte';

	const { data, children,  } = $props();
	const { currentProfesionista, totalProcesos, totalCertificaciones } = data;

	console.log(page.url.pathname);
	
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<ul class="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
		<li><a class={page.url.pathname === "/profesionista" ? "menu-active" : ""} href="/profesionista">Dashboard</a></li>
		<li><a class={page.url.pathname === "/profesionista/procesos" ? "menu-active" : ""} href="/profesionista/procesos">Procesos</a></li>
		<li><a class={page.url.pathname === "/profesionista/certificaciones" ? "menu-active" : ""} href="/profesionista/certificaciones">Certificaciones</a></li>
		<!-- <li><a>Configuración</a></li> -->
	</ul>

	<ProfesionistaHeader
		profesionista={currentProfesionista}
		{totalProcesos}
		{totalCertificaciones}
	/>

	{@render children()}
</main>
