<script lang="ts">
	import { page } from '$app/state';
	import AdminHeader from './admin-header.svelte';

	const { children } = $props();
</script>

<main class="flex flex-col gap-5 p-5 lg:px-20 lg:py-5">
	<AdminHeader />

	<div class="flex-row-flex-wrap flex flex-col items-center justify-between sm:flex-row">
		<ul class="menu menu-horizontal bg-base-200 rounded-box justify-around">
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
	</div>
	{@render children()}
</main>
