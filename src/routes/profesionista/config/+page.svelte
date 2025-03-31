<script lang="ts">
	import { newLocalStore } from '$lib/localstore.svelte';
	import * as v from 'valibot';

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

<h1 class="text-2xl">Configuración</h1>
<main>
	<main class="flex justify-start">
		<div class="flex flex-col md:flex-row">
			{@render menu()}

			<div class="grow px-0 py-5 md:px-5 md:py-0">
				<!-- {#if seccionStore.value.seccion == 'datos'}
          {@render datos()}
        {:else if seccionStore.value.seccion == 'forma pago'}
          {@render formaPago()}
        {:else if seccionStore.value.seccion == 'precio certificacion'}
          {@render precioCertificacion()}
        {/if} -->
			</div>
		</div>
	</main>
</main>
