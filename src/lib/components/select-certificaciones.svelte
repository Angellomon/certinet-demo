<script lang="ts">
	import type { Certificacion } from '$lib/entities';
	import { SvelteSet } from 'svelte/reactivity';
	import VerifiedStatus from './verified-status.svelte';

	let {
		certificaciones,
		selectedIds = $bindable(new SvelteSet())
	}: { certificaciones: Certificacion[]; selectedIds: Set<string> } = $props();

	function handleSelect(idCert: string) {
		if (selectedIds.has(idCert)) {
			selectedIds.delete(idCert);

			console.log(selectedIds);

			return;
		}

		selectedIds.add(idCert);

		console.log(selectedIds);
	}
</script>

{#snippet statVigencia(title: string, value: string)}
	<div class="mx-5 flex flex-col items-start justify-center">
		<span class="text-md font-extralight">{title}</span>
		<span class="text-lg font-bold">{value}</span>
	</div>
{/snippet}

{#snippet certElement(cert: Certificacion)}
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
{/snippet}

<ul class="list bg-base-100 rounded-box gap-1 shadow-md">
	{#each certificaciones as cert}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<li
			class="list-row my-1 hover:border"
			class:border={selectedIds.has(cert.id)}
			onclick={() => handleSelect(cert.id)}
		>
			{@render certElement(cert)}
		</li>
	{/each}
</ul>
