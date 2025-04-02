<script lang="ts">
	import ArrowSvg from '$lib/components/arrow-svg.svelte';
	import type { Curriculum } from '$lib/entities';

	interface Props {
		timeline: Curriculum[];
	}

	const { timeline }: Props = $props();
</script>

{#snippet item(item: Curriculum, i: number)}
	<li>
		<div class="timeline-middle">
			<ArrowSvg />
		</div>

		<div
			class:timeline-end={i % 2 === 0}
			class:md:text-end={i % 2 !== 0}
			class:timeline-start={i % 2 !== 0}
			class="mb-10"
		>
			<time class="font-mono italic">{item.fechaInicio.getFullYear()}</time>
			<!-- <time class="font-mono italic">{item.fechaInicio.toISOString().slice(0, 10)}</time> -->
			<div class="text-lg font-black">
				{item.nombre}
			</div>
			{#if item.empresa}
				<div class="text-lg font-medium">
					{item.empresa}
				</div>
			{/if}
			{item.deacripcion}
		</div>

		<hr />
	</li>
{/snippet}

<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
	{#each timeline as curriculum, i}
		{@render item(curriculum, i)}
	{/each}
</ul>
