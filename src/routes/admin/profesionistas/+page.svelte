<script>
	import TableProfesionistas from '$lib/components/table-profesionistas.svelte';
	import { getBreadcrumbsContext } from '$lib/context.svelte';

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: 'Profesionistas',
			url: '/admin/profesionistas'
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

<h1 class="text-2xl pb-5">Profesionistas</h1>

<main class="flex flex-col gap-5">
	<TableProfesionistas showSearch baseURL="/admin/profesionistas"   />
</main>
