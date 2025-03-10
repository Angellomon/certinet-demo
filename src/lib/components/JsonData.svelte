<script lang="ts">
	let { jsonData } = $props<{jsonData: any}>();
</script>

<div>
	<h3 class="text-lg">Raw Data</h3>
	<pre>{JSON.stringify(jsonData, null, '\t')}</pre>
</div>
