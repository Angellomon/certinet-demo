<script lang="ts">
	import { getCurrentProfesionistaContext } from '$lib/context.svelte';
	import type { Curriculum } from '$lib/entities';
	import ArrowSvg from './arrow-svg.svelte';
	import CrossSvg from './cross-svg.svelte';
	import EditSvg from './edit-svg.svelte';
	import PlusSvg from './plus-svg.svelte';

	interface Props {
		edit?: boolean;
		type: 'proyectos' | 'laboral';
	}

	const { edit = false, type }: Props = $props();

	const currentProfesionistaStore = getCurrentProfesionistaContext();

	let currentTimelineItem: Curriculum | undefined = $state();
	let currentTimelineIndex: number = $state(-1);

	function handleItemEdit(item: Curriculum, i: number) {
		currentTimelineItem = item;
		currentTimelineIndex = i;

		edit && (document.getElementById('modal_edit_curriculum_timeline') as any)?.showModal();
	}

	function handleNewItem() {
		const item = {
			descripcion: '',
			empresa: '',
			nombre: '',
			fechaInicio: new Date(),
			fechaFin: null,
			tech: []
		};

		if (type === 'proyectos')
			handleItemEdit(item, currentProfesionistaStore.value.trayectoria.proyectos.length);
		else handleItemEdit(item, currentProfesionistaStore.value.trayectoria.laboral.length);
	}

	function handleItemSave() {
		if (!currentTimelineItem) return;

		if (currentTimelineIndex == -1)
			if (type === 'proyectos')
				currentProfesionistaStore.value.trayectoria.proyectos.push(currentTimelineItem);
			else currentProfesionistaStore.value.trayectoria.laboral.push(currentTimelineItem);
		else if (!currentProfesionistaStore.value.trayectoria.proyectos[currentTimelineIndex])
			if (type === 'proyectos')
				currentProfesionistaStore.value.trayectoria.proyectos.push(currentTimelineItem);
			else currentProfesionistaStore.value.trayectoria.laboral.push(currentTimelineItem);
		else if (type === 'proyectos')
			currentProfesionistaStore.value.trayectoria.proyectos.splice(
				currentTimelineIndex,
				1,
				currentTimelineItem
			);
		else
			currentProfesionistaStore.value.trayectoria.laboral.splice(
				currentTimelineIndex,
				1,
				currentTimelineItem
			);
	}

	function handleNewTimeline() {
		const item = {
			descripcion: '',
			empresa: '',
			nombre: '',
			fechaInicio: new Date(),
			fechaFin: null,
			tech: []
		};

		handleItemEdit(item, -1);
	}

	function handleDeleteCurriculum(i: number) {
		if (type === 'proyectos') currentProfesionistaStore.value.trayectoria.proyectos.splice(i, 1);
		else currentProfesionistaStore.value.trayectoria.laboral.splice(i, 1);
	}

	let currentTech = $state('');
</script>

