<script lang="ts">
	import { page } from '$app/state';
	import { FloppyDisk, Hash, NotePencil } from 'phosphor-svelte';
	import InputProfesionista from '$lib/components/inputs/inputs-profesionista.svelte';
	import { getProfesionistaContext } from '$lib/context.svelte';
	import TimelineProfesionista from '$lib/components/timeline-profesionista.svelte';

	const { idProfesionista } = page.params;

	const profesionista = getProfesionistaContext(idProfesionista);

	let edit = $state(false);

	function toggleEdit() {
		edit = !edit;
	}

	function toggleVerify() {
		profesionista.verificado = !profesionista.verificado;
	}
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<h1 class="text-2xl underline">{profesionista.nombre} {profesionista.apellidos}</h1>

		<div class="join gap-2">
			<button
				class="btn btn-neutral clear-both"
				class:btn-success={profesionista.verificado}
				onclick={toggleVerify}
			>
				{#if profesionista.verificado}
					Verificado
				{:else}
					Verificar
				{/if}
				<input type="checkbox" checked={profesionista.verificado} class="toggle toggle-success" />
			</button>

			<button class="btn btn-neutral" onclick={toggleEdit}>
				{#if edit}
					Guardar <FloppyDisk class="size-5" />
				{:else}
					Editar <NotePencil class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<div
		class="badge badge-neutral tooltip tooltip-right flex-nowrap font-mono text-nowrap"
		data-tip="ID Profesionista"
	>
		<Hash class="size-5" />
		ID
		{profesionista.id}
	</div>

	<InputProfesionista {edit} {idProfesionista} />

	<div class="divider">Experiencia Laboral</div>
	<TimelineProfesionista startOdd {edit} {idProfesionista} type="laboral" />

	<div class="divider">Proyectos</div>
	<TimelineProfesionista startOdd {edit} {idProfesionista} type="proyectos" />
</main>
