<script lang="ts">
	type Size = 'sm' | 'md' | 'lg' | 'xl';
	interface Props {
		data: {
			seccion: string;
			title: string;
			url?: string;
		}[];
		current: string;
		urlMode?: boolean;
		vertical?: boolean;
		onMenuClick?: () => void;
		size?: Size;
	}

	let {
		current = $bindable(),
		data,
		urlMode = false,
		vertical = false,
		onMenuClick = () => {},
		size = 'sm'
	}: Props = $props();

	function setSeccion(s: string) {
		current = s;
	}

	function handleMenuClick() {
		onMenuClick();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<ul
	class="menu menu-horizontal bg-base-200 rounded-box w-full"
	class:menu-vertical={vertical}
	class:md:w-56={vertical}
	class:menu-sm={size === 'sm'}
	class:menu-md={size === 'md'}
	class:menu-lg={size === 'lg'}
	class:menu-xl={size === 'xl'}
	onclick={handleMenuClick}
>
	{#each data as _data}
		<li>
			{#if urlMode && _data.url}
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