{#snippet tags(tags: string[], edit = false)}
	<div class="flex flex-row flex-wrap gap-2">
		{#each tags as tech, i}
			{#if edit}
				<button
					onclick={() => currentTimelineItem && currentTimelineItem.tech.splice(i, 1)}
					class="badge badge-neutral tooltip tooltip-bottom cursor-pointer"
					data-tip="Eliminar">{tech}</button
				>
			{:else}
				<div class="badge badge-neutral">{tech}</div>
			{/if}
		{/each}
	</div>
{/snippet}

{#snippet item(item: Curriculum, i: number)}
	{@const isEven = i % 2 === 0}

	<li class="md:min-w-[40vw]">
		<div class="timeline-middle">
			<ArrowSvg />
		</div>

		<div
			class:timeline-end={isEven}
			class:md:text-end={!isEven}
			class:timeline-start={!isEven}
			class="mb-10 md:text-end"
		>
			<time class="font-mono italic">{item.fechaInicio.getFullYear()}</time>
			<!-- <time class="font-mono italic">{item.fechaInicio.toISOString().slice(0, 10)}</time> -->
			<div class="text-lg font-black">
				{item.nombre}
			</div>

			{#if item.empresa}
				<div class="text-lg">
					{item.empresa}
				</div>
			{/if}

			{item.descripcion}

			<div class="mt-2">
				{@render tags(item.tech)}
			</div>

			<div class="divider"></div>
		</div>

		{#if edit}
			<div
				class="join absolute top-0 right-0"
				class:md:right-0={i % 2 === 0}
				class:md:left-0={i % 2 !== 0}
			>
				<button
					onclick={() => handleItemEdit(item, i)}
					class="tooltip btn btn-circle"
					data-tip="Editar"
				>
					<EditSvg />
				</button>
				<button
					class="btn btn-danger btn-circle tooltip"
					data-tip="Eliminar"
					onclick={() => handleDeleteCurriculum(i)}
				>
					<CrossSvg />
				</button>
			</div>
		{/if}
		<hr />
	</li>
{/snippet}

{#if edit}
	{#if type === 'proyectos' && currentProfesionistaStore.value.trayectoria.proyectos.length == 0}
		<button class="btn btn-dash rounded-box" onclick={handleNewTimeline}>
			Crear Timeline de Proyectos
		</button>
	{:else if type === 'laboral' && currentProfesionistaStore.value.trayectoria.laboral.length == 0}
		<button class="btn btn-dash rounded-box" onclick={handleNewTimeline}> Crear Currículum </button>
	{/if}
{/if}

<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
	{#if type === 'proyectos'}
		{#each currentProfesionistaStore.value.trayectoria.proyectos as curriculum, i}
			{@render item(curriculum, i)}
		{/each}
	{:else}
		{#each currentProfesionistaStore.value.trayectoria.laboral as curriculum, i}
			{@render item(curriculum, i)}
		{/each}
	{/if}

	{#if edit && currentProfesionistaStore.value.trayectoria.proyectos.length > 0}
		<button class="btn btn-dash" onclick={handleNewItem}> Agregar Proyecto </button>
	{:else if edit && currentProfesionistaStore.value.trayectoria.laboral.length > 0}
		<button class="btn btn-dash" onclick={handleNewItem}> Agregar Experiencia Laboral</button>
	{/if}
</ul>

{#if edit}
	<dialog id="modal_edit_curriculum_timeline" class="modal">
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
					<CrossSvg />
				</button>
			</form>

			{#if currentTimelineItem}
				<fieldset class="fieldset">
					<legend class="fieldset-legend text-lg font-bold">Editar Currículum</legend>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Ocupación</label>
					<input
						type="text"
						class="input"
						bind:value={currentTimelineItem.nombre}
						placeholder="Ocupación"
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Empresa</label>
					<input
						type="text"
						class="input"
						bind:value={currentTimelineItem.empresa}
						placeholder="Empresa"
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Fecha de Inicio</label>
					<input
						type="date"
						class="input"
						value={currentTimelineItem.fechaInicio.toISOString().slice(0, 10)}
						onchange={(e) => {
							if (!currentTimelineItem) return;
							console.log(e.currentTarget.value);

							currentTimelineItem.fechaInicio = new Date(e.currentTarget.value);
						}}
						placeholder="Fecha de Inicio"
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Fecha Fin</label>
					<input
						type="date"
						class="input"
						bind:value={currentTimelineItem.fechaFin}
						placeholder="Name"
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Descripción</label>
					<textarea
						class="textarea"
						bind:value={currentTimelineItem.descripcion}
						placeholder="Descripción"
					></textarea>

					<div class="join">
						<input
							type="text"
							class="input"
							placeholder="Tag"
							bind:value={currentTech}
							onkeydown={(e) => {
								if (e.code === 'Enter') {
									if (!currentTimelineItem || !currentTech) return;
									currentTimelineItem.tech.push(currentTech);
									currentTech = '';
								}
							}}
						/>
						<button
							class="btn"
							onclick={() => {
								if (!currentTimelineItem || !currentTech) return;
								currentTimelineItem.tech.push(currentTech);
								currentTech = '';
							}}
						>
							<PlusSvg />
						</button>
					</div>

					{@render tags(currentTimelineItem.tech, true)}

					<!-- <label class="fieldset-label">Author</label>
				<input type="text" class="input" placeholder="Name" /> -->
				</fieldset>
			{/if}

			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn" onclick={handleItemSave}>Guardar</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
