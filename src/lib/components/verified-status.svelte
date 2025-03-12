<script lang="ts">
	const { verified = false, children } = $props();
</script>

<div class="flex flex-row items-center gap-1 lg:justify-center">
	{#if verified}
		<div class="inline-grid *:[grid-area:1/1]">
			<div class="status status-accent"></div>
			<div class="status status-accent"></div>
		</div>
	{:else}
		<div class="inline-grid *:[grid-area:1/1]">
			<div class="status status-error animate-ping"></div>
			<div class="status status-error"></div>
		</div>
	{/if}

	{@render children()}
</div>
