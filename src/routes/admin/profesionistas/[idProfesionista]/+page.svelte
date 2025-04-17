<script lang="ts">
	import { page } from '$app/state';
	import { FloppyDisk, NotePencil } from 'phosphor-svelte';
	import InputProfesionista from '$lib/components/input-profesionista.svelte';
	import { getProfesionistaContext } from '$lib/context.svelte';

	const { idProfesionista } = page.params;

	const profesionista = getProfesionistaContext(idProfesionista);

	let edit = $state(false);

	function toggleEdit() {
		edit = !edit;
	}
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row items-center justify-between">
		<div>
			<h1 class="text-2xl underline">{profesionista.nombre} {profesionista.apellidos}</h1>

			<div class="badge badge-neutral tooltip tooltip-right font-mono" data-tip="ID Profesionista">
				{profesionista.id}
			</div>
		</div>

		<div class="join">
			<button class="btn btn-neutral" onclick={toggleEdit}>
				{#if edit}
					Guardar <FloppyDisk class="text-lg" />
				{:else}
					Editar <NotePencil class="text-lg" />
				{/if}
			</button>
		</div>
	</div>

	<InputProfesionista {edit} {idProfesionista} />
</main>
