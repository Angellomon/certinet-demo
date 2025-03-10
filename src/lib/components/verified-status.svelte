<script lang="ts">
	const { text = '', verified = false } = $props();
</script>

<div class="flex flex-row justify-center items-center gap-1">
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

{text}

</div>