<script lang="ts">
	interface Props {
		data: {
			seccion: string;
			title: string;
		}[];
		current: string;
	}

	let { current = $bindable(), data }: Props = $props();

	function setSeccion(s: string) {
		current = s;
	}
</script>

<ul class="menu menu-vertical bg-base-200 rounded-box w-56">
	{#each data as _data}
		<li>
			<button
				class:menu-active={current == _data.seccion}
				onclick={() => setSeccion(_data.seccion)}
			>
				{_data.title}
			</button>
		</li>
	{/each}
</ul>
