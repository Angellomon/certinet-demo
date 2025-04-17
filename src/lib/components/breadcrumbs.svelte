<script lang="ts">
	import type { BreadcrumbsData } from '$lib/entities';

	interface Props {
		data: BreadcrumbsData;
	}
	const { data }: Props = $props();
</script>

<div class="breadcrumbs px-2 text-sm">
	<ul>
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
</div>
