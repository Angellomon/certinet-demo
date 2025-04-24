<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Certificacion, Certificaciones } from '$lib/entities';
	import { X } from 'phosphor-svelte';
	import VerifiedStatus from '../verified-status.svelte';

	interface Props {
		certificaciones: Certificaciones;
		basePath?: string;
		hideDeleteBtn?: boolean;
		onCertDelete?: (idCert: string) => void;
	}

	let { basePath, hideDeleteBtn = false, certificaciones, onCertDelete }: Props = $props();

	function handleCertRemove(idCert: string) {
		onCertDelete && onCertDelete(idCert);
	}

	function gotoCert(idCert: string) {
		goto(`${basePath}/${idCert}`);
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
	<button class="btn btn-error btn-square" onclick={() => handleCertRemove(idCert)}>
		<X class="size-5" />
	</button>
{/snippet}

{#snippet cerData(cert: Certificacion)}
	<li class="list-row hover:bg-base-300">
		<div class="flex flex-col items-start">
			<h3 class="text-xl font-bold hover:font-bold">{cert.nombre}</h3>
			<div class="flex flex-col justify-between md:flex-row">
				{#if cert.vigencia < 0}
					{@render statVigencia('Vigencia', 'Vitalicia')}
				{:else}
					{@render statVigencia('Vigencia', `${cert.vigencia} año${cert.vigencia > 1 ? 's' : ''}`)}
				{/if}

				<VerifiedStatus verified={cert.verificado}>
					{cert.verificado ? 'Verificado' : 'Verificación Pendiente'}
				</VerifiedStatus>
			</div>
		</div>
	</li>
{/snippet}

<ul class="list bg-base-200 rounded-box gap-1 py-5 shadow-md">
	{#each certificaciones as cert}
		{#if basePath}
			<div class="relative flex justify-around">
				<button class="w-[80%] cursor-pointer md:w-[95%]" onclick={() => gotoCert(cert.id)}>
					{@render cerData(cert)}
				</button>
				{#if onCertDelete && !hideDeleteBtn && certificaciones.length > 1}
					{@render btnRemoveCert(cert.id)}
				{/if}
			</div>
		{:else}
			{@render cerData(cert)}
		{/if}
	{/each}
</ul>
