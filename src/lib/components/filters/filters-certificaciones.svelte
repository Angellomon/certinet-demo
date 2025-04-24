<script lang="ts">
	import {
		EqualFilter,
		LessThanFilter,
		LocationFilter,
		MoreThanFilter,
		TagFilter,
		type Filter
	} from '$lib/filters.svelte';

	interface Props {
		onSelect?: (filerType: Filter) => void;
	}

	const { onSelect = () => {} }: Props = $props();

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
</script>

<ul class="list bg-base-200 rounded-box border-base-content border shadow-md">
	<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Filtros</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col">
			<strong># de Proyectos</strong>
			<div>
				<button class="btn" onclick={() => createNumberOfProjectsEqual()}>
					<pre>{'=='}</pre>
				</button>
				<button class="btn" onclick={() => createNumberOfProjectsLessThan()}>
					<pre>{'<='}</pre>
				</button>
				<button class="btn" onclick={() => createNumberOfProjectsMoreThan()}>
					<pre>{'>='}</pre>
				</button>
			</div>
		</div>
	</li>
	<li class="list-row items-center gap-5">
		<div class="flex flex-col">
			<strong>Años de exp.</strong>
			<div>
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
		<button class="btn" onclick={() => createLocation()}>Ubicación</button>
	</li>
	<li class="list-row items-center gap-5">
		<button class="btn" onclick={() => createTag()}>Tecnologías</button>
	</li>
</ul>
