<script lang="ts">
	let {
		searchTerm = $bindable(''),
		onsearch = () => {}
	}: { searchTerm: string; onsearch?: () => void } = $props();
</script>

<div class="join">
	<label class="input">
		<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="2.5"
				fill="none"
				stroke="currentColor"
				><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g
			></svg
		>
		<input type="search" class="grow" placeholder="Buscar Certificaciones..." bind:value={searchTerm} />
		<!-- <kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd> -->
	</label>

	<div class="indicator">
		<!-- <span class="indicator-item badge badge-secondary">new</span> -->
		<button onclick={onsearch} class="btn join-item">Buscar</button>
	</div>
</div>
