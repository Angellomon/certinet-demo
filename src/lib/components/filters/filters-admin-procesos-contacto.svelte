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

	function createBeforeFechaInicioFilter(name: string) {
		onSelect(new DateBeforeFilter('fecha-inicio', name, new Date()));
	}

	function createBeforeFechaFinFilter(name: string) {
		onSelect(new DateBeforeFilter('fecha-fin', name, new Date()));
	}

	function createAfterFechaInicioFilter(name: string) {
		onSelect(new DateAfterFilter('fecha-inicio', name, new Date()));
	}

	function createAfterFechaFinFilter(name: string) {
		onSelect(new DateAfterFilter('fecha-fin', name, new Date()));
	}

	function createRateProfesionistaLessThanFilter(name: string) {
		onSelect(new LessThanFilter('rate-profesionista', name, 0));
	}

	function createRateProfesionistaGreaterThanFilter(name: string) {
		onSelect(new MoreThanFilter('rate-profesionista', name, 0));
	}

	function createRateProfesionistaEqualFilter(name: string) {
		onSelect(new EqualFilter('rate-profesionista', name, 0));
	}

	function createRateEmpleadorLessThanFilter(name: string) {
		onSelect(new LessThanFilter('rate', name, 0));
	}

	function createRateEmpleadorGreaterThanFilter(name: string) {
		onSelect(new MoreThanFilter('rate', name, 0));
	}

	function createRateEmpleadorEqualFilter(name: string) {
		onSelect(new EqualFilter('rate', name, 0));
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
			<strong>Fecha Inicio</strong>

			<div class="join gap-2">
				<button
					class="btn btn-neutral"
					onclick={() => createBeforeFechaInicioFilter('Fecha Inicio')}
				>
					<pre>Antes de</pre>
				</button>

				<button
					class="btn btn-neutral"
					onclick={() => createAfterFechaInicioFilter('Fecha Inicio')}
				>
					<pre>Después de</pre>
				</button>
			</div>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Fecha Fin</strong>

			<div class="join gap-2">
				<button class="btn btn-neutral" onclick={() => createBeforeFechaFinFilter('Fecha Fin')}>
					<pre>Antes de</pre>
				</button>

				<button class="btn btn-neutral" onclick={() => createAfterFechaFinFilter('Fecha Fin')}>
					<pre>Después de</pre>
				</button>
			</div>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Calificación Profesionista</strong>

			<div class="join gap-2">
				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateProfesionistaEqualFilter('Calificación Profesionista')}
					data-tip="Igual a"
				>
					<Equals class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateProfesionistaLessThanFilter('Calificación Profesionista')}
					data-tip="Menor que"
				>
					<LessThan class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateProfesionistaGreaterThanFilter('Calificación Profesionista')}
					data-tip="Mayor que"
				>
					<GreaterThan class="size-5" />
				</button>
			</div>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Calificación Empleador</strong>

			<div class="join gap-2">
				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateEmpleadorEqualFilter('Calificación Empleador')}
					data-tip="Igual a"
				>
					<Equals class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateEmpleadorLessThanFilter('Calificación Empleador')}
					data-tip="Menor que"
				>
					<LessThan class="size-5" />
				</button>

				<button
					class="btn btn-neutral tooltip"
					onclick={() => createRateEmpleadorGreaterThanFilter('Calificación Empleador')}
					data-tip="Mayor que"
				>
					<GreaterThan class="size-5" />
				</button>
			</div>
		</div>
	</li>
</ul>
