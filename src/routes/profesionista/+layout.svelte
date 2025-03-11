<script lang="ts">
	import ProfesionistaHeader from './profesionista-header.svelte';

	const { data, children } = $props();
	const { currentProfesionista, totalProcesos, totalCertificaciones } = data;
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
		<li><a href="/profesionista">Dashboard</a></li>
		<li><a href="/profesionista/procesos">Procesos</a></li>
		<!-- <li><a>Configuración</a></li> -->
	</ul>

	<ProfesionistaHeader profesionista={currentProfesionista} {totalProcesos} {totalCertificaciones} />

	{@render children()}
</main>
