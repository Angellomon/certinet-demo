<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Gear } from 'phosphor-svelte';
	import {
		newSeccionAdminConfigStore,
		newSeccionAdminProfesionistaStore,
		newSeccionAdminStore
	} from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import AdminHeader from './admin-header.svelte';
	import {
		setBreadCrumbsContext,
		setSeccionAdminContext,
		setSeccionAdminProfesionistaContext
	} from '$lib/context.svelte';
	import MenuSeccion from '$lib/components/menu-seccion.svelte';
	import type { SeccionAdmin } from '$lib/entities';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { newBreadcrumbsState } from '$lib/breadcrumbs.svelte';

	const { children } = $props();

	const seccionAdminStore = newSeccionAdminStore();
	setSeccionAdminContext(seccionAdminStore);

	const seccionAdminConfigStore = newSeccionAdminConfigStore();
	setContext('seccion-admin-config-store', seccionAdminConfigStore);

	const seccionAdminProfesionistaStore = newSeccionAdminProfesionistaStore();
	setSeccionAdminProfesionistaContext(seccionAdminProfesionistaStore);

	const breadcrumbsAdmin = newBreadcrumbsState([
		{
			title: 'Admin',
			url: '/admin'
		}
	]);
	setBreadCrumbsContext(breadcrumbsAdmin);

	const menuData: {
		url?: string;
		title: string;
		seccion: SeccionAdmin;
	}[] = [
		{
			seccion: 'dashboard',
			title: 'Dashboard',
			url: '/admin'
		},
		{
			seccion: 'profesionistas',
			title: 'Profesionistas',
			url: '/admin/profesionistas'
		},
		{
			seccion: 'empleadores',
			title: 'Empleadores',
			url: '/admin/empleadores'
		},
		{
			seccion: 'certificaciones',
			title: 'Certificaciones',
			url: '/admin/certificaciones'
		},
		{
			seccion: 'procesos',
			title: 'Procesos de Contacto',
			url: '/admin/procesos'
		},
		{
			seccion: 'compras',
			title: 'Compras',
			url: '/admin/compras'
		}
	];

	function handleMenuClick() {
		seccionAdminConfigStore.value = 'datos';
		seccionAdminProfesionistaStore.value = 'datos';
	}

	function handleConfigClick() {
		seccionAdminStore.value = 'config';
		handleMenuClick();
		goto('/admin/config');
	}
</script>

<main class="flex flex-col gap-1 p-5 lg:px-20 lg:py-5">
	<AdminHeader />

	<div class="flex-row-flex-wrap flex flex-col items-center justify-between sm:flex-row">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<MenuSeccion
			data={menuData}
			bind:current={seccionAdminStore.value}
			onMenuClick={handleMenuClick}
			urlMode
			size="lg"
		/>
		<button
			class="btn"
			class:btn-neutral={page.url.pathname.includes('/config')}
			onclick={handleConfigClick}
		>
			Configuración <Gear class="h-5" />
		</button>
	</div>

	<Breadcrumbs data={breadcrumbsAdmin.value} />

	<div class="overflow-x-auto">
		{@render children()}
	</div>
</main>
