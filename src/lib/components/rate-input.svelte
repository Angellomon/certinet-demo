<script lang="ts">
	let { value = $bindable(0), hideNumber = false } = $props();

	const rates = [
		0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
	];

	function handleRate(_value: number) {
		value = _value;
	}
</script>

<div class="flex flex-col sm:flex-row ">
  {#if !hideNumber}
    <div class="font-bold text-2xl">{value}</div>
  {/if}

  <div class="rating rating-lg rating-half">
    <input type="radio" name="rating-11" class="rating-hidden" />
    
    {#each rates as rate, i}
		<input
			type="radio"
			name="rating-11"
			class="mask mask-star-2 bg-green-500"
			class:mask-half-1={i % 2 == 0}
			class:mask-half-2={i % 2 != 0}
			aria-label={`${rate} star`}
			checked={value >= rate}
			onclick={() => handleRate(rate)}
      />
      {/each}
    </div>
    
  </div>