<script lang="ts">
	import { formatNumber } from '$lib/utils';

	const { count = 0, description = '', title = 'Total' } = $props();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">{title}</div>
		<div class="stat-value">{formatNumber(count)}</div>

		{#if description}
			<div class="stat-desc">{description}</div>
		{/if}
	</div>
</div>
