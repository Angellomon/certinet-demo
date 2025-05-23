<script lang="ts">
	import {
		BooleanFilter,
		DateAfterFilter,
		DateBeforeFilter,
		EqualFilter,
		LessThanFilter,
		LocationFilter,
		MoreThanFilter,
		SingleTagSelectFilter,
		TagFilter,
		type Filter
	} from '$lib/filters.svelte';
	import { CalendarBlank, ListMagnifyingGlass, X } from 'phosphor-svelte';
	import { formatISO, parseISO } from 'date-fns';

	interface Props {
		filters: Filter[];
		onApply?(): void;
		onRemove?(): void;
	}

	const { filters = $bindable([]), onApply, onRemove }: Props = $props();

	const filterTags: Record<string, string[]> = $state({});

	function formatDate(date: Date) {
		return formatISO(date, { representation: 'date' });
	}

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

		onRemove && onRemove();
	}
</script>

{#snippet optionButtons(filter: Filter)}
	<div class="join">
		{#if onApply}
			<button class="btn tooltip" data-tip="Aplicar" onclick={onApply}>
				<ListMagnifyingGlass class="size-5" />
			</button>
		{/if}
		<button class="btn tooltip" data-tip="Quitar Filtro" onclick={() => removeFilter(filter.id)}>
			<X class="size-4" />
		</button>
	</div>
{/snippet}

{#snippet locationFilter(filter: LocationFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<input class="input" type="text" bind:value={filter.value} list="locations" />

			<datalist id="locations">
				<option value="Mexico">Mexico</option>
				<option value="United States">United States</option>
				<option value="Brasil">Brasil</option>
				<option value="Spain">Spain</option>
			</datalist>

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet tagFilter(filter: TagFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

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

			{@render optionButtons(filter)}
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

{#snippet singleTagSelectFilter(filter: SingleTagSelectFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<select class="select" bind:value={filter.value}>
				<option disabled selected>Selecciona...</option>

				{#each filter.options as tag}
					<option value={tag}>
						{tag}
					</option>
				{/each}
			</select>

			{@render optionButtons(filter)}
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
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'<='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet moreThanFilter(filter: MoreThanFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'>='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet equalFilter(filter: EqualFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 place-self-center">
				{'=='}
			</div>

			<input class="input w-[5rem]" type="number" min={1} bind:value={filter.value} />

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet booleanFilter(filter: BooleanFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join gap-2">
			<select class="select" bind:value={filter.value}>
				<option disabled selected>Selecciona una opción</option>
				<option value={true}>Verdadero</option>
				<option value={false}>Falso</option>
			</select>

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet dateAfterFilter(filter: DateAfterFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 w-full place-self-center">
				<CalendarBlank class="size-5" />
				<div class="break-keep">Después de</div>
			</div>

			<input
				class="input"
				type="date"
				value={formatDate(filter.value)}
				onchange={(e) => {
					filter.value = parseISO(e.currentTarget.value);
				}}
			/>

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

{#snippet dateBeforeFilter(filter: DateBeforeFilter)}
	<div class="rounded-box flex flex-col gap-2 border p-2">
		<p class="text-xs">{`${filter.name}`}</p>

		<div class="join">
			<div class="badge badge-soft badge-accent mr-2 w-full place-self-center">
				<CalendarBlank class="size-5" />
				<div class="break-keep">Antes de</div>
			</div>

			<input
				class="input"
				type="date"
				value={formatDate(filter.value)}
				onchange={(e) => {
					filter.value = parseISO(e.currentTarget.value);
				}}
			/>

			{@render optionButtons(filter)}
		</div>
	</div>
{/snippet}

<div class="flex flex-row flex-wrap gap-2">
	{#each filters as filter (filter.id)}
		<!-- <div class="tooltip tooltip-bottom" data-tip={filter.name}> -->
		{#if filter instanceof LocationFilter}
			{@render locationFilter(filter)}
		{:else if filter instanceof TagFilter}
			{@render tagFilter(filter)}
		{:else if filter instanceof SingleTagSelectFilter}
			{@render singleTagSelectFilter(filter)}
		{:else if filter instanceof LessThanFilter}
			{@render lessThanFilter(filter)}
		{:else if filter instanceof MoreThanFilter}
			{@render moreThanFilter(filter)}
		{:else if filter instanceof EqualFilter}
			{@render equalFilter(filter)}
		{:else if filter instanceof BooleanFilter}
			{@render booleanFilter(filter)}
		{:else if filter instanceof DateBeforeFilter}
			{@render dateBeforeFilter(filter)}
		{:else if filter instanceof DateAfterFilter}
			{@render dateAfterFilter(filter)}
		{/if}
	{/each}
</div>
