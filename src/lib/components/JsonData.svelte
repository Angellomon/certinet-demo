<script lang="ts">
	let { jsonData, title = "Raw Data" } = $props<{jsonData: any, title?: string}>();
</script>

<div>
	<h3 class="text-lg">{title}</h3>
	<pre>{JSON.stringify(jsonData, null, '\t')}</pre>
</div>
