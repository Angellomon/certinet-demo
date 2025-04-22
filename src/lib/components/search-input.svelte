<script lang="ts">
	import { MagnifyingGlass } from 'phosphor-svelte';

	interface Props {
		searchTerm?: string;
		placeholder?: string;
		onSearch: (searchTerm: string) => void;
	}

	let { searchTerm = $bindable(''), onSearch, placeholder = 'Buscar...' }: Props = $props();

	function handleSearch() {
		onSearch(searchTerm);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === 'Enter') handleSearch();
	}
</script>

<div class="join w-full">
	<label class="input w-full">
		<MagnifyingGlass />
		<input bind:value={searchTerm} {placeholder} type="search" required onkeydown={handleKeyDown} />
	</label>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<buttton class="btn btn-neutral" onclick={handleSearch}> Buscar </buttton>
</div>
