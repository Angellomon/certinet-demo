<script lang="ts">
	import EditSvg from '$lib/components/edit-svg.svelte';
	import TimelineProyectos from '$lib/components/timeline-proyectos.svelte';
	import TimelinteCurriculum from '$lib/components/timelinte-curriculum.svelte';
	import { getCurrentProfesionistaContext } from '$lib/context.svelte';
	import { newLocalStore } from '$lib/localstore.svelte';
	import * as v from 'valibot';

	const currentProfesionistaStore = getCurrentProfesionistaContext();

	const seccionSchema = v.union([
		v.literal('datos'),
		v.literal('curriculum'),
		v.literal('proyectos')
	]);
	type Seccion = v.InferOutput<typeof seccionSchema>;

	const seccionObjSchema = v.object({
		seccion: seccionSchema
	});
	type SeccionObjType = v.InferOutput<typeof seccionObjSchema>;
	const seccionStore = newLocalStore(
		'seccion-profesionista-config',
		{
			seccion: 'datos'
		},
		seccionObjSchema
	);

	let edit: Record<Seccion, boolean> = $state({
		datos: false,
		curriculum: false,
		proyectos: false
	});

	function toggleEdit(s: Seccion) {
		edit[s] = !edit[s];
	}

	function setSeccion(s: Seccion) {
		seccionStore.value.seccion = s;
	}

	let showModal = $state(false);
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

{#snippet menu()}
	<ul class="menu menu-vertical bg-base-200 rounded-box w-56">
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'datos'}
				onclick={() => setSeccion('datos')}
			>
				Datos
			</button>
		</li>
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'curriculum'}
				onclick={() => setSeccion('curriculum')}
			>
				Currículum
			</button>
		</li>
		<li>
			<button
				class:menu-active={seccionStore.value.seccion == 'proyectos'}
				onclick={() => setSeccion('proyectos')}
			>
				Proyectos
			</button>
		</li>
	</ul>
{/snippet}

{#snippet datos()}
	<div class="flex flex-col md:flex-row">
		<fieldset class="fieldset">
			<legend class="legend text-xl">Datos</legend>

			<div class="flex flex-col md:flex-row md:gap-5">
				<div class="flex-flex-col">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Nombre</label>
					<input
						type="text"
						class="input"
						placeholder="Nombre"
						bind:value={currentProfesionistaStore.value.nombre}
						disabled={!edit['datos']}
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Apellidos</label>
					<input
						type="text"
						class="input"
						placeholder="Apellidos"
						bind:value={currentProfesionistaStore.value.apellidos}
						disabled={!edit['datos']}
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Correo</label>
					<input
						type="email"
						class="input"
						placeholder="Razón Social"
						bind:value={currentProfesionistaStore.value.correo}
						disabled={!edit['datos']}
					/>
				</div>

				<div class="flex flex-col">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Profesión</label>
					<input
						type="text"
						class="input"
						placeholder="Profesion"
						bind:value={currentProfesionistaStore.value.profesion}
						disabled={!edit['datos']}
					/>

					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="fieldset-label">Fecha de Nacimiento</label>
					<input
						type="date"
						class="input"
						placeholder="Fecha de Establecimiento"
						onchange={(e) => {
							if (!e.currentTarget.value) return;

							currentProfesionistaStore.value.fechaNacimeinto = new Date(e.currentTarget.value);
						}}
						value={currentProfesionistaStore.value.fechaNacimeinto.toISOString().slice(0, 10)}
						disabled={!edit['datos']}
					/>
				</div>
			</div>

			{@render field(
				'Estatus Verificación',
				currentProfesionistaStore.value.verificado ? 'Verificado' : 'Verificación Pendiente'
			)}
		</fieldset>
		<button class="btn" onclick={() => toggleEdit('datos')}>
			{#if edit['datos']}
				Guardar
			{:else}
				Editar
			{/if}
			<EditSvg />
		</button>
	</div>
{/snippet}

{#snippet curriculum()}
	<div>
		<TimelinteCurriculum edit />
	</div>
{/snippet}

{#snippet proyectos()}
	<div>
		<TimelineProyectos edit />
	</div>
{/snippet}

<h1 class="text-2xl">Configuración</h1>
<main>
	<main class="flex justify-start">
		<div class="flex flex-col md:flex-row">
			{@render menu()}

			<div class="grow px-0 py-5 md:px-5 md:py-0">
				{#if seccionStore.value.seccion == 'datos'}
					{@render datos()}
				{:else if seccionStore.value.seccion == 'curriculum'}
					{@render curriculum()}
				{:else if seccionStore.value.seccion == 'proyectos'}
					{@render proyectos()}
				{/if}
			</div>
		</div>
	</main>
</main>
