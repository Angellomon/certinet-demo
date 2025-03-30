<script lang="ts">
	import type { Certificacion, Certificaciones } from '$lib/entities';
	import { SvelteSet } from 'svelte/reactivity';
	import VerifiedStatus from './verified-status.svelte';
	import type { LocalObjectStore } from '$lib/localstore.svelte';
	import { getContext } from 'svelte';

	let {
		selectedIds = $bindable(new SvelteSet())
	}: {  selectedIds: Set<string> } = $props();

	const certificaciones: LocalObjectStore<Certificaciones> = getContext('certificaciones');

		function handleSelect(idCert: string) {
		if (selectedIds.has(idCert)) {
			selectedIds.delete(idCert);

			return;
		}

		selectedIds.add(idCert);
	}
</script>

{#snippet statVigencia(title: string, value: string)}
	<div class="mx-5 flex flex-col min-w-20 items-start justify-center">
		<span class="text-md font-extralight">{title}</span>
		<span class="text-lg font-bold">{value}</span>
	</div>
{/snippet}

{#snippet certElement(cert: Certificacion)}
	<div class="flex flex-col">
		<h3 class="text-xl font-bold hover:font-bold">{cert.nombre}</h3>
		<div class="flex flex-col justify-start md:flex-row">
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
{/snippet}

<ul class="list bg-base-200 rounded-box gap-1 shadow-md">
	{#each certificaciones.value as cert}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<li
			class="list-row cursor-pointer hover:bg-base-300"
			class:border-2={selectedIds.has(cert.id)}
			onclick={() => handleSelect(cert.id)}
		>
			{@render certElement(cert)}
		</li>
	{/each}
</ul>
