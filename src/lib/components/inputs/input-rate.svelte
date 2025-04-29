<script lang="ts">
	interface Props {
		value: number;
		hideNumber?: boolean;
		color?: 'profesionista' | 'empleador';
		disableInput?: boolean;
	}

	let {
		value = $bindable(0),
		hideNumber = false,
		color = 'empleador',
		disableInput = false
	}: Props = $props();

	const rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

	function handleRate(_value: number) {
		if (!disableInput) value = _value;
	}
</script>

<div class="flex flex-col sm:flex-row">
	{#if !hideNumber}
		<div class="text-2xl font-bold">{value}</div>
	{/if}

	<div class="rating rating-lg rating-half">
		<input type="radio" class="rating-hidden" />

		{#each rates as rate, i}
			<input
				type="radio"
				class:bg-green-500={color === 'empleador'}
				class:bg-orange-500={color === 'profesionista'}
				class="mask mask-star-2"
				class:mask-half-1={i % 2 == 0}
				class:mask-half-2={i % 2 != 0}
				aria-label={`${rate} star`}
				checked={value >= rate}
				onclick={() => handleRate(rate)}
			/>
		{/each}
	</div>
</div>
