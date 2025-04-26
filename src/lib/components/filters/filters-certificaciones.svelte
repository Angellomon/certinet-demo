<script lang="ts">
	import {
		BooleanFilter,
		EqualFilter,
		LessThanFilter,
		LocationFilter,
		MoreThanFilter,
		TagFilter,
		type Filter
	} from '$lib/filters.svelte';
	import { Equals, GreaterThanOrEqual, LessThanOrEqual, X } from 'phosphor-svelte';

	interface Props {
		onSelect?(filerType: Filter): void;
		onClose?(): void;
	}

	const { onSelect = () => {}, onClose = () => {} }: Props = $props();

	function createNumberOfProjectsEqual(value = 0) {
		onSelect(new EqualFilter('numberofprojects', '# de Proyectos', value));
	}

	function createNumberOfProjectsLessThan(value = 0) {
		onSelect(new LessThanFilter('numberofprojects', '# de Proyectos', value));
	}

	function createNumberOfProjectsMoreThan(value = 0) {
		onSelect(new MoreThanFilter('numberofprojects', '# de Proyectos', value));
	}

	function createYearsOfExperienceEqual(value = 0) {
		onSelect(new EqualFilter('yearsofexperience', 'Años de Experiencia', value));
	}

	function createYearsOfExperienceLessThan(value = 0) {
		onSelect(new LessThanFilter('yearsofexperience', 'Años de Experiencia', value));
	}

	function createYearsOfExperienceMoreThan(value = 0) {
		onSelect(new MoreThanFilter('yearsofexperience', 'Años de Experiencia', value));
	}

	function createLocation(value = '') {
		onSelect(new LocationFilter('Ubicación', ''));
	}

	function createTag() {
		onSelect(new TagFilter('Tecnologías', []));
	}

	function createStatusFilter(value: boolean = false) {
		onSelect(new BooleanFilter('Estatus Verificación', value));
	}

	function handleClose() {
		onClose();
	}
</script>

<ul class="list bg-base-200 rounded-box border-base-content relative w-72 border shadow-md">
	<div class="absolute top-1 right-1 z-10">
		<button class="btn tooltip tooltip-left" data-tip="Cerrar Filtros" onclick={handleClose}>
			<X class="size-5" />
		</button>
	</div>

	<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Filtros</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong># de Proyectos</strong>
			<div class="join items-center gap-1">
				<button
					class="btn btn-neutral tooltip tooltip-bottom"
					data-tip="Igual a"
					onclick={() => createNumberOfProjectsEqual()}
				>
					<Equals class="size-5" weight="bold" />
					<!-- <pre>{'=='}</pre> -->
				</button>
				<button
					class="btn btn-neutral tooltip tooltip-bottom"
					data-tip="Menor o igual a"
					onclick={() => createNumberOfProjectsLessThan()}
				>
					<LessThanOrEqual class="size-5" weight="bold" />
					<!-- <pre>{'<='}</pre> -->
				</button>
				<button
					class="btn btn-neutral tooltip tooltip-bottom"
					data-tip="Mayor o igual a"
					onclick={() => createNumberOfProjectsMoreThan()}
				>
					<GreaterThanOrEqual class="size-5" weight="bold" />
					<!-- <pre>{'>='}</pre> -->
				</button>
			</div>
		</div>
	</li>
	<li class="list-row items-center gap-5">
		<div class="flex flex-col">
			<strong>Años de exp.</strong>
			<div class="join items-center">
				<button class="btn self-end" onclick={() => createYearsOfExperienceEqual()}>
					<pre>{'=='}</pre>
				</button>
				<button class="btn self-end" onclick={() => createYearsOfExperienceLessThan()}>
					<pre>{'<='}</pre>
				</button>
				<button class="btn self-end" onclick={() => createYearsOfExperienceMoreThan()}>
					<pre>{'>='}</pre>
				</button>
			</div>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="join">
			<button class="btn" onclick={() => createLocation()}>Ubicación</button>
			<button class="btn" onclick={() => createTag()}>Tecnologías</button>
		</div>
	</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Estatus</strong>

			<div class="join gap-2">
				<button class="btn btn-neutral" onclick={() => createStatusFilter(false)}>
					<pre>Verificación</pre>
				</button>
			</div>
		</div>
	</li>
</ul>
