<script lang="ts">
	import JsonData from '$lib/components/JsonData.svelte';
	import type { Certificacion } from '$lib/entities';

	const { certificacion }: { certificacion: Certificacion } = $props();
</script>

<JsonData title="Raw Data Certificación" jsonData={certificacion} />
