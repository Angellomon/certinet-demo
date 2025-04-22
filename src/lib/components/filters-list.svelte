<script lang="ts">
	import {
		EqualFilter,
		FilterNameMap,
		LessThanFilter,
		LocationFilter,
		MoreThanFilter,
		TagFilter,
		type Filter
	} from '$lib/filters.svelte';
	import CrossSvg from './cross-svg.svelte';

	interface Props {
		filters: Filter[];
	}

	const { filters = $bindable([]) }: Props = $props();

	const filterTags: Record<string, string[]> = $state({});

	function removeFilter(id: string) {
		const i = filters.findIndex((f) => f.id === id);
		filters.splice(i, 1);
	}

	function addTag(filterId: string, value: string) {
		const filter = filters.find((f) => f.id === filterId);

		if (!filter || !(filter instanceof TagFilter)) return;

		if (!filterTags[filterId]) filterTags[filterId] = [];

		filterTags[filterId].push(value);

		filter.value.push(value);
	}

	function removeTag(filterId: string, value: string) {
		const filter = filters.find((f) => f.id === filterId);

		if (!filter || !(filter instanceof TagFilter)) return;

		if (!filterTags[filterId]) filterTags[filterId] = [];

		const i = filterTags[filterId].findIndex((t) => t === value);
		filterTags[filterId].splice(i, 1);

		filter.value.splice(i, 1);
	}
</script>

{#snippet locationFilter(filter: LocationFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${FilterNameMap[filter.type]}`}</p>
		<div class="join">
			<input class="input" type="text" bind:value={filter.value} list="locations" />

			<datalist id="locations">
				<option value="Mexico">Mexico</option>
				<option value="United States">United States</option>
				<option value="Brasil">Brasil</option>
				<option value="Spain">Spain</option>
			</datalist>

			<div class="tooltip" data-tip="Quitar Filtro">
				<button class="btn" onclick={() => removeFilter(filter.id)}>
					<CrossSvg />
				</button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet tagFilter(filter: TagFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${FilterNameMap[filter.type]}`}</p>
		<div class="join">
			<input
				class="input"
				type="text"
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						addTag(filter.id, e.currentTarget.value);
						e.currentTarget.value = '';
					}
				}}
        list="tech"
			/>

			<datalist id="tech">
				<option value="AWS"></option>
				<option value="Google Cloud"></option>
				<option value="Microsoft Azure"></option>
				<option value="Cisco"></option>
			</datalist>

			<div class="tooltip" data-tip="Quitar Filtro">
				<button class="btn" onclick={() => removeFilter(filter.id)}>
					<CrossSvg />
				</button>
			</div>
		</div>
		{#if filterTags[filter.id]}
			<div class="flex flex-row flex-wrap">
				{#each filterTags[filter.id] as tag}
					<button
						onclick={() => removeTag(filter.id, tag)}
						class="badge badge-soft badge-accent mr-2 cursor-pointer place-self-center"
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet lessThanFilter(filter: LessThanFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${FilterNameMap[filter.type]}`}</p>
		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'<='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			<div class="tooltip" data-tip="Quitar Filtro">
				<button class="btn" onclick={() => removeFilter(filter.id)}>
					<CrossSvg />
				</button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet moreThanFilter(filter: MoreThanFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${FilterNameMap[filter.type]}`}</p>
		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'>='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			<div class="tooltip" data-tip="Quitar Filtro">
				<button class="btn" onclick={() => removeFilter(filter.id)}>
					<CrossSvg />
				</button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet equalFilter(filter: EqualFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${FilterNameMap[filter.type]}`}</p>
		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'=='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			<div class="tooltip" data-tip="Quitar Filtro">
				<button class="btn" onclick={() => removeFilter(filter.id)}>
					<CrossSvg />
				</button>
			</div>
		</div>
	</div>
{/snippet}

<div class="flex flex-row flex-wrap gap-2">
	{#each filters as filter (filter.id)}
		<!-- <div class="tooltip tooltip-bottom" data-tip={FilterNameMap[filter.type]}> -->
		{#if filter instanceof LocationFilter}
			{@render locationFilter(filter)}
		{:else if filter instanceof TagFilter}
			{@render tagFilter(filter)}
		{:else if filter instanceof LessThanFilter}
			{@render lessThanFilter(filter)}
		{:else if filter instanceof MoreThanFilter}
			{@render moreThanFilter(filter)}
		{:else if filter instanceof EqualFilter}
			{@render equalFilter(filter)}
		{/if}
		<!-- </div> -->
	{/each}
</div>
