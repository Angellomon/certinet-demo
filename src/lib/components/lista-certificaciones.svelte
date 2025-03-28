<script lang="ts">
	import type { Certificacion } from '$lib/entities';
	import { certificacionesLocalStore } from '../../routes/profesionista/certificaciones/utils.svelte';
	import VerifiedStatus from './verified-status.svelte';

	interface Props {
		certificaciones: Certificacion[];
		basePath?: string;
		hideDeleteBtn?: boolean;
	}

	let { certificaciones, basePath, hideDeleteBtn = false }: Props = $props();

	function handleCertRemove(idCert: string) {
		certificacionesLocalStore.removeCertificacion(idCert);
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
	<button class="btn btn-error btn-square absolute top-0 right-3" onclick={() => handleCertRemove(idCert)}>
		<svg
			class="size-[1.2em]"
			fill="#ffffff"
			viewBox="0 0 32 32"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"
			/>
		</svg>
	</button>
{/snippet}

{#snippet cerData(cert: Certificacion)}
	<li class="list-row hover:bg-base-300 my-1">
		{#if !hideDeleteBtn}
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
