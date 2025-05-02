<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import {
		newAdminsStore,
		newCalificacionesProcesoStore,
		newCertificacionesStore,
		newComprasStore,
		newEmpleadoresStore,
		newIdEmpleadorStore,
		newIdProfesionistaStore,
		newProcesosContactoStore,
		newProfesionistasStore,
		newSeccionAdminConfigStore,
		newSeccionAdminEmpeladorStore,
		newSeccionAdminProfesionistaStore,
		newSeccionAdminStore,
		newThemeStore
	} from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import { newIndexCertificaciones } from '$lib/search-indexes/index-certificaciones';
	import { newIndexProfesionistas } from '$lib/search-indexes/index-profesionistas';
	import {
		setIndexCertificacionesContext,
		setIndexComprasContext,
		setIndexEmpleadoresContext,
		setIndexProcesosContext,
		setIndexProfesionistasContext,
		setSeccionAdminConfigContext,
		setSeccionAdminContext,
		setSeccionAdminEmpleadorContext,
		setSeccionAdminProfesionistaContext
	} from '$lib/context.svelte';

	import { InstagramLogo, FacebookLogo, LinkedinLogo, TwitterLogo } from 'phosphor-svelte';
	import { newIndexEmpleadores } from '$lib/search-indexes/index-empleadores';
	import { newIndexProcesosContacto } from '$lib/search-indexes/index-procesos-contacto';
	import { newIndexCompras } from '$lib/search-indexes/index-compras';

	let { children } = $props();

	const themeStore = newThemeStore();
	setContext('theme', themeStore);

	const idEmpleadorStore = newIdEmpleadorStore();
	setContext('id-empleador', idEmpleadorStore);

	const idProfesionistaStore = newIdProfesionistaStore();
	setContext('id-profesionista', idProfesionistaStore);

	const idAdminStore = newIdProfesionistaStore();
	setContext('id-admin', idAdminStore);

	const profesionistasStore = newProfesionistasStore();
	setContext('profesionistas', profesionistasStore);

	const indexProfesionistas = newIndexProfesionistas(...profesionistasStore.value);
	setIndexProfesionistasContext(indexProfesionistas);

	const empleadoresStore = newEmpleadoresStore();
	setContext('empleadores', empleadoresStore);

	const indexEmpleadores = newIndexEmpleadores(...empleadoresStore.value);
	setIndexEmpleadoresContext(indexEmpleadores);

	const certificacionesStore = newCertificacionesStore();
	setContext('certificaciones', certificacionesStore);

	const indexCertificaciones = newIndexCertificaciones(...certificacionesStore.value);
	setIndexCertificacionesContext(indexCertificaciones);

	const procesosContactoStore = newProcesosContactoStore();
	setContext('procesos-contacto', procesosContactoStore);

	const indexProcesosContacto = newIndexProcesosContacto(
		profesionistasStore.value,
		empleadoresStore.value,
		certificacionesStore.value,
		procesosContactoStore.value
	);
	setIndexProcesosContext(indexProcesosContacto);

	const comprasStore = newComprasStore();
	setContext('compras', comprasStore);

	const indexCompras = newIndexCompras(
		profesionistasStore.value,
		empleadoresStore.value,
		certificacionesStore.value,
		procesosContactoStore.value,
		comprasStore.value
	);
	setIndexComprasContext(indexCompras);

	const calificacionesProcesoStore = newCalificacionesProcesoStore();
	setContext('calificaciones-proceso', calificacionesProcesoStore);

	const adminsStore = newAdminsStore();
	setContext('admins', adminsStore);

	const seccionAdminStore = newSeccionAdminStore();
	setSeccionAdminContext(seccionAdminStore);

	const seccionAdminConfigStore = newSeccionAdminConfigStore();
	setSeccionAdminConfigContext(seccionAdminConfigStore);

	const seccionAdminProfesionistaStore = newSeccionAdminProfesionistaStore();
	setSeccionAdminProfesionistaContext(seccionAdminProfesionistaStore);

	const seccionAdminEmpleadorStore = newSeccionAdminEmpeladorStore();
	setSeccionAdminEmpleadorContext(seccionAdminEmpleadorStore);
</script>

<svelte:head>
	<title>CertiNet | Acercando Talento</title>
</svelte:head>

<header>
	<Header />
</header>

<div class="overflow-x-auto">
	{@render children()}
</div>

<footer class="bg-base-300 flex flex-col items-center md:flex-row">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">CertiNet</a>
	</div>
	<p class="self-center">© 2025 CertiNet Todos los derechos reservados</p>

	<div class="flex flex-row flex-wrap gap-3">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="btn btn-ghost">
			<InstagramLogo weight="bold" class="size-5" />
		</button>

		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="btn btn-ghost">
			<FacebookLogo weight="fill" class="size-5" />
		</button>

		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="btn btn-ghost">
			<LinkedinLogo weight="fill" class="size-5" />
		</button>

		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="btn btn-ghost">
			<TwitterLogo weight="fill" class="size-5" />
		</button>
	</div>
</footer>
