<script lang="ts">
	import { getBreadcrumbsContext } from '$lib/context.svelte';

	const { children } = $props();

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: 'Configuración',
			url: '/admin/config'
		}
	];

	breadcrumbsState.pushBreadcrumbs(...breadcrumbs);

	$effect(() => {
		return () => {
			breadcrumbsState.popBreadcrumbs(...breadcrumbs);
		};
	});
</script>

{@render children()}
