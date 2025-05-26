<script lang="ts">
	import { page } from '$app/state';
	import InputsCertificacion from '$lib/components/inputs/inputs-certificacion.svelte';
	import { getCertificacionContext } from '$lib/context.svelte';
	import { FloppyDisk, Hash, NotePencil } from 'phosphor-svelte';

	const { idCertificacion } = page.params;

	let edit = $state(false);

	const certificacionStore = getCertificacionContext(idCertificacion);

	function toggleEdit() {
		edit = !edit;
	}

	function toggleVerify() {
		certificacionStore.verificado = !certificacionStore.verificado;
	}
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<h1 class="text-2xl">{certificacionStore.nombre}</h1>

		<div class="flex flex-wrap gap-2">
			<button
				class="btn btn-neutral clear-both"
				class:btn-success={certificacionStore.verificado}
				onclick={toggleVerify}
			>
				{#if certificacionStore.verificado}
					Verificado
				{:else}
					Verificar
				{/if}
				<input
					type="checkbox"
					checked={certificacionStore.verificado}
					class="toggle toggle-success"
				/>
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
		data-tip="ID Certificacion"
	>
		<Hash class="size-5" />
		ID
		{certificacionStore.id}
	</div>

	<InputsCertificacion {idCertificacion} {edit} />
</main>
