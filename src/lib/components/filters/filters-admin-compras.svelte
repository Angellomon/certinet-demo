<script lang="ts">
	import {
		DateAfterFilter,
		DateBeforeFilter,
		EqualFilter,
		LessThanFilter,
		MoreThanFilter,
		type Filter
	} from '$lib/filters.svelte';
	import { Equals, LessThan, X, GreaterThan } from 'phosphor-svelte';

	interface Props {
		onSelect?(filterType: Filter): void;
		onClose?(): void;
	}

	const { onSelect = () => {}, onClose = () => {} }: Props = $props();

	function createBeforeFechaFilter(name: string) {
		onSelect(new DateBeforeFilter('fecha-inicio', name, new Date()));
	}

	function createAfterFechaFilter(name: string) {
		onSelect(new DateAfterFilter('fecha-inicio', name, new Date()));
	}

	function createRateMontoLessThanFilter(name: string) {
		onSelect(new LessThanFilter('rate-profesionista', name, 0));
	}

	function createMontoGreaterThanFilter(name: string) {
		onSelect(new MoreThanFilter('rate-profesionista', name, 0));
	}

	function createMontoEqualFilter(name: string) {
		onSelect(new EqualFilter('rate-profesionista', name, 0));
	}

	function handleClose() {
		onClose();
	}
</script>

<ul class="list bg-base-200 rounded-box border-base-content relative w-72 border shadow-md">
	<div class="absolute top-1 right-1">
		<button class="btn tooltip tooltip-left" data-tip="Cerrar Filtros" onclick={handleClose}>
			<X class="size-5" />
		</button>
	</div>

	<li class="p-4 pb-2 text-xs tracking-wide">Filtros</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Fecha</strong>

			<div class="join gap-2">
				<button class="btn btn-neutral" onclick={() => createBeforeFechaFilter('Fecha')}>
					<pre>Antes de</pre>
				</button>

				<button class="btn btn-neutral" onclick={() => createAfterFechaFilter('Fecha')}>
					<pre>Después de</pre>
				</button>
			</div>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Monto</strong>

			<div class="join gap-2">
				<button
					class="btn btn-neutral tooltip"
					onclick={() => createMontoEqualFilter('Monto')}
					data-tip="Igual a"
				>
					<Equals class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateMontoLessThanFilter('Monto')}
					data-tip="Menor que"
				>
					<LessThan class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createMontoGreaterThanFilter('Monto')}
					data-tip="Mayor que"
				>
					<GreaterThan class="size-5" />
				</button>
			</div>
		</div>
	</li>
</ul>
