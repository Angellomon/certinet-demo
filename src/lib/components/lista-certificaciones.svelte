<script lang="ts">
	import { getCurrentProfesionistaContext } from '$lib/context.svelte';
	import type { Certificacion, Certificaciones } from '$lib/entities';
	import CrossSvg from './cross-svg.svelte';
	import VerifiedStatus from './verified-status.svelte';

	interface Props {
		certificaciones: Certificaciones;
		basePath?: string;
		hideDeleteBtn?: boolean;
	}

	let { basePath, hideDeleteBtn = false, certificaciones }: Props = $props();

	const currentProfesionistaStore = getCurrentProfesionistaContext();

	function handleCertRemove(idCert: string) {
		const i = certificaciones.findIndex((c) => c.id === idCert);
		certificaciones.splice(i, 1);
		// certificacionesLocalStore.removeCertificacion(idCert);
	}
</script>

{#snippet statVigencia(title: string, value: string)}
	<div class="mx-5 flex flex-col items-start justify-center">
		<span class="text-md font-extralight">{title}</span>
		<span class="text-lg font-bold">{value}</span>
	</div>
{/snippet}

{#snippet btnRemoveCert(idCert: string)}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="btn btn-error btn-square absolute top-0 right-3"
		onclick={() => handleCertRemove(idCert)}
	>
		<CrossSvg />
	</button>
{/snippet}

{#snippet cerData(cert: Certificacion)}
	<li class="list-row hover:bg-base-300 my-1">
		{#if !hideDeleteBtn && certificaciones.length > 1}
			{@render btnRemoveCert(cert.id)}
		{/if}
		<div class="flex flex-col">
			<h3 class="text-xl font-bold hover:font-bold">{cert.nombre}</h3>
			<div class="flex flex-col justify-between md:flex-row">
				{#if cert.vigencia < 0}
					{@render statVigencia('Vigencia', 'Vitalicia')}
				{:else}
					{@render statVigencia('Vigencia', `${cert.vigencia} año${cert.vigencia > 1 ? 's' : ''}`)}
				{/if}

				<VerifiedStatus verified={cert.verificado}
					>{cert.verificado ? 'Verificado' : 'Verificación Pendiente'}</VerifiedStatus
				>
			</div>
		</div>
	</li>
{/snippet}

<ul class="list bg-base-200 rounded-box gap-1 shadow-md">
	{#each certificaciones as cert}
		{#if basePath}
			<a href={`${basePath}/${cert.id}`}>
				{@render cerData(cert)}
			</a>
		{:else}
			{@render cerData(cert)}
		{/if}
	{/each}
</ul>
