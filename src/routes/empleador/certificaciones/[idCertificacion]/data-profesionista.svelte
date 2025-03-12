<script lang="ts">
	import JsonData from '$lib/components/JsonData.svelte';
	import type { Profesionista } from '$lib/entities';

	const { profesionista }: { profesionista: Profesionista } = $props();
</script>

<JsonData title="Raw Data Profesionista" jsonData={profesionista} />
