<script>
	import TableProfesionistas from '$lib/components/table-profesionistas.svelte';
	import { popBreadcrumbs, pushBreadcrumbs } from '$lib/context.svelte';

	const breadcrumbs = [
		{
			title: 'Profesionistas',
			url: '/admin/profesionistas'
		}
	];

	$effect(() => {
		pushBreadcrumbs(...breadcrumbs);

		return () => {
			popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<h1 class="text-2xl">Profesionistas</h1>

<main class="flex flex-col gap-5">
	<TableProfesionistas baseURL="/admin/profesionistas" showActions showVerifyActions />
</main>
