<script lang="ts">
	import { page } from '$app/state';
	import InputsEmpleador from '$lib/components/inputs/inputs-empleador.svelte';
	import { getEmpleadorContext } from '$lib/context.svelte';
	import { FloppyDisk, Hash, NotePencil } from 'phosphor-svelte';

	const { idEmpleador } = page.params;

	let edit = $state(false);

	const empleadorStore = getEmpleadorContext(idEmpleador);

	function toggleEdit() {
		edit = !edit;
	}

	function toggleVerify() {
		empleadorStore.verificado = !empleadorStore.verificado;
	}
</script>

<main class="flex flex-col gap-5">
	<div class="flex flex-row flex-wrap items-center justify-between gap-5">
		<h1 class="text-2xl">{empleadorStore.razonSocial}</h1>

		<div class="join gap-2">
			<button
				class="btn btn-neutral clear-both"
				class:btn-success={empleadorStore.verificado}
				onclick={toggleVerify}
			>
				{#if empleadorStore.verificado}
					Verificado
				{:else}
					Verificar
				{/if}
				<input type="checkbox" checked={empleadorStore.verificado} class="toggle toggle-success" />
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
		data-tip="ID Empleador"
	>
		<Hash class="size-5" />
		ID
		{empleadorStore.id}
	</div>

	<InputsEmpleador {idEmpleador} {edit} />
</main>
