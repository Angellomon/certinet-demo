<script lang="ts">
	import { page } from '$app/state';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import TableCertificaciones from '$lib/components/table-certificaciones.svelte';
	import { getProfesionistaContext } from '$lib/context.svelte';

	const { idProfesionista } = page.params;

	const profesionista = getProfesionistaContext(idProfesionista);

	const breadData: { url?: string; title: string; icon?: string }[] = [
		{
			title: 'Admin',
			url: '/admin'
		}
	];
</script>

{#snippet field(label: string, data: string)}
	<div class="flex grow flex-col">
		<div class="label">{label}</div>
		<div class="input">{data}</div>
	</div>
{/snippet}

{#snippet datos()}
	<fieldset class="fieldset">
		<legend class="legend text-xl">Datos</legend>

		<div class="flex flex-col md:flex-row md:gap-5">
			<div class="flex-flex-col">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Nombre</label>
				<input type="text" class="input" placeholder="Nombre" bind:value={profesionista.nombre} />

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Apellidos</label>
				<input
					type="text"
					class="input"
					placeholder="Apellidos"
					bind:value={profesionista.apellidos}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Correo</label>
				<input
					type="email"
					class="input"
					placeholder="Razón Social"
					bind:value={profesionista.correo}
				/>
			</div>

			<div class="flex flex-col">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Profesión</label>
				<input
					type="text"
					class="input"
					placeholder="Profesion"
					bind:value={profesionista.profesion}
				/>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="fieldset-label">Fecha de Nacimiento</label>
				<input
					type="date"
					class="input"
					placeholder="Fecha de Establecimiento"
					onchange={(e) => {
						if (!e.currentTarget.value || !profesionista) return;

						profesionista.fechaNacimeinto = new Date(e.currentTarget.value);
					}}
					value={profesionista.fechaNacimeinto.toISOString().slice(0, 10)}
				/>
			</div>
		</div>

		{@render field(
			'Estatus Verificación',
			profesionista.verificado ? 'Verificado' : 'Verificación Pendiente'
		)}
	</fieldset>
{/snippet}

<main class="flex flex-col gap-5">
	<Breadcrumbs data={breadData} />

	<div class="">
		<h1 class="text-2xl underline">{profesionista.nombre} {profesionista.apellidos}</h1>
		<div class="badge badge-neutral tooltip tooltip-right font-mono" data-tip="ID Profesionista">
			{profesionista.id}
		</div>
	</div>
	{@render datos()}

	<TableCertificaciones idProfesionista={profesionista.id} showVerifyActions />
</main>
