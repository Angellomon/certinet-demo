<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SettingsSvg from '$lib/components/settings-svg.svelte';
	import { newSeccionAdminConfigStore } from '$lib/localstore.svelte';
	import { setContext } from 'svelte';
	import AdminHeader from './admin-header.svelte';

	const { children } = $props();

	const seccionAdminConfigStore = newSeccionAdminConfigStore();
	setContext('seccion-admin-config-store', seccionAdminConfigStore);

	function handleMenuClick() {
		seccionAdminConfigStore.value = 'datos';
	}
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<AdminHeader />

	<div class="flex-row-flex-wrap flex flex-col items-center justify-between sm:flex-row">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<ul
			class="menu menu-horizontal bg-base-200 rounded-box justify-around"
			onclick={handleMenuClick}
		>
			<li>
				<a class:menu-active={page.url.pathname === '/admin'} href="/admin"> Dashboard </a>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/profesionistas')}
					href="/admin/profesionistas"
				>
					Profesionistas
				</a>
			</li>
			<li>
				<a class:menu-active={page.url.pathname.includes('/empleadores')} href="/admin/empleadores">
					Empleadores
				</a>
			</li>
			<li>
				<a class:menu-active={page.url.pathname.includes('/procesos')} href="/admin/procesos">
					Procesos
				</a>
			</li>
			<li>
				<a
					class:menu-active={page.url.pathname.includes('/certificaciones')}
					href="/admin/certificaciones"
				>
					Certificaciones
				</a>
			</li>
			<li>
				<a class:menu-active={page.url.pathname.includes('/compras')} href="/admin/compras">
					Compras
				</a>
			</li>
			<!-- <li><a>Configuración</a></li> -->
		</ul>

		<button
			class="btn"
			class:btn-neutral={page.url.pathname.includes('/config')}
			onclick={() => goto('/admin/config')}
		>
			Configuración <SettingsSvg />
		</button>
	</div>
	{@render children()}
</main>
