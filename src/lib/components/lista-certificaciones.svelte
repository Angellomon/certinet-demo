<script lang="ts">
	import type { Certificacion } from '$lib/entities';
	import VerifiedStatus from './verified-status.svelte';

	let { certificaciones, basePath }: { certificaciones: Certificacion[]; basePath?: string } =
		$props();
</script>

{#snippet statVigencia(title: string, value: string)}
	<div class="mx-5 flex flex-col items-start justify-center">
		<span class="text-md font-extralight">{title}</span>
		<span class="text-lg font-bold">{value}</span>
	</div>
{/snippet}

{#snippet cerData(cert: Certificacion)}
	<li class="list-row my-1 hover:border">
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

<ul class="list bg-base-100 rounded-box gap-1 shadow-md">
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
