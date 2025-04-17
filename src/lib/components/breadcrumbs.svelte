<script lang="ts">
	import type { BreadcrumbsData } from "$lib/entities";

	interface Props {
		data: BreadcrumbsData;
	}
	const { data }: Props = $props();
</script>

<ul class="breadcrumbs text-sm px-2">
	{#each data as item}
		<li>
			{#if item.url}
				<a href={item.url}>
					{item.title}
				</a>
			{:else}
				{item.title}
			{/if}
		</li>
	{/each}
</ul>
