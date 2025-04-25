<script lang="ts">
	import { getBreadcrumbsContext } from '$lib/context.svelte';

	const { children } = $props();

	const breadcrumbsState = getBreadcrumbsContext();

	const breadcrumbs = [
		{
			title: 'Compras',
			url: '/admin/compras'
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
