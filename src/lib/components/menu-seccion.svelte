<script lang="ts">
	interface Props {
		data: {
			seccion: string;
			title: string;
			url?: string;
		}[];
		current: string;
		urlMode?: boolean;
	}

	let { current = $bindable(), data, urlMode = false }: Props = $props();

	function setSeccion(s: string) {
		current = s;
	}
</script>

<ul class="menu menu-horizontal sm:menu-vertical bg-base-200 rounded-box w-full sm:w-56">
	{#each data as _data}
		<li>
			{#if urlMode &&_data.url }
				<a
					href={_data.url}
					class:menu-active={current == _data.seccion}
					onclick={() => setSeccion(_data.seccion)}
				>
					{_data.title}
				</a>
			{:else}
				<button
					class:menu-active={current == _data.seccion}
					onclick={() => setSeccion(_data.seccion)}
				>
					{_data.title}
				</button>
			{/if}
		</li>
	{/each}
</ul>
