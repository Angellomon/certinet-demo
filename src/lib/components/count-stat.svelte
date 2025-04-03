<script lang="ts">
	import { formatNumber } from '$lib/utils';

	interface Props {
		count: number,
		description?: string,
		title: string,
		isMoney?: boolean
	}

	const { count = 0, description = '', title = 'Total', isMoney = false }: Props = $props();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">{title}</div>
		{#if isMoney}
		<div class="stat-value">$ {formatNumber(count)}</div>
		{:else}
		<div class="stat-value">{formatNumber(count)}</div>
		{/if}

		{#if description}
			<div class="stat-desc">{description}</div>
		{/if}
	</div>
</div>
